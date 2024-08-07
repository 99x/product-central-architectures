import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./drawer";
import { Button } from "../../atoms/button/button";

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: "Organisms/Drawer",
  parameters: {
    // layout: 'centered',
  },
  //   tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    open: true,
    title: "Default Drawer",
    onClose: fn(),
    children: "This is a default drawer",
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    title: "Drawer with footer",
    onClose: fn(),
    children: "This is a drawer with footer",
    footer: true,
    onCancel: fn(),
    onOk: fn(),
  },
};

export const WithFooterCustomButtonText: Story = {
  args: {
    open: true,
    title: "Drawer with custom button text",
    onClose: fn(),
    children: "This is a drawer with custom button text",
    okText: "Custom Ok",
    cancelText: "Custom Cancel",
    footer: true,
    onCancel: fn(),
    onOk: fn(),
  },
};

export const WithCustomFooter: Story = {
  args: {
    open: true,
    title: "Drawer with custom footer",
    onClose: fn(),
    children: "This is a drawer with custom footer",
    footer: (
      <div>
        <Button label="Custom Button"></Button>
      </div>
    ),
  },
};

export const SizeLarge: Story = {
  args: {
    open: true,
    title: "Large Drawer",
    onClose: fn(),
    children: "This is a large drawer",
    size: "large",
  },
};

export const WithCustomWidth: Story = {
  args: {
    open: true,
    title: "Custom Width Drawer",
    onClose: fn(),
    children: "This is a custom width drawer",
    width: 1000,
  },
};

export const WithCloseIcon: Story = {
  args: {
    open: true,
    title: "Drawer with close icon",
    onClose: fn(),
    children: "This is a drawer with close icon",
    closeIcon: true,
  },
};

export const WithCustomCloseIcon: Story = {
  args: {
    open: true,
    title: "Drawer with custom close icon",
    onClose: fn(),
    children: "This is a drawer with custom close icon",
    closeIcon: "❌",
  },
};

export const Lxoading: Story = {
  args: {
    open: true,
    title: "Loading Drawer",
    onClose: fn(),
    children: "This is a loading drawer",
    loading: true,
  },
};

export const WithExtra: Story = {
  args: {
    open: true,
    title: "Drawer with extra",
    onClose: fn(),
    children: "This is a drawer with extra",
    extra: <Button label="Extra Button"></Button>,
  },
};

export const WithoutMask: Story = {
  args: {
    open: true,
    title: "Drawer without mask",
    onClose: fn(),
    children: "This is a drawer without mask",
    mask: false,
  },
};

export const WithoutMaskClose: Story = {
  args: {
    open: true,
    title: "Drawer without mask close",
    onClose: fn(),
    children: "This is a drawer without mask close",
    maskClosable: false,
  },
};

export const PlacementTop: Story = {
  name: "Placement: Top",
  args: {
    open: true,
    title: "Drawer with placement",
    onClose: fn(),
    children: "This is a drawer with placement",
    placement: "top",
  },
};

export const PlacementRight: Story = {
  name: "Placement: Right",
  args: {
    open: true,
    title: "Drawer with placement",
    onClose: fn(),
    children: "This is a drawer with placement",
    placement: "right",
  },
};

export const PlacementBottom: Story = {
  name: "Placement: Bottom",
  args: {
    open: true,
    title: "Drawer with placement",
    onClose: fn(),
    children: "This is a drawer with placement",
    placement: "bottom",
  },
};

export const PlacementLeft: Story = {
  name: "Placement: Left",
  args: {
    open: true,
    title: "Drawer with placement",
    onClose: fn(),
    children: "This is a drawer with placement",
    placement: "left",
  },
};
