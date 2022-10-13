import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Breadcrumb, Layout, Row, Col, Tabs } from "antd";

import "./Task.scss";
import Loading from "@components/Loading/Loading";
import HeaderPage from "@/pages/Header/Header";
import MenuPage from "@/pages/Menu/Menu";
const { TabPane } = Tabs;

const { Content } = Layout;
function Task(props: any) {
  localStorage.setItem(
    "users",
    JSON.stringify([
      {
        id: "1345",
        name: "Victor",
        age: "22",
      },
      {
        id: "2654",
        name: "Kiran",
        age: "26",
      },
    ]),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [key, setKey] = useState("");

  useEffect(() => {
    const keys = window.location.pathname;
    setKey(keys.slice(6));
  }, []);
  return (
    <div id="pageTask">
      {isLoading ? <Loading isLoading={isLoading} /> : undefined}
      <Layout>
        <HeaderPage></HeaderPage>
      </Layout>
      <Layout>
        <MenuPage keySelect={key} />
        <Layout>
          <Breadcrumb>
            <Breadcrumb.Item href="home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/Task">Task</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="content-task-list">
            <Row>
              <Col span={24}>
                <div className="title-tasks">Tasks</div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Task 1" key="1">
                    <Content>
                      <h3>Login Page</h3>
                      <ul>
                        <li>
                          Validate Form Login
                          <p>- Email Format </p>
                          <p>- Required Input</p>
                        </li>
                        <li>
                          When click button Login
                          <p>- Generate Token : Save Token to LocalStorage</p>
                        </li>
                      </ul>
                    </Content>
                  </TabPane>
                  <TabPane tab="Task 2" key="2">
                    <Content>
                      <h3>Users Page</h3>
                      <ul>
                        <li>Config Router with Path '/User' for page User</li>
                        <li>
                          When access to User Page
                          <p>
                            - If Token null in LocalStorage : Redirect to
                            LoginPage
                          </p>
                        </li>
                        <li>
                          Prepare List User:
                          <br />
                          <p>-Id</p>
                          <br />
                          <p>-FullName</p>
                          <br />
                          <p>-Age</p>
                          <br />
                        </li>
                        <li>Save list User to LocalStorage</li>
                        <li>Show list 10 User in table</li>
                        <li>
                          Add function search for table
                          <span>Search by Id</span>
                          <span>Search by Name</span>
                          <span>Search by Age</span>
                        </li>
                        <li>Function: Add New User</li>
                        <li>Function: Edit User</li>
                        <li className="optional">
                          <strong>Request "Optional":</strong>
                          <br />
                          <p>Form Add/Edit User</p>
                          <span>- Use Calendar Component for input Age</span>
                        </li>
                      </ul>
                    </Content>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Task;
