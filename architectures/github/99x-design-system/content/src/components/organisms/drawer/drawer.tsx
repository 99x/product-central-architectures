import React from "react";
import AntDrawer from "antd/es/drawer";
import { Button } from "../../atoms";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  width: number | string;
  placement?: "top" | "right" | "bottom" | "left";
  footer?: boolean | React.ReactNode;
  onCancel: () => void;
  onOk: () => void;
  loading?: boolean;
  size?: "default" | "large";
  children: React.ReactNode;
  className?: string;
  closeIcon?: boolean | React.ReactNode;
  extra?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  okText?: string;
  cancelText?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  width,
  onCancel,
  onOk,
  footer = false,
  okText = "Save",
  cancelText = "Cancel",
  ...props
}) => {
  let footerComponent;

  if (typeof footer === "boolean" && footer) {
    footerComponent = (
      <div className="flex justify-between items-center">
        <Button onClick={onCancel} label={cancelText} type="outlined" />
        <Button onClick={onOk} label={okText} />
      </div>
    );
  } else if (React.isValidElement(footer)) {
    footerComponent = footer;
  }

  return (
    <AntDrawer
      title={title}
      onClose={onClose}
      open={open}
      width={width}
      loading={props.loading}
      footer={footerComponent}
      closeIcon={true}
      {...props}
    >
      {props.children}
    </AntDrawer>
  );
};
