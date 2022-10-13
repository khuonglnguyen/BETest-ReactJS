import { Component, ReactNode } from 'react';
import { Layout as AntLayout } from 'antd';
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import withHook from '@/hooks/withHook';
import { useSelector } from 'react-redux';
import { statusApply } from '@/store/selectors';
import './MainLayout.scss';

class MainLayout extends Component<any, any> {
  children: ReactNode;

  constructor(props: any) {
    super(props);
    this.children = props.children;
  }

  public index() {
    const isApply = this.props.useSelector;

    const [acceptAllCookie, setAcceptAllCookie] = this.props.useState;
    return (
      <AntLayout className="lib-layout">
        <Header />
        <Footer />
      </AntLayout>
    );
  }

  public render(): React.ReactNode {
    return this.index();
  }
}

export default withHook(MainLayout, [
  { useHook: useSelector, hookName: 'useSelector', value: statusApply },
  { useHook: React.useState, hookName: 'useState', value: null },
]);
