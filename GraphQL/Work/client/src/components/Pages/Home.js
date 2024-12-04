import { React, useEffect } from "react";
import { Avatar, List, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENT_SUBSCRIPTION,EVENT_DELETE_SUBSCRIPTION } from "./quaries";

function Home() {
  // DATA IS FETCHED USING THE USEQUERY HOOK
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    // Yeni etkinlik eklemek için subscribeToMore kullanımı
    const unsubscribeCreate = subscribeToMore({
      document: EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("DEBUG: updateQuery EXECUTED.");
        console.log("DEBUG: OLD DATA RECEIVED (PREV):", prev);

        if (!subscriptionData.data) {
          console.log("DEBUG: THERE IS NO subscriptionData.data. RETURNING OLD DATA..");
          return prev; // Eğer veri gelmezse eski veriyi döndürüyoruz
        }

        // Yeni etkinlik verisi
        const newEvent = subscriptionData.data.eventCreated;
        console.log("DEBUG: NEW EVENT DATA RECEIVED (NEWEVENT):", newEvent);

        if (!Array.isArray(prev.getAllEvents)) {
          console.error("ERROR: prev.getAllEvents IS NOT AN ARRAY:", prev.getAllEvents);
          return prev;
        }

        // Yeni etkinliği listeye eklemek
        const isDuplicate = prev.getAllEvents.some((event) => event.id === newEvent.id);
        if (isDuplicate) {
          console.warn("WARNING: THE EVENT ALREADY EXISTS. NO ADDITION MADE. ID:", newEvent.id);
          return prev;
        }

        // Veriyi güncelle
        const updatedData = {
          ...prev,
          getAllEvents: [newEvent, ...prev.getAllEvents],
        };
        console.log("DEBUG: UPDATED DATA AFTER CREATE:", updatedData);
        return updatedData;
      },
    });

    // Etkinlik silme işlemi için subscribeToMore kullanımı
    const unsubscribeDelete = subscribeToMore({
      document: EVENT_DELETE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev; // Eğer veri gelmezse eski veriyi döndür
        }

        const deletedEvent = subscriptionData.data.eventDeleted;
        if (deletedEvent) {
          console.log("DEBUG: EVENT DELETED WITH ID:", deletedEvent.id);
          // Silinen etkinliği diziden çıkar
          const updatedData = {
            ...prev,
            getAllEvents: prev.getAllEvents.filter((event) => event.id !== deletedEvent.id),
          };
          console.log("DEBUG: UPDATED DATA AFTER DELETE:", updatedData);
          return updatedData;
        }

        return prev;
      },
    });

    // Unsubscribe işlemi: cleanup
    return () => {
      unsubscribeCreate();
      unsubscribeDelete();
    };
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
