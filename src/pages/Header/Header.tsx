import "./Header.scss";
import { Layout, Row, Col } from "antd";
import header from "@assets/images/header.png";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
import Countdown from "react-countdown";

const { Header } = Layout;

interface UserToken {
  email: string;
  role: string;
  username: string;
}

const token = localStorage.getItem("jwt") || "";
let decoded: UserToken = {
  email: "",
  role: "none",
  username: "none",
};
if (token) {
  decoded = jwt_decode(token);
}

function HeaderPage(props: any) {
  return (
    <Layout>
      <Header>
        <Row>
          <Col span={8}>
            <img src={header}></img>
            <span className="title-hearder"> BE</span>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            Countdown: <Countdown date={Date.now() + 1000 * 60 * 20} />
            <span className="user-name-hearder">
              {decoded.email != "" ? (
                decoded.email
              ) : (
                <NavLink to={"/login"}>Login</NavLink>
              )}
            </span>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}

export default HeaderPage;
