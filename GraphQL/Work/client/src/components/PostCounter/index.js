import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Avatar, Badge } from "antd";
import { useSubscription, useQuery } from "@apollo/client";
import { EVENT_COUNT, GET_EVENTS } from "../Pages/quaries";

function PostCounter() {
  const [eventCounter, setEventCounter] = useState(null); // Sayı başlangıçta null

  // Sayfa ilk yüklendiğinde başlangıç değeri için GET_EVENTS sorgusu
  const { loading: queryLoading, data: queryData } = useQuery(GET_EVENTS, {
    onCompleted: (data) => {
      // Sorgudan gelen veriyi başlangıç değeri olarak ayarla
      setEventCounter(data?.getAllEvents?.length || 0);
    },
  });

  // Subscription ile veri güncellemesi
  const { data: subscriptionData } = useSubscription(EVENT_COUNT);

  useEffect(() => {
    if (subscriptionData?.eventCount !== undefined) {
      setEventCounter(subscriptionData.eventCount); // Subscription'dan gelen veriyi ayarla
    }
  }, [subscriptionData]);

  return (
    <div className={styles.container}>
      <Badge
        count={
          queryLoading || eventCounter === null
            ? "?" // Başlangıçta yüklenirken "?" göster
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