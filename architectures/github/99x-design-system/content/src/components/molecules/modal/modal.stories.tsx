import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./modal";
import { Button } from "../../atoms/button/button";

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: "Molecules/Modal",
  parameters: {
    // layout: 'centered',
  },
  //   tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    title: "Default Modal",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a default modal",
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    title: "Modal with footer",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal with footer",
    footer: (
      <div>
        <Button label="Custom Button"></Button>
      </div>
    ),
  },
};

export const WithCustomButtonText: Story = {
  args: {
    open: true,
    title: "Modal with custom button text",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal with custom button text",
    okText: "Custom Ok",
    cancelText: "Custom Cancel",
  },
};

export const WithConfirmLoading: Story = {
  args: {
    open: true,
    title: "Modal with confirm loading",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal with confirm loading",
    confirmLoading: true,
  },
};

export const HideClose: Story = {
  args: {
    open: true,
    title: "Modal without close",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal without close button",
    closable: false,
  },
};

export const Loading: Story = {
  args: {
    open: true,
    title: "Loading Modal",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a loading modal",
    loading: true,
  },
};

export const NotCentered: Story = {
  args: {
    open: true,
    title: "Not Centered Modal",
    onCancel: fn(),
    onOk: fn(),
    children: "This is not a centered modal",
    centered: false,
  },
};

export const WithWidth: Story = {
  args: {
    open: true,
    title: "Modal with width",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal with width",
    width: 800,
  },
};

export const WithStyle: Story = {
  args: {
    open: true,
    title: "Modal with style",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal with style",
    style: { top: 20 },
    centered: false,
  },
};

export const WithoutMask: Story = {
  args: {
    open: true,
    title: "Modal without mask",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal without mask",
    mask: false,
  },
};

export const WithoutMaskClose: Story = {
  args: {
    open: true,
    title: "Modal without mask close",
    onCancel: fn(),
    onOk: fn(),
    children: "This is a modal without mask close",
    maskClosable: false,
  },
};
