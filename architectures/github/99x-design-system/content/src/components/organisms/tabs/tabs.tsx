import React from 'react';
import AntTabs from 'antd/es/tabs';

interface TabProps {
  items: {
    key: string;
    label: string;
    children: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
  }[];
  defaultActiveKey?: string;
  centered?: boolean;
  onChange?: (key: string) => void;
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  type?: 'line' | 'card';
  size?: 'small' | 'middle' | 'large';
}

export const Tabs: React.FC<TabProps> = ({
  items,
  defaultActiveKey = '1',
  type = 'line',
  tabPosition = 'top',
  size = 'middle',
  ...props
}) => {
  return (
    <AntTabs
      defaultActiveKey={defaultActiveKey}
      items={items}
      type={type}
      tabPosition={tabPosition}
      size={size}
      {...props}
    ></AntTabs>
  );
};
