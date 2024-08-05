import React from 'react';
import AntSpin from 'antd/es/spin';

interface LoaderProps {
  spinning?: boolean;
  // Delay in milliseconds before the spinner starts spinning
  delay?: number;
  size?: 'small' | 'default' | 'large';
  className?: string;
  children?: React.ReactNode;
  tip?: React.ReactNode;
  fullscreen: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  spinning = true,
  size = 'default',
  ...props
}) => {
  return (
    <AntSpin
      spinning={spinning}
      size={size}
      wrapperClassName={props.className}
      {...props}
    >
      {props.children}
    </AntSpin>
  );
};
