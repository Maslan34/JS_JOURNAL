import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Avatar, Badge } from "antd";
import { useSubscription, useQuery } from "@apollo/client";
import { EVENT_COUNT, GET_EVENTS } from "../Pages/quaries";

function PostCounter() {
  const [eventCounter, setEventCounter] = useState(null); //  INITIAL VALUE OF THE NUMBER IS NULL

  // USE GET_EVENTS QUERY FOR INITIAL VALUE WHEN PAGE LOADS
  const { loading: queryLoading, data: queryData } = useQuery(GET_EVENTS, {
    onCompleted: (data) => {
      // SET DATA FROM QUERY AS INITIAL VALUE
      setEventCounter(data?.getAllEvents?.length || 0);
    },
  });

  // UPDATE DATA WITH SUBSCRIPTION
  const { data: subscriptionData } = useSubscription(EVENT_COUNT);

  useEffect(() => {
    if (subscriptionData?.eventCount !== undefined) {
      setEventCounter(subscriptionData.eventCount); //  SET DATA FROM SUBSCRIPTION
    }
  }, [subscriptionData]);

  return (
    <div className={styles.container}>
      <Badge
        count={
          queryLoading || eventCounter === null
            ? "?" // SHOW "?" WHEN LOADING INITIALLY
            : eventCounter
        }
      >
        <Avatar shape="square" size="large">
          Events
        </Avatar>
      </Badge>
    </div>
  );
}

export default PostCounter;