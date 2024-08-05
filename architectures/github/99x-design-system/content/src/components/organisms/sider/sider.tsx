import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Menu, MenuProps } from "../menu/menu";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

interface SiderProps {
  collapsed?: boolean;
  width?: number | string;
  collapsible?: boolean;
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  collapsedWidth?: number;
  defaultCollapsed?: boolean;
  menuProps: MenuProps;
  trigger?: React.ReactNode;
  onBreakpoint?: (broken: boolean) => void;
  onCollapse?: (
    collapsed: boolean,
    type: "clickTrigger" | "responsive"
  ) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isFixed?: boolean;
}

export const Sider: React.FC<SiderProps> = ({
  width = 256,
  collapsible = true,
  breakpoint = "lg",
  ...props
}) => {
  const [collapsedWidth, setCollapsedWidth] = useState<number>(
    props.collapsedWidth || 80
  );
  const windowSize = useWindowSize();

  const handleBreakpoint = (broken: boolean) => {
    if (props.onBreakpoint) {
      props.onBreakpoint(broken);
    }
  };

  useEffect(() => {
    if (windowSize.width < 600) {
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(80);
    }
  }, [windowSize.width]);

  return (
    <Layout className="h-full">
      <Layout.Sider
        width={width}
        collapsible={collapsible}
        theme="dark"
        className="h-full"
        zeroWidthTriggerStyle={{ top: 0 }}
        collapsedWidth={collapsedWidth}
        onBreakpoint={handleBreakpoint}
        breakpoint={breakpoint}
        {...(props.isFixed && {
          style: {
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          },
        })}
        {...props}
      >
        {props.header}
        <Menu theme="dark" {...props.menuProps} />
        {props.footer}
      </Layout.Sider>
    </Layout>
  );
};
