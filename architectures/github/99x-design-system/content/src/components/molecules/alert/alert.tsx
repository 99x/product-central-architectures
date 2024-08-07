import React, { MouseEventHandler } from 'react';
import AntAlert from 'antd/es/alert';

interface AlertProps {
  type: 'success' | 'info' | 'warning' | 'error';
  banner?: boolean;
  closable?: boolean;
  description?: React.ReactNode;
  showIcon?: boolean;
  icon?: React.ReactNode;
  message?: React.ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'success',
  message,
  ...props
}) => {
  return <AntAlert type={type} message={message} {...props} />;
};
