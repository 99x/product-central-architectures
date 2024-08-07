import React from 'react';
import { Form } from 'antd';
import { Rule } from 'antd/es/form';

const { Item } = Form;

interface FormItemProps {
  label?: string;
  name?: string;
  colon?: boolean;
  rules?: Rule[];
  dependencies?: string[];
  extra?: React.ReactNode;
  hidden?: boolean;
  initialValue?: string | string[] | boolean;
  preserve?: boolean;
  required?: boolean;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  layout?: 'horizontal' | 'vertical';
  valuePropName?: string;
  children: React.ReactNode;
  validateFirst?: boolean | 'parallel';
  validateTrigger?: string | string[];
  validateDebounce?: number;
}

export const FormItem: React.FC<FormItemProps> = ({
  colon = false,
  ...props
}) => {
  return (
    <Item colon={colon} {...props}>
      {props.children}
    </Item>
  );
};
