import React from "react";
import { useParams } from "react-router-dom";
import { GET_EVENT } from "./quaries";
import { useQuery } from "@apollo/client";
import { Typography,} from 'antd';


import Comments from "./Comments"




const { Title } = Typography;
function EventPage() {
  const { id } = useParams();


  
  // useQuery hook'u ile veri çekiliyor
  const { loading, error, data } = useQuery(GET_EVENT,{
    variables:{getEventId:id}
  });

  // Eğer veri yükleniyorsa 'Loading' mesajı göster
  if (loading) return <div>Loading...</div>;

  // Eğer bir hata oluşursa hata mesajı göster
  if (error) return <div>Error: {error.message}</div>;

  console.log(data); // Veriyi kontrol etmek için

  // Eğer veri varsa, List'i render et  

  const Event = data.getEvent;
  return (
    <div>
      <Title level={3}>Title: {Event.title}</Title>
      <Title level={4}>Location:{Event.location.name}</Title>
      <Title level={5}>Contact: {Event.user.email} </Title>
      <Comments event_id={id}/>
      
    </div>
  );
}

export default EventPage;