import { Component, ReactNode } from 'react';
import { Button, Popover, Tooltip } from 'antd';
import { ButtonPopoverProps } from '~@types/button-popover';
import clsx from 'clsx';
import styles from './ButtonPopover.module.scss';

export default class ButtonPopover extends Component<ButtonPopoverProps> { 
  constructor(props: any) {
    super(props);
  }

  public render(): ReactNode {
    let { text, type, icon, shape, style, href, disabled, tooltip, popover } = this.props;
    if (!type) type = 'default';
    if (!shape) shape = 'circle';

    const onVisibleChange = () => {
      if (popover) return popover.onVisibleChange;
      return;
    }

    return (
      <>
        <Tooltip
          overlayClassName={tooltip ? tooltip.overlayClassName : undefined}
          placement={!tooltip || !tooltip.placement ? 'left' : tooltip.placement}
          title={!tooltip ? undefined : tooltip.title}
          color={tooltip ? tooltip.color : undefined}
          trigger={tooltip && tooltip.trigger ? tooltip.trigger : 'hover'}
        >
          <Popover placement={popover && popover.placement ? popover.placement : 'topRight'}
            title={!popover ? undefined : popover.title}
            content={!popover ? undefined : popover.content}
            trigger={popover && popover.trigger ? popover.trigger : 'click'}
            onVisibleChange={onVisibleChange}
          >
            <Button className={clsx(styles.button)} type={type} shape={shape} icon={icon} style={style} href={href} disabled={disabled}>{text}</Button>
          </Popover>
        </Tooltip>
      </>
    );
  }
}
