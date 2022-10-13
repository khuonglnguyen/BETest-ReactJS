
import { ButtonProps, PaginationProps as AntdPaginationProps, PopoverProps, TooltipProps } from 'antd';
import React from 'react';

interface ButtonPopoverProps extends ButtonProps {
  text?: string;
  style?: React.CSSProperties;
  tooltip?: TooltipProps;
  popover?: PopoverProps;
}