import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { Menu } from './menu';
import { HomeFilled } from '@ant-design/icons';

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Organisms/Menu',
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Menu>;

const items = [
  { label: 'Home', key: 'home', icon: <HomeFilled /> },
  {
    label: 'List',
    key: 'list',
    children: [
      { label: 'Sub Item', key: 'sub-item' },
      { label: 'Sub Item 2', key: 'sub-item-2' },
    ],
  },
  {
    label: 'Item',
    key: 'item',
    children: [{ label: 'Sub Item3', key: 'sub-item-3' }],
  },
];
export const Default: Story = {
  args: {
    items: items,
  },
};

export const ModeHorizontal: Story = {
  name: 'Mode: Horizontal',
  args: {
    items: items,
    mode: 'horizontal',
  },
};

export const ModeVertical: Story = {
  name: 'Mode: Vertical',
  args: {
    items: items,
    mode: 'vertical',
  },
};

export const WithClickTrigger: Story = {
  args: {
    items: items,
    mode: 'vertical',
    triggerSubMenuAction: 'click',
  },
};

export const WithDefaultSelectedKeys: Story = {
  args: {
    items: items,
    defaultSelectedKeys: ['home'],
  },
};

export const WithDefaultOpenKeys: Story = {
  args: {
    items: items,
    defaultSelectedKeys: ['sub-item'],
    defaultOpenKeys: ['list'],
  },
};

export const WithOnClick: Story = {
  args: {
    items: items,
    onClick: fn(),
  },
};

export const WithCustomWidth: Story = {
  args: {
    items: items,
    width: 500,
  },
};

export const OpenCurrentSubmenuOnly: Story = {
  args: {
    items: items,
    openCurrentSubmenuOnly: true,
  },
};

export const Collapsed: Story = {
  args: {
    items: items,
    collapsed: true,
    collapsedWidth: 80,
  },
};

export const ThemeDark: Story = {
  args: {
    items: items,
    theme: 'dark',
  },
};
