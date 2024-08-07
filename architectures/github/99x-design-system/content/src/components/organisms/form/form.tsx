/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AntForm from "antd/es/form";

interface FormProps {
  disabled?: boolean;
  initialValues?: any;
  labelWrap?: boolean;
  labelCol?: { span?: number; offset?: number; flex?: string | number };
  wrapperCol?: { span?: number; offset?: number; flex?: string | number };
  layout?: "horizontal" | "vertical" | "inline";
  name?: string;
  labelAlign?: "left" | "right";
  preserve?: boolean;
  scrollToFirstError?: boolean;
  size?: "small" | "middle" | "large";
  variant?: "outlined" | "filled" | "borderless";
  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  clearOnDestroy?: boolean;
  validateMessages?: any;
  form?: any;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({
  variant = "outlined",
  layout = "vertical",
  ...props
}) => {
  return (
    <AntForm layout={layout} variant={variant} {...props}>
      {props.children}
    </AntForm>
  );
};
