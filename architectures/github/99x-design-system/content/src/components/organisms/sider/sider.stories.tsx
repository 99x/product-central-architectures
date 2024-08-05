import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Sider } from "./sider";

import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

const meta: Meta<typeof Sider> = {
  component: Sider,
  title: "Organisms/Sider",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Sider>;

const items = [
  { key: "1", icon: <MailOutlined />, label: "Option 1" },
  { key: "2", icon: <AppstoreOutlined />, label: "Option 2" },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "3", label: "Option 3" },
      { key: "4", label: "Option 4" },
    ],
  },
];

export const Default: Story = {
  args: {
    menuProps: {
      items: items,
    },
  },
};

export const WithCustomWidth: Story = {
  args: {
    width: 400,
    menuProps: {
      items: items,
    },
  },
};
export const NonCollapsible: Story = {
  args: {
    collapsible: false,
    menuProps: {
      items: items,
    },
  },
};

export const WithCustomCollapsedWidth: Story = {
  args: {
    collapsedWidth: 50,
    menuProps: {
      items: items,
    },
  },
};

export const WithDefaultCollapsed: Story = {
  args: {
    defaultCollapsed: true,
    menuProps: {
      items: items,
    },
  },
};

export const HideOnCollapse: Story = {
  args: {
    collapsedWidth: 0,
    trigger: null,
    menuProps: {
      items: items,
    },
    onCollapse: fn(),
  },
};

export const WithBreakpoint: Story = {
  args: {
    breakpoint: "lg",
    menuProps: {
      items: items,
    },
    onBreakpoint: fn(),
  },
};

export const WithHeader: Story = {
  args: {
    header: <div className="text-white text-center py-3">Header</div>,
    menuProps: {
      items: items,
    },
  },
};

export const WithFooter: Story = {
  args: {
    footer: <div className="text-white text-center py-3">Footer</div>,
    menuProps: {
      items: items,
    },
  },
};

export const WithCustomTrigger: Story = {
  args: {
    trigger: <div className="text-white text-center py-3">Trigger</div>,
    menuProps: {
      items: items,
    },
  },
};

export const FixedSider: Story = {
  args: {
    isFixed: true,
    menuProps: {
      items: items,
    },
  },
};

export const WithScrollableMenu: Story = {
  args: {
    menuProps: {
      items: [
        ...items,
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" },
        { key: "13", label: "Option 13" },
        { key: "14", label: "Option 14" },
      ],
    },
  },
};
