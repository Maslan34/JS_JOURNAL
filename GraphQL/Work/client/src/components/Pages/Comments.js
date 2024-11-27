import React, { useState } from "react";
import moment from 'moment';
import { List, Avatar, Button, Divider, Tooltip } from 'antd';
import { GET_EXTRA_EVENT_INFO } from "./quaries";
import { useLazyQuery } from '@apollo/client';
import styles from '../app/styles.module.css'


function Comments({event_id}) {

    const [btnVisible, setBtnVisible] = useState(true);
    const [loadComments, { loading, error, data }] = useLazyQuery(GET_EXTRA_EVENT_INFO,{
        variables:{getEventId:event_id},onCompleted: () => {
            setBtnVisible(false);
          },
    });
    console.log(data);
     
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
        <strong>From:</strong> {data.getEvent.from}
      </p>
      <p>
        <strong>To:</strong> {data.getEvent.to}
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
    </div>
  )}
     
    </div> 
  );
}

export default Comments;
