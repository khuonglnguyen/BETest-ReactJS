import * as React from 'react';
import { Button, Popover, Tooltip } from 'antd';

import './ButtonIconCommon.scss';

export function ButtonIconCommon(props: any) {
  const [visible, setVisible] = React.useState(false);
  const { tooltip } = props;

  const handleVisibleChange = (newVisible: any) => {
    setVisible(newVisible);
  };

  const Icon = () => {
    if (typeof props.icon === 'string') return <img src={props.icon} height={30} width={30} />;
    else return props.icon;
  };

  return (
    <>
      <Tooltip
        overlayClassName={tooltip ? tooltip.overlayClassName : undefined}
        placement={!tooltip || !tooltip.placement ? 'left' : tooltip.placement}
        title={!tooltip ? undefined : tooltip.title}
        color={tooltip ? tooltip.color : undefined}
        trigger={tooltip && tooltip.trigger ? tooltip.trigger : 'hover'}
        overlayInnerStyle={tooltip ? tooltip.overlayInnerStyle : undefined}
      >
        <Popover
          content={props.content}
          title={props.title}
          trigger="click"
          visible={visible}
          placement="topRight"
          autoAdjustOverflow={true}
          overlayClassName="lib-popover-button"
          onVisibleChange={handleVisibleChange}
        >
          <Button
            shape="circle"
            className="lib-btn-icon-common"
            style={{ background: props.bgColor }}
            icon={<Icon />}
          ></Button>
        </Popover>
      </Tooltip>
    </>
  );
}
