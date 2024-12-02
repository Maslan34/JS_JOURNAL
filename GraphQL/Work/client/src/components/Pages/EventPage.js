import React from "react";
import { useParams } from "react-router-dom";
import { GET_EVENT } from "./quaries";
import { useQuery } from "@apollo/client";
import { Typography } from "antd";

import MoreInfo from "./MoreInfo";

const { Title } = Typography;
function EventPage() {
  const { id } = useParams();

  // DATA IS FETCHED USING THE USEQUERY HOOK
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { getEventId: id },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  //console.log(data); // CONTROLLING THE DATA RECEIVED

  const Event = data.getEvent;
  return (
    <div>
      <Title level={3}>Title: {Event.title}</Title>
      <Title level={4}>Location:{Event.location.name}</Title>
      <Title level={5}>Contact: {Event.user.email} </Title>
      <MoreInfo event_id={id} />
    </div>
  );
}

export default EventPage;
