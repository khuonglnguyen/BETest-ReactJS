import './Header.scss';
import { Layout, Row, Col } from 'antd';
import header from '@assets/images/header.png';

const { Header } = Layout;

function HeaderPage(props: any) {
  return (
    <Layout>
      <Header>
        <Row>
          <Col span={8}>
            <img src={header}></img>
            <span className="title-hearder"> BE</span>
          </Col>
          <Col span={8}> </Col>
          <Col span={8}>
            <span className="user-name-hearder">admin@beyonedge.co</span>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}

export default HeaderPage;
