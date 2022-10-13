import React from 'react';
import { Layout, Col, Row, Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.scss';
import logo from '@/assets/images/logo.png';
import logoMinimize from '@/assets/images/logo.png';
import iconMenu from '../../assets/images/icons/ico-menu.svg';

const AntHeader = Layout.Header;
const AntContent = Layout.Content;
export default class Header extends React.Component {
  public render(): React.ReactNode {
    const menu = (
      <Menu
        className="menu"
        items={[
          {
            label: <div className="menu-title">Home</div>,
            key: '0',
          },
          {
            label: <div className="menu-title">Dashboard</div>,
            key: '2',
          },
          {
            label: (
              <>
                <span style={{ marginRight: '5px' }}>user</span>
                <Avatar size={25} style={{ backgroundColor: '#04537d' }} icon={<UserOutlined />} />
              </>
            ),
            key: '3',
            className: 'avatar-custom',
          },
          {
            label: <div className="menu-title">Log Out</div>,
            key: '4',
            className: 'logOut-custom',
          },
        ]}
      />
    );
    return (
      <AntHeader className="header">
        <AntContent>
          <Row>
            <Col span={4}>
              <a className="navbar-brand logo-header" href="/">
                <img
                  width="170"
                  height="38"
                  src={logo}
                  alt="homepage"
                  className="dark-logo full-logo"
                />
                <img
                  height="38"
                  src={logoMinimize}
                  alt="homepage"
                  className="dark-logo minimize-logo"
                />
              </a>
            </Col>

            <Col
              className="d-flex align-items-center justify-content-end col-menu"
              style={{ marginLeft: 'auto' }}
            >
              <Dropdown overlay={menu} trigger={['click']} placement="topRight">
                <a href="/#" onClick={e => e.preventDefault()}>
                  <button className="button-menu">
                    <img src={iconMenu} alt="icon menu" />
                  </button>
                </a>
              </Dropdown>
            </Col>

            <Col className="col-avarta">
              <div className="u-info">
                <Avatar size={35} style={{ backgroundColor: '#04537d' }} icon={<UserOutlined />} />
              </div>
            </Col>
          </Row>
        </AntContent>
      </AntHeader>
    );
  }
}
