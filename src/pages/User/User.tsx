import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import * as UserModel from "@/model/user";
import _ from "lodash";
import {
  Breadcrumb,
  Layout,
  Row,
  Col,
  Input,
  Table,
  Popover,
  Button,
  Tag,
  Modal,
} from "antd";

import "./User.scss";
import Loading from "@components/Loading/Loading";
import HeaderPage from "@/pages/Header/Header";
import MenuPage from "@/pages/Menu/Menu";
import { PATH } from "@constants/paths";
import edit from "@assets/images/icons/ico-edit.svg";
import client from "@assets/images/users/icon-user.png";

const { Search } = Input;
const { Content } = Layout;
function User(props: any) {
  const [isShowPopover, setIsShowPopover] = useState<boolean>(false);
  const [keySelectRecord, setkeySelectRecord] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [key, setKey] = useState("");

  const [listDataUser, setListDataUser] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<UserInfo>(
    UserModel.createEmptyUser(),
  );
  const [isModalAddOpen, setisModalAddOpen] = useState(false);
  const [isModalEditOpen, setisModalEditOpen] = useState(false);
  const [dataSource, setDataSource] = useState(() => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  });
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "4",
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <EditFilled
              onClick={() => {
                showModalEdit();
                onEditUser(record);
              }}
            ></EditFilled>
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                onDeleteUser(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const showModalAdd = () => {
    setisModalAddOpen(true);
  };

  const showModalEdit = () => {
    setisModalEditOpen(true);
  };

  const handleOkAdd = () => {
    const randomNumber: number = Math.round(Math.random() * 10000);
    const newUser = UserModel.createUser(
      randomNumber,
      editingUser?.name,
      editingUser?.age,
    );
    localStorage.setItem("users", JSON.stringify([...dataSource, newUser]));
    setDataSource((pre: any) => {
      return [...pre, newUser];
    });
    setEditingUser(UserModel.createEmptyUser());
    setisModalAddOpen(false);
  };

  const handleOkEdit = () => {
    setDataSource((pre: any) => {
      return pre.map((x: any) => {
        if (x.id === editingUser.id) {
          return editingUser;
        } else {
          return x;
        }
      });
    });
    localStorage.setItem("users", JSON.stringify([...dataSource]));
    setEditingUser(UserModel.createEmptyUser());
    setisModalEditOpen(false);
  };

  const handleCancel = () => {
    setisModalAddOpen(false);
    setisModalEditOpen(false);
  };

  const onSearch = (key: any) => {
    console.log(key);
  };

  useEffect(() => {
    const keys = window.location.pathname;
    setKey(keys.slice(6));
  }, []);

  const onEditUser = (record: any) => {
    setIsEditing(record);
    setEditingUser({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(UserModel.createEmptyUser());
  };

  const onDeleteUser = (record: any) => {
    Modal.confirm({
      title: "Are you sure to delete?",
      onOk: () => {
        setDataSource((pre: any) => {
          const newData = pre.filter((user: any) => user.id !== record.id);
          localStorage.setItem("users", JSON.stringify(newData));
          return newData;
        });
      },
    });
  };

  return (
    <div id="pageUser">
      {isLoading ? <Loading isLoading={isLoading} /> : undefined}
      <Layout>
        <HeaderPage></HeaderPage>
      </Layout>
      <Layout>
        <MenuPage keySelect={key} />
        <Layout>
          <Breadcrumb>
            <Breadcrumb.Item href="home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/User">User</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="content-user-list">
            <Row>
              <Col span={24}>
                <div className="title-users">Users</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  className="input-search-user"
                />
              </Col>
              <Col span={12}></Col>
              <Col span={6}>
                <Button
                  className="bnt-add-user"
                  type="primary"
                  htmlType="submit"
                  onClick={showModalAdd}
                >
                  Add User
                </Button>
              </Col>
            </Row>
            <hr></hr>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
            <Modal
              title="Add User"
              visible={isModalAddOpen}
              onOk={handleOkAdd}
              onCancel={handleCancel}
            >
              Name:
              <Input
                value={editingUser?.name}
                onChange={(e) => {
                  setEditingUser((pre: any) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              ></Input>
              Age:
              <Input
                value={editingUser?.age}
                onChange={(e) => {
                  setEditingUser((pre: any) => {
                    return { ...pre, age: e.target.value };
                  });
                }}
              ></Input>
            </Modal>
            <Modal
              title="Edit User"
              visible={isModalEditOpen}
              onOk={handleOkEdit}
              onCancel={handleCancel}
            >
              Name:
              <Input
                value={editingUser?.name}
                onChange={(e) => {
                  setEditingUser((pre: any) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              ></Input>
              Age:
              <Input
                value={editingUser?.age}
                onChange={(e) => {
                  setEditingUser((pre: any) => {
                    return { ...pre, age: e.target.value };
                  });
                }}
              ></Input>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default User;
