import AntCheckbox from "antd/es/checkbox";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";

interface BaseProps {
  type: "single" | "group";
}

export interface SingleProps extends BaseProps {
  type: "single";
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
}

export interface GroupProps extends BaseProps {
  type: "group";
  defaultValue?: string[];
  value?: string[];
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  onChange?: (checkedValue: string[]) => void;
}

export type CheckboxProps = SingleProps | GroupProps;

export const Checkbox: React.FC<CheckboxProps> = ({
  type = "single",
  ...props
}: CheckboxProps) => {
  if (type === "group") {
    const groupProps = props as GroupProps;
    return (
      <AntCheckbox.Group
        defaultValue={groupProps.defaultValue}
        options={groupProps.options}
        onChange={groupProps.onChange}
        value={groupProps.value}
      />
    );
  }

  const { label, onChange, ...restProps } = props as SingleProps;
  return (
    <AntCheckbox onChange={onChange} {...restProps}>
      {label}
    </AntCheckbox>
  );
};
