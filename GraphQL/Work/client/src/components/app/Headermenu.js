import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import {Link,useLocation } from 'react-router-dom';

// Menü öğeleri
const menuItems = [
  {
    label: <Link to="/">Home</Link>, // 'Navigation One' için anasayfaya yönlendirme
    key: '/',
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/newEvent">New Event</Link>, // 'Navigation One' için anasayfaya yönlendirme
    key: '/newEvent',
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/event/:id">Go Event</Link>, // 'Navigation One' için anasayfaya yönlendirme
    key: '/event/:id',
    icon: <MailOutlined />,
  },
  
];

function CustomMenu() {
  // Seçili menüyü tutmak için state
  const [current, setCurrent] = useState('mail'); // Başlangıçta 'mail' seçili

  // onClick olayını ele almak için fonksiyon
  const handleClick = (e) => {
    console.log('click', e); // Tıklanan öğenin bilgileri konsola yazdırılır
    setCurrent(e.key); // Seçilen menüyü güncelle
  };

  return (
    <Menu
      onClick={handleClick} // onClick işlevi
      selectedKeys={useLocation.pathname} // Seçili menü
      mode="horizontal" // Menü yatayda gösterilecek
      items={menuItems} // Menü öğeleri
    />
  );
}

export default CustomMenu;