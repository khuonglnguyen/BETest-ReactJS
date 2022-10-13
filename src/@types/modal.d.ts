
import { ModalProps as AntdModalProps } from 'antd';

interface ModalProps extends AntdModalProps {
  setVisible: (value: boolean) => void;
  setConfirmLoading: (value: boolean) => void;
  [key | any]?: any;
}