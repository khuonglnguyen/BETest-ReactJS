import withHook from '@/hooks/withHook';
import { Modal } from 'antd';
import React, { useState } from 'react';
// import { ModalProps } from '~@types/modal';

class Modals extends React.Component<any> {

  constructor(props: any) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }

  private showModal = () => {
    if (!this.props) return;
    let [visible, setVisible] = this.props.useState;
    visible = true;
    setVisible(visible);
  }

  private handleOk = () => {
    let [confirmLoading, setConfirmLoading] = this.props.useState;
    confirmLoading = true;
    setConfirmLoading(confirmLoading);
    setTimeout(() => {
      this.handleCancel();
      setConfirmLoading(!confirmLoading);
    }, 2000);
  };

  private handleCancel = () => {
    console.log('Clicked cancel button');
    if(this.props.closeTab) this.closeTab();
    let [visible, setVisible] = this.props.useState;
    visible = false;
    setVisible(visible);
  };

  private closeTab = (): void => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  }

  componentDidMount(): void {
    this.showModal();
  }

  render(): React.ReactNode {
    const [visible] = this.props.useState;
    const [confirmLoading] = this.props.useState;
    const title = this.props.title ? this.props.title : '';
    const closable = this.props.closable ? this.props.closable : false;
    const width = this.props.width ? this.props.width : 360;
    const style: React.CSSProperties = this.props.style ? this.props.style : {};
    let wrapClassName: string = 'lib-modal-wrapper';
    if (this.props.wrapClassName) wrapClassName += ` ${this.props.wrapClassName}`;

    return (
      <>
        <Modal
          title={title}
          width={width}
          style={style}
          closable={closable}
          wrapClassName={wrapClassName}
          bodyStyle={{margin: 0, padding: '10px'}}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div>{this.props.children}</div>
        </Modal>
      </>
    );
  }
}

export default withHook(
  Modals,
  [
    { useHook: useState, hookName: 'useState', value: false },
    { useHook: useState, hookName: 'useContentState' }
  ]
);
