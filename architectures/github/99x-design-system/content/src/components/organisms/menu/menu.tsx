import React, { useState } from "react";
import AntMenu from "antd/es/menu";
import type { MenuProps as AntMenuProps } from "antd";

type MenuItem = Required<AntMenuProps>["items"][number];

export interface MenuProps {
  items: MenuItem[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  mode?: "vertical" | "horizontal" | "inline";
  width?: number | string;
  collapsed?: boolean;
  collapsedWidth?: number;
  openCurrentSubmenuOnly?: boolean;
  triggerSubMenuAction?: "click" | "hover";
  theme?: "light" | "dark";
  onClick?: (item: MenuItem) => void;
}

const getLevelKeys = () => {
  const key: Record<string, number> = {};
  return key;
};

export const Menu: React.FC<MenuProps> = ({
  items,
  mode = "inline",
  ...props
}) => {
  const levelKeys = getLevelKeys();
  const [stateOpenKeys, setStateOpenKeys] = useState([] as string[]);

  const onOpenChange: AntMenuProps["onOpenChange"] = (openKeys) => {
    if (!props.openCurrentSubmenuOnly) {
      setStateOpenKeys(openKeys);
      return;
    }
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <div
      style={{
        width: props.width,
      }}
    >
      <AntMenu
        mode={mode}
        items={items}
        onOpenChange={onOpenChange}
        {...props}
      />
    </div>
  );
};
