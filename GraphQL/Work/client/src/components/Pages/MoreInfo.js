import { React, useEffect,useState, } from "react";

import { List, Avatar, Button, Divider } from 'antd';
import { GET_EXTRA_EVENT_INFO, PARTICIPANT_SUBSCRIPTION } from "./quaries";
import { useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/client';
import styles from '../app/styles.module.css'
import ParticipantForm from "../ParticipantForm/ParticipantForm";


function MoreInfo({event_id}) {

    const [btnVisible, setBtnVisible] = useState(true);
    const [loadComments, { loading, error, data }] = useLazyQuery(GET_EXTRA_EVENT_INFO,{
        variables:{getEventId:event_id},onCompleted: () => {
            setBtnVisible(false);
          },
    });
    //console.log(data);
   //  FETCH INITIAL DATA WITH USEQUERY
   const { data: eventData, loading: eventLoading, error: eventError, subscribeToMore } = useQuery(GET_EXTRA_EVENT_INFO, {
    variables: { getEventId: event_id },
});

//  UPDATE DATA WITH PARTICIPANT SUBSCRIPTION
useEffect(() => {
    const unsubscribe = subscribeToMore({
        document: PARTICIPANT_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          //console.log("Subscription Data: ", subscriptionData.data);
            try {
                if (!subscriptionData || !subscriptionData.data) return prev;

                const newParticipant = subscriptionData.data.participantAdded;

                // ADD PARTICIPANT DATA TO CURRENT DATA
                const updatedEventData = {
                    ...prev,
                    getEvent: {
                        ...prev.getEvent,
                        participants: [
                            ...prev.getEvent.participants,
                            newParticipant,
                        ],
                    },
                };

                //console.log("Güncellenmiş event verisi: ", updatedEventData);

                return updatedEventData;
            } catch (error) {
                console.error("Hata oluştu: ", error);
                return prev; // RETURN OLD DATA IN CASE OF ERROR
            }
        },
    });

    return () => unsubscribe(); // REMOVE SUBSCRIPTION FOR CLEANUP
}, [subscribeToMore]);
     
  if (loading && !data) return <div className={styles.showCommentsButtonContainer}> <Button type="primary" loading>Loading</Button></div>;

    if (error) return `Error! ${error}`;


 
  return (
    <div>
      <Divider style={{ borderColor: "#7cb305" }}>INFO</Divider>
      <div className={styles.showCommentsButtonContainer}>
        {btnVisible && (
          <Button loading={loading} onClick={() => loadComments()}>
            GET MORE INFO
          </Button>
        )}
      </div>

      {!loading && data?.getEvent && (
    <div className={styles.eventDetailsContainer}>
      <h3>Event Details</h3>
      <p>
        <strong>Owner:</strong> {data.getEvent.user.username}
      </p>
      <p>
        <strong>Owner Email:</strong> {data.getEvent.user.email}
      </p>
      <p>
        <strong>Location:</strong> {data.getEvent.location.name}
      </p>
      <p>
        <strong>Latitude:</strong> {data.getEvent.location.lat}
      </p>
      <p>
        <strong>Longitude:</strong> {data.getEvent.location.lng}
      </p>
      <h4>Participants:</h4>
          <List
            itemLayout="horizontal"
            dataSource={data.getEvent.participants}
            renderItem={(participant) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{participant.user.username[0]}</Avatar>}
                  title={participant.user.username}
                  description={participant.user.email}
                />
              </List.Item>
            )}
          />
    </div>
  )}
     <ParticipantForm/>
    </div> 
  );
}

export default MoreInfo;
