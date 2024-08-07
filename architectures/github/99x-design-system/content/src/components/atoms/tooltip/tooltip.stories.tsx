import { within, userEvent, expect } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";
import { Button } from "../button/button";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Atoms/Tooltip",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;
const verifyTooltipExistence = async (
  canvasElement: HTMLElement,
  triggerText: string,
  tooltipText: string,
  triggerType = "hover"
) => {
  const canvas = within(canvasElement);
  const trigger = await canvas.findByText(triggerText);
  if (triggerType === "click") {
    await userEvent.click(trigger);
  } else {
    await userEvent.hover(trigger);
  }
  const tooltip = await within(document.documentElement).findByRole("tooltip");
  expect(tooltip).toBeInTheDocument();
  expect(tooltip).toHaveTextContent(tooltipText);
  return tooltip;
};
export const Default: Story = {
  args: {
    title: "Tooltip",
    children: "Hover me",
  },
  play: async ({ canvasElement }) => {
    verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
  },
};

export const WithColor: Story = {
  args: {
    title: "Tooltip",
    children: "Hover me",
    color: "blue",
  },
  play: async ({ canvasElement }) => {
    const tooltip = await verifyTooltipExistence(
      canvasElement,
      "Hover me",
      "Tooltip"
    );
    expect(tooltip).toHaveStyle({ backgroundColor: "#1677ff" });
  },
};

export const WithoutArrow: Story = {
  args: {
    title: "Tooltip",
    children: "Hover me",
    arrow: false,
  },
};

export const WithDefaultOpen: Story = {
  args: {
    title: "Tooltip",
    children: "Hover me",
    defaultOpen: true,
  },
  play: async () => {
    const tooltip = await within(document.documentElement).findByRole(
      "tooltip"
    );
    expect(tooltip).toBeInTheDocument();
  },
};

export const TriggerClick: Story = {
  name: "Trigger: Click",
  args: {
    title: "Tooltip",
    children: <Button label="Click Me" />,
    trigger: "click",
  },
  play: async ({ canvasElement }) => {
    verifyTooltipExistence(canvasElement, "Click Me", "Tooltip", "click");
  },
};

export const Top: Story = {
  name: "Placement: Top",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "top",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-top");
    expect(placement).toBeInTheDocument();
  },
};

export const Bottom: Story = {
  name: "Placement: Bottom",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "bottom",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-bottom");
    expect(placement).toBeInTheDocument();
  },
};

export const Left: Story = {
  name: "Placement: Left",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "left",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-left");
    expect(placement).toBeInTheDocument();
  },
};

export const Right: Story = {
  name: "Placement: Right",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "right",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-right");
    expect(placement).toBeInTheDocument();
  },
};

export const TopLeft: Story = {
  name: "Placement: Top Left",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "topLeft",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-topLeft");
    expect(placement).toBeInTheDocument();
  },
};

export const TopRight: Story = {
  name: "Placement: Top Right",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "topRight",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-topRight");
    expect(placement).toBeInTheDocument();
  },
};

export const BottomLeft: Story = {
  name: "Placement: Bottom Left",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "bottomLeft",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(
      ".ant-tooltip-placement-bottomLeft"
    );
    expect(placement).toBeInTheDocument();
  },
};

export const BottomRight: Story = {
  name: "Placement: Bottom Right",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "bottomRight",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(
      ".ant-tooltip-placement-bottomRight"
    );
    expect(placement).toBeInTheDocument();
  },
};

export const LeftTop: Story = {
  name: "Placement: Left Top",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "leftTop",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-leftTop");
    expect(placement).toBeInTheDocument();
  },
};

export const LeftBottom: Story = {
  name: "Placement: Left Bottom",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "leftBottom",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(
      ".ant-tooltip-placement-leftBottom"
    );
    expect(placement).toBeInTheDocument();
  },
};

export const RightTop: Story = {
  name: "Placement: Right Top",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "rightTop",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(".ant-tooltip-placement-rightTop");
    expect(placement).toBeInTheDocument();
  },
};

export const RightBottom: Story = {
  name: "Placement: Right Bottom",
  args: {
    title: "Tooltip",
    children: "Hover me",
    placement: "rightBottom",
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    await verifyTooltipExistence(canvasElement, "Hover me", "Tooltip");
    const placement = document.querySelector(
      ".ant-tooltip-placement-rightBottom"
    );
    expect(placement).toBeInTheDocument();
  },
};
