import React from 'react';
import AntTooltip from 'antd/es/tooltip';

interface TooltipProps {
  title: string;
  color?: string;
  arrow?: boolean;
  defaultOpen?: boolean;
  fresh?: boolean;
  className?: string;
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  trigger?: 'hover' | 'click';
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  trigger = 'hover',
  placement = 'top',
  arrow = true,
  ...props
}) => {
  return (
    <AntTooltip
      title={title}
      trigger={trigger}
      placement={placement}
      arrow={arrow}
      overlayClassName={props.className}
      {...props}
    >
      {props.children}
    </AntTooltip>
  );
};
