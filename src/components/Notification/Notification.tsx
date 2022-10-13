import { NotificationPlacement } from 'antd/lib/notification';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './Notification.scss';

notification.config({
  placement: 'bottomRight',
  bottom: 5,
  duration: 3,
  rtl: false,
});

export const copyToastify = (message: React.ReactNode, description?: string) => {
  // console.log(contextHolder);
  notification.open({
    message: message,
    description: description,
    placement: 'bottomRight',
    className: 'bg-purple lib-copy-notice lib-notification-notice',
    style: { color: '#FFFFFF' },
    icon: <CheckOutlined />,
    closeIcon: (<></>)
  });
};

export const showSuccess = (message: React.ReactNode, placement: NotificationPlacement = 'bottomRight', description?: string) => {
  notification.success({
    message: message,
    description: description,
    placement
  });
};
export const showError = (message: React.ReactNode, placement: NotificationPlacement = 'topRight', description?: string) => {
  notification.error({
    message: message,
    description: description,
    placement,
  });
};
export const showInfo = (message: React.ReactNode, placement: NotificationPlacement = 'bottomRight', description?: string) => {
  notification.info({
    message: message,
    description: description,
    placement,
  });
};

export const showWarning = (message: React.ReactNode, placement: NotificationPlacement = 'bottomRight', description?: string) => {
  notification.warning({
    message: message,
    description: description,
    placement,
  });
};

export const showWarn = (message: React.ReactNode, placement: NotificationPlacement = 'bottomRight', description?: string) => {
  notification.warn({
    message: message,
    description: description,
    placement,
  });
};

export const openNotif = (message: React.ReactNode, placement: NotificationPlacement = 'bottomRight', description?: string) => {
  notification.open({
    message: message,
    description: description,
    placement,
  });
};
