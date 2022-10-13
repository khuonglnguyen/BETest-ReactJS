import React from 'react';
import './AcceptCookie.scss';
import { getLocalItem, setLocalItem } from '@helpers/storage';
import withHook from '@/hooks/withHook';

class AcceptCookie extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const acceptAllCookie = getLocalItem('AcceptAllCookie');
    if (acceptAllCookie) this.props.setAcceptAllCookie(acceptAllCookie);
  }

  onOpenPlatform() {}

  onOpenTerms() {}

  onAccept = () => {
    setLocalItem('AcceptAllCookie', 'accept');
    this.props.setAcceptAllCookie('accept');
  };

  public render(): React.ReactNode {
    return (
      <>
        <div id="lib-accept-all-cookie" className="lib-accept-all-cookie">
          <div className="content">
            <span className="bold">Reminder</span>: By using our services, you are agreeable to our&nbsp;
            <a onClick={() => this.onOpenPlatform()}>Platform Rules</a>
            &nbsp;and&nbsp;
            <a onClick={() => this.onOpenTerms()}>Terms of Service</a>. Click 'OK' to close this banner
          </div>
          <div className="button" onClick={() => this.onAccept()}> OK</div >
        </div>
      </>
    );
  }
}

export default withHook(AcceptCookie, [
  { useHook: React.useState, hookName: 'useState', value: null }
]);
