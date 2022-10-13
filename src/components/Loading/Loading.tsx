import { Spin } from 'antd';
import React from 'react';
import './Loading.scss';

export default function Loading(props: any) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(props.isLoading);
  }, [props.isLoading]);
  return (
    <>
      <div className="lib-spin-wrapper">
        <div className="lib-spin-content">
          <Spin className="lib-spin" size="large" spinning={loading}></Spin>
        </div>
      </div>
    </>
  );
}
