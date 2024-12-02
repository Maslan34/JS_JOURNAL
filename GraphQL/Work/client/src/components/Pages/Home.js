import { React, useEffect } from "react";
import { Avatar, List, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENT_SUBSCRIPTION } from "./quaries";

function Home() {
  // DATA IS FETCHED USING THE USEQUERY HOOK
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("DEBUG: updateQuery EXECUTED.");
        console.log("DEBUG: OLD DATA RECEIVED (PREV):", prev);

        if (!subscriptionData.data) {
          console.log(
            "DEBUG: THERE IS NO subscriptionData.data. RETURNING OLD DATA.."
          );
          return prev; // RETURN OLD STATE IF NO DATA IS RECEIVED
        }

        // RECEIVE THE DATA AND LOGGING HERE
        const newEvent = subscriptionData.data.eventCreated;
        console.log(" DEBUG: NEW EVENT DATA RECEIVED (NEWEVENT):", newEvent);

        if (!Array.isArray(prev.getAllEvents)) {
          console.error(
            "ERROR: prev.getAllEvents IS NOT AN ARRAY:",
            prev.getAllEvents
          );
          return prev;
        }

        // CHECK IF THE ID OF THE NEW EVENT ALREADY EXISTS
        const isDuplicate = prev.getAllEvents.some(
          (event) => event.id === newEvent.id
        );

        if (isDuplicate) {
          console.warn(
            "WARNING: THE EVENT ALREADY EXISTS. NO ADDITION MADE. ID:",
            newEvent.id
          );
          return prev;
        }

        // MERGE OLD DATA WITH NEW DATA
        const updatedData = {
          ...prev,
          getAllEvents: [newEvent, ...prev.getAllEvents],
        };

        console.log("DEBUG: UPDATED DATA :", updatedData);

        return updatedData;
      },
    });
    return () => unsubscribe(); // REMOVE SUBSCRIPTION FOR CLEANUP
  }, [subscribeToMore]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  console.log("Homedan Gelen Veri:");
  console.log(data);

  return (
    <div>
      <h1>Home</h1>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={data.getAllEvents} // NEEDS ARRAY HERE
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                }
                title={
                  <Link to={`/event/${item.id}`}>
                    Name: {item.title} - Date: {item.date}{" "}
                  </Link>
                }
                description={item.desc}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
