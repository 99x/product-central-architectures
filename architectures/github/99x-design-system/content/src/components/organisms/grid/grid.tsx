import React from 'react';
import AntRow from 'antd/es/row';
import AntCol from 'antd/es/col';

export interface RowProps {
  gutter?: number | object | [number, number] | [object, object];
  children?: React.ReactNode;
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | {
        [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']:
          | 'start'
          | 'end'
          | 'center'
          | 'space-around'
          | 'space-between'
          | 'space-evenly';
      };
  align?:
    | 'top'
    | 'middle'
    | 'bottom'
    | 'stretch'
    | {
        [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']:
          | 'top'
          | 'middle'
          | 'bottom'
          | 'stretch';
      };
  wrap?: boolean;
  className?: string;
}

export interface ColProps {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  order?: number;
  flex?: string | number;
  xs?: number | object;
  sm?: number | object;
  md?: number | object;
  lg?: number | object;
  xl?: number | object;
  xxl?: number | object;
  children?: React.ReactNode;
  className?: string;
}

export const Row: React.FC<RowProps> = ({
  gutter = [16, 16],
  wrap = true,
  children,
  ...props
}) => {
  return (
    <AntRow gutter={gutter} wrap={wrap} {...props}>
      {children}
    </AntRow>
  );
};

export const Col: React.FC<ColProps> = ({ span, children, ...props }) => {
  return (
    <AntCol span={span} {...props}>
      {children}
    </AntCol>
  );
};
