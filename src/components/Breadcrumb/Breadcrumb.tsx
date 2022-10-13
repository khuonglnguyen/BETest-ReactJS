import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import './Breadcrumb.scss';

export default class Breadcrumb extends React.Component {
  public render(): React.ReactNode {
    return (
      <AntBreadcrumb style={{ margin: '16px 0' }}>
        <AntBreadcrumb.Item>Home</AntBreadcrumb.Item>
        <AntBreadcrumb.Item>List</AntBreadcrumb.Item>
        <AntBreadcrumb.Item>App</AntBreadcrumb.Item>
      </AntBreadcrumb>
    );
  }
}
