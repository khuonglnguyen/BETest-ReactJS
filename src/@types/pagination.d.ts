
import { PaginationProps as AntdPaginationProps } from 'antd';

interface PaginationProps extends AntdPaginationProps {
  totalPage: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  isShowTotal?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}