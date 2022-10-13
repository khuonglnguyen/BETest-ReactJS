import './Menu.scss';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/paths';

import users from '@assets/images/users.png';
import dashboard from '@assets/images/dashboard.png';

const { Sider } = Layout;

function getItem(label: any, key: any, icon: any, children: any, type: any) {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
}

const items = [
  getItem('Tasks', 'Task', <img src={dashboard}></img>, null, null),
  getItem(
    'Users',
    'Users',
    <img src={users}></img>,
    [getItem('List', 'User', null, null, null),],
    null,
  ),
];

function MenuPage(props: any) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(props.keySelect);

  const onClick = (e: any) => {
    console.log(e);
    navigate(`/${e.key}`);
    setCurrent(e.key);
  };

  return (
    <Sider width={231} className="site-layout-background">
      <Menu
        defaultSelectedKeys={['application']}
        defaultOpenKeys={['system']}
        onClick={onClick}
        mode="inline"
        theme="dark"
        items={items}
        className="menuHome"
        selectedKeys={[props.keySelect]}
      />
    </Sider>
  );
}

export default MenuPage;
