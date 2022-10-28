import { Layout as AntLayout, Button, Input, Form, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/paths";
import React, { useState } from "react";
import "./Login.scss";
import Loading from "@components/Loading/Loading";
import * as LoginModel from "@/model/login";
import useToken from "@/helpers/useToken";

import logoBE from "@assets/images/logo.png";

interface Props {}
const LoginPage: React.FC<Props> = () => {
  const { token, setToken } = useToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<ReqLogin>(
    LoginModel.createEmptyLogin(),
  );

  const navigate = useNavigate();

  const onTexFieldChange = (fieldId: string) => (e: any) => {
    setLoginInfo({
      ...loginInfo,
      [fieldId]: e.target.value,
    });
  };

  const handlePwdChange = (e: any) => {
    setLoginInfo({
      ...loginInfo,
      password: e.target.value,
    });
  };

  const funclogin = () => {
    setIsLoading(true);
    // Call api login
    // set token
    const HMACSHA256 = (stringToSign: string, secret: string) =>
      "not_implemented";

    // The header typically consists of two parts:
    // the type of the token, which is JWT, and the signing algorithm being used,
    // such as HMAC SHA256 or RSA.
    const header = {
      alg: "HS256",
      typ: "JWT",
      kid: "vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe/4f4910",
    };
    const encodedHeaders = btoa(JSON.stringify(header));

    // The second part of the token is the payload, which contains the claims.
    // Claims are statements about an entity (typically, the user) and
    // additional data. There are three types of claims:
    // registered, public, and private claims.
    const claims = {
      role: "admin",
      email: "admin@gmail.com",
      username: loginInfo.username,
    };
    const encodedPlayload = btoa(JSON.stringify(claims));

    // create the signature part you have to take the encoded header,
    // the encoded payload, a secret, the algorithm specified in the header,
    // and sign that.
    const signature = HMACSHA256(
      `${encodedHeaders}.${encodedPlayload}`,
      "ASKFHOIDHGOD",
    );
    const encodedSignature = btoa(signature);

    const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`;
    localStorage.setItem("jwt", JSON.stringify(jwt));
    // return navigate("/");
    window.location.href = "/";
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <AntLayout>
      {isLoading ? <Loading isLoading={isLoading} /> : undefined}
      <Form
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        onFinish={funclogin}
        onFinishFailed={onFinishFailed}
        colon={false}
      >
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <div className="layoutLoginAdmin">
              <div className="imagelogo">
                <img src={logoBE}></img>
              </div>
              <div className="labelAdmin">
                {" "}
                <span>Wellcome to Besolution</span>
              </div>
              <div className="login-form">
                <div className="formItemInput">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                    ]}
                  >
                    <Input name="username" value={loginInfo.username} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handlePwdChange}
                      value={loginInfo.password}
                    />
                  </Form.Item>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="buttonLogin"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Form>
    </AntLayout>
  );
};
export default LoginPage;
