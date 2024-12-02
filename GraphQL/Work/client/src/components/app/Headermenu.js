import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";

import { Link, useLocation } from "react-router-dom";

// MENU ITEMS
const menuItems = [
  {
    label: <Link to="/">Home</Link>,
    key: "/",
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/newEvent">New Event</Link>,
    key: "/newEvent",
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/event/:id">Go Event</Link>,
    key: "/event/:id",
    icon: <MailOutlined />,
  },
];

function CustomMenu() {
  //  STATE TO HOLD SELECTED MENU ITEM
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    //console.log('click', e); //
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={useLocation.pathname} // SELECTED MENU
      mode="horizontal"
      items={menuItems}
    />
  );
}

export default CustomMenu;
