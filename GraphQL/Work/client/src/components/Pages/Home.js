import { React, useEffect } from "react";
import { Avatar, List, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENT_SUBSCRIPTION } from "./quaries";

function Home() {
  // useQuery hook'u ile veri çekiliyor
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("DEBUG: `updateQuery` çalıştı.");
        console.log("DEBUG: Gelen eski veri (prev):", prev);

        if (!subscriptionData.data) {
          console.log(
            "DEBUG: subscriptionData.data yok. Eski veri döndürülüyor."
          );
          return prev; // Gelen veri yoksa eski state döndür
        }

        // Gelen veriyi al ve logla
        const newEvent = subscriptionData.data.eventCreated;
        console.log("DEBUG: Gelen yeni event verisi (newEvent):", newEvent);

        // Önce eski array'i kontrol edelim
        if (!Array.isArray(prev.getAllEvents)) {
          console.error(
            "HATA: prev.getAllEvents array değil, mevcut yapı:",
            prev.getAllEvents
          );
          return prev;
        }

        // Gelen yeni event'in ID'sinin zaten mevcut olup olmadığını kontrol edin
        const isDuplicate = prev.getAllEvents.some(
          (event) => event.id === newEvent.id
        );

        if (isDuplicate) {
          console.warn(
            "UYARI: Gelen event zaten mevcut. Ekleme yapılmadı. ID:",
            newEvent.id
          );
          return prev; // Duplicate varsa ekleme yapmıyoruz
        }

        // Yeni veriyle eski veriyi birleştiriyoruz
        const updatedData = {
          ...prev,
          getAllEvents: [newEvent, ...prev.getAllEvents],
        };

        console.log("DEBUG: Güncellenmiş veri (updatedData):", updatedData);

        return updatedData;
      },
    });
    return () => unsubscribe(); // Cleanup için aboneliği kaldır
  }, [subscribeToMore]);

  // Eğer veri yükleniyorsa 'Loading' mesajı göster
  if (loading) return <div>Loading...</div>;

  // Eğer bir hata oluşursa hata mesajı göster
  if (error) return <div>Error: {error.message}</div>;

  console.log(data); // Veriyi kontrol etmek için

  // Eğer veri varsa, List'i render et
  return (
    <div>
      <h1>Home</h1>
      <List
        className="demo-loadmore-list"
        loading={loading} // Loading durumunu burada kontrol edebilirsiniz
        itemLayout="horizontal"
        dataSource={data.getAllEvents} // ARRAY GEREKİR
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                } // Avatar için örnek bir URL
                title={
                  <Link to={`/event/${item.id}`}>
                    Name: {item.title} - Date: {item.date}{" "}
                  </Link>
                }
                description={item.desc} // Yazarın açıklaması
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
