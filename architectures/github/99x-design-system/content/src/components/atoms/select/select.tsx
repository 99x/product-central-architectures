import React from "react";
import { Select as AntSelect } from "antd";

interface SelectProps {
  allowClear?: boolean;
  autoClearSearchValue?: boolean;
  classNames?: string;
  defaultValue?: string | string[] | number | number[];
  disabled?: boolean;
  fullWidth?: boolean;
  id: string;
  listHeight?: number;
  label?: string;
  loading?: boolean;
  maxCount?: number;
  maxTagCount?: number | "responsive";
  maxTagTextLength?: number;
  mode?: "multiple" | "tags";
  notFoundContent?: React.ReactNode;
  open?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionRender?: (option: any) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { label: string; value: any }[];
  placeholder?: string;
  placement?: "topLeft" | "bottomLeft" | "topRight" | "bottomRight";
  showSearch?: boolean;
  size?: "small" | "middle" | "large";
  status?: "error" | "warning";
  tokenSeparators?: string[];
  type?: "outlined" | "filled" | "borderless";
  value?: string | string[] | number | number[];
  onChange?: (value: string | string[] | number | number[]) => void;
  onClear?: () => void;
  onDeselect?: (value: string | number) => void;
  onSearch?: (value: string | number) => void;
  onSelect?: (value: string | number) => void;
}

export const Select: React.FC<SelectProps> = ({
  allowClear = false,
  autoClearSearchValue = true,
  listHeight = 256,
  placement = "bottomLeft",
  type = "outlined",
  fullWidth = true,
  ...props
}) => {
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {props.label && (
        <label
          htmlFor={props.id}
          className="text-sm block font-semibold mb-4 text-gray-600"
        >
          {props.label}
        </label>
      )}
      <AntSelect
        allowClear={allowClear}
        autoClearSearchValue={autoClearSearchValue}
        filterOption={filterOption}
        listHeight={listHeight}
        placement={placement}
        variant={type}
        className={`${fullWidth ? "w-full" : ""} ${props.classNames}`}
        {...props}
      />
    </>
  );
};
