import { within, expect } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./loader";

const meta: Meta<typeof Loader> = {
  component: Loader,
  title: "Atoms/Loader",
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loader>;

const verifyLoader = async (
  canvasElement: HTMLElement,
  options: { className?: string; tip?: string; childrenText?: string } = {}
) => {
  const className = options.className || ".ant-spin-spinning";
  const loader = canvasElement.querySelector(`${className}`);

  expect(loader).toBeInTheDocument();

  if (options.tip) {
    const tipElement = within(canvasElement).getByText(options.tip);
    expect(tipElement).toBeInTheDocument();
  }

  if (options.childrenText) {
    const children = within(canvasElement).getByText(options.childrenText);
    expect(children).toBeInTheDocument();
  }
};

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    await verifyLoader(canvasElement);
  },
};

export const Small: Story = {
  name: "Size:Small",
  args: {
    size: "small",
  },
  play: async ({ canvasElement }) => {
    await verifyLoader(canvasElement, {
      className: ".ant-spin.ant-spin-spinning.ant-spin-sm",
    });
  },
};

export const Large: Story = {
  name: "Size:Large",
  args: {
    size: "large",
  },
  play: async ({ canvasElement }) => {
    await verifyLoader(canvasElement, {
      className: ".ant-spin.ant-spin-spinning.ant-spin-lg",
    });
  },
};

export const WithTip: Story = {
  args: {
    tip: "Loading...",
    children: <div></div>,
  },
  play: async ({ canvasElement }) => {
    await verifyLoader(canvasElement, { tip: "Loading..." });
  },
};

export const Fullscreen: Story = {
  args: {
    fullscreen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyLoader(canvasElement, { className: ".ant-spin-fullscreen" });
  },
};

export const Delayed: Story = {
  args: {
    delay: 500,
  },
  play: async ({ canvasElement }) => {
    // Wait for the delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await verifyLoader(canvasElement);
  },
};

export const WithChildren: Story = {
  args: {
    children: <div className="w-full p-8 bg-gray-200">Content</div>,
  },
  play: async ({ canvasElement }) => {
    await verifyLoader(canvasElement, { childrenText: "Content" });
  },
};
