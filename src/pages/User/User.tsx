import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
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
  Calendar,
} from "antd";

import update from "immutability-helper";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDragListView from "react-drag-listview";

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
  const navigate = useNavigate();
  const [isShowPopover, setIsShowPopover] = useState<boolean>(false);
  const [keySelectRecord, setkeySelectRecord] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [key, setKey] = useState("");
  const [columns, setColumns] = useState(() => {
    return [
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
  });

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

  interface DataType {
    id: number;
    name: string;
    age: number;
  }

  interface DraggableBodyRowProps
    extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
  }

  const type = "DraggableBodyRow";

  const DraggableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }: DraggableBodyRowProps) => {
    const ref = useRef<HTMLTableRowElement>(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex < index ? " drop-over-downward" : " drop-over-upward",
        };
      },
      drop: (item: { index: number }) => {
        moveRow(item.index, index);
      },
    });
    const [, drag] = useDrag({
      type,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
        {...restProps}
      />
    );
  };

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = dataSource[dragIndex];
      setDataSource(
        update(dataSource, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [dataSource],
  );

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
    const newDataSource = dataSource.map((item: any) => {
      if (item.id === editingUser.id) {
        return editingUser;
      } else {
        return item;
      }
    });
    localStorage.setItem("users", JSON.stringify([...newDataSource]));
    setDataSource(newDataSource);

    setEditingUser(UserModel.createEmptyUser());
    setisModalEditOpen(false);
  };

  const handleCancel = () => {
    setisModalAddOpen(false);
    setisModalEditOpen(false);
  };

  useEffect(() => {
    const keys = window.location.pathname;
    setKey(keys.slice(6));

    const timer = setInterval(function () {
      localStorage.removeItem("jwt");
      return navigate("/login");
    }, 1000 * 60 * 20);
    return () => {
      clearInterval(timer);
    };
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
                <Search placeholder="Search" className="input-search-user" />
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

            <DndProvider backend={HTML5Backend}>
              <ReactDragListView.DragColumn
                onDragEnd={(fromIndex, toIndex) => {
                  const col = [...columns];
                  const item = col.splice(fromIndex, 1)[0];
                  col.splice(toIndex, 0, item);
                  setColumns(col);
                }}
                nodeSelector={"th"}
              >
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  components={components}
                  onRow={(_, index) => {
                    const attr = {
                      index,
                      moveRow,
                    };
                    return attr as React.HTMLAttributes<any>;
                  }}
                />
              </ReactDragListView.DragColumn>
            </DndProvider>
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
              {/* Age:
              <Input
                value={editingUser?.age}
                onChange={(e) => {
                  setEditingUser((pre: any) => {
                    return { ...pre, age: e.target.value };
                  });
                }}
              ></Input> */}
              DoB:
              <Calendar
                onSelect={(e) => {
                  setEditingUser((pre: any) => {
                    const age = new Date().getFullYear() - e.year();
                    return { ...pre, age: age };
                  });
                }}
              ></Calendar>
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
              {/* Age:
              <Input
                value={editingUser?.age}
                onChange={(e) => {
                  setEditingUser((pre: any) => {
                    return { ...pre, age: e.target.value };
                  });
                }}
              ></Input> */}
              DoB:
              <Calendar
                onSelect={(e) => {
                  setEditingUser((pre: any) => {
                    const age = new Date().getFullYear() - e.year();
                    return { ...pre, age: age };
                  });
                }}
              ></Calendar>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default User;
