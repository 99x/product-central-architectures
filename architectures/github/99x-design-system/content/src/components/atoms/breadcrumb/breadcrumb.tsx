import React from 'react';
import AntBreadcrumb from 'antd/es/breadcrumb';

interface BreadcrumbProps {
  items: Array<{ href?: string; title: string }>;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return <AntBreadcrumb items={items} />;
};
