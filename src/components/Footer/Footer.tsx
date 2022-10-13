import React from 'react';
import { Layout } from 'antd';
import './Footer.scss';

const AntFooter = Layout.Footer;

export default class Footer extends React.Component {
  listTerm = [
    { title: 'Terms of Service', value: 1 },
    { title: 'Platform Rulebook', value: 2 },
  ];

  public render(): React.ReactNode {
    return (
      <AntFooter className="lib-footer">
        <div className="lib-footer__version">
          <p>© 2022 BE Solution. All rights reserved. Version: web-1.0.1</p>
        </div>
      </AntFooter>
    );
  }
}
