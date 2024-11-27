import React from "react";
import { Avatar, List, Skeleton } from 'antd';
import {Link} from 'react-router-dom'
import {useQuery } from '@apollo/client';
import {GET_EVENTS} from './quaries'

function Home() {
  // useQuery hook'u ile veri çekiliyor
  const { loading, error, data } = useQuery(GET_EVENTS);

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
                avatar={<Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />} // Avatar için örnek bir URL
                title={<Link to={`/event/${item.id}`}>Name: {item.title} - Date: {item.date} </Link>}
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
