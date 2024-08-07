import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "Organisms/Tabs",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const items = [
  { key: "1", label: "Tab 1", children: "Tab Content 1" },
  { key: "2", label: "Tab 2", children: "Tab Content 2" },
  { key: "3", label: "Tab 3", children: "Tab Content 3" },
];
export const Default: Story = {
  args: {
    items: items,
  },
};

export const WithIcon: Story = {
  args: {
    items: [
      { key: "1", label: "Tab 1", icon: "🏠", children: "Tab Content 1" },
      { key: "2", label: "Tab 2", children: "Tab Content 2" },
      { key: "3", label: "Tab 3", children: "Tab Content 3" },
    ],
    onChange: fn(),
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { key: "1", label: "Tab 1", children: "Tab Content 1" },
      { key: "2", label: "Tab 2", disabled: true, children: "Tab Content 2" },
      { key: "3", label: "Tab 3", children: "Tab Content 3" },
    ],
  },
};

export const WithDefaultActiveKey: Story = {
  args: {
    items: items,
    defaultActiveKey: "2",
  },
};

export const Centered: Story = {
  args: {
    items: items,
    centered: true,
  },
};

export const Card: Story = {
  name: "Type: Card",
  args: {
    items: items,
    type: "card",
  },
};

export const Small: Story = {
  name: "Size: Small",
  args: {
    items: items,
    size: "small",
  },
};

export const Large: Story = {
  name: "Size: Large",
  args: {
    items: items,
    size: "large",
  },
};

export const Right: Story = {
  name: "Tab Position: Right",
  args: {
    items: items,
    tabPosition: "right",
  },
};

export const Bottom: Story = {
  name: "Tab Position: Bottom",
  args: {
    items: items,
    tabPosition: "bottom",
  },
};

export const Left: Story = {
  name: "Tab Position: Left",
  args: {
    items: items,
    tabPosition: "left",
  },
};
