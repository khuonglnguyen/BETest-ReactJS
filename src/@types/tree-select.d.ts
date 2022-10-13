
import type { TreeSelectProps as AntdTreeSelectProps } from 'antd';

interface TreeSelectProps extends AntdTreeSelectProps {
  dropdownMatchSelectWidth?: number | boolean | undefined;
  width?: number | string | undefined;
  style?: React.CSSProperties | undefined;
  onChange?: (value: any) => void
  onSearch?: (value: any) => void;
  onSelect?: (value: any) => void;
  onClearAll?: (event: any) => void;
  onDropdownVisibleChange?: (open: any) => void;
}