import React from "react";
import AntDropdown from "antd/es/dropdown";
import { MenuProps } from "antd/es/menu";
import { Button, ButtonProps } from "../button/button";
import { ItemType, SubMenuType } from "antd/es/menu/interface";

export interface DropdownProps {
  items: ItemType[] | SubMenuType[];
  placement?:
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "topLeft"
    | "topCenter"
    | "topRight";

  trigger?: ("click" | "hover")[];
  triggerType?: "text" | "button" | "custom";
  triggerText: string;
  children?: React.ReactNode;
  disabled?: boolean;
  buttonProps?: ButtonProps;
  autoFocus?: boolean;
  selectable?: boolean;
  defaultSelectedKeys?: string[];
  onOpenChange?: (visible: boolean) => void;
  onClick?: MenuProps["onClick"];
}

export const Dropdown: React.FC<DropdownProps> = ({
  placement = "bottomLeft",
  trigger = ["hover"],
  triggerType = "text",
  items,
  ...props
}: DropdownProps) => {
  let child;
  if (triggerType === "text") {
    child = (
      <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
        {props.triggerText}
      </a>
    );
  } else if (triggerType === "button") {
    child = (
      <Button
        label={props.buttonProps?.label || props.triggerText}
        {...props.buttonProps}
      ></Button>
    );
  } else if (triggerType === "custom") {
    child = props.children;
  }

  return (
    <AntDropdown
      menu={{
        items,
        onClick: props.onClick,
        selectable: props.selectable,
        defaultSelectedKeys: props.defaultSelectedKeys,
      }}
      trigger={trigger}
      placement={placement}
      {...props}
    >
      {child}
    </AntDropdown>
  );
};
