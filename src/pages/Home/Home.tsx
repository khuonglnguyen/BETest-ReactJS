import React, { useState } from 'react';
import { Layout } from 'antd';
import MainLayout from 'src/layouts/MainLayout';
import { Outlet } from 'react-router';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

import HeaderPage from '@/pages/Header/Header';
import MenuPage from '@/pages/Menu/Menu';

function Home() {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [keyPath, setKeyPath] = useState('');

  const onClickMenu = (keyMenu: string, keyPathMenu: any) => {
    setKey(keyMenu);
    setKeyPath(keyPathMenu);
  };

  return (
    <>
      <HeaderPage></HeaderPage>
      <Layout>
        <MenuPage onClickMenu={onClickMenu} keySelect={key} />
        <Layout></Layout>
      </Layout>
    </>
  );
}

export default Home;
