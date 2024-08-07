import { within, userEvent, expect, fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./button";
import { SampleIcon } from "../../../icons/sampleIcon";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: [
          "primary",
          "secondary",
          "accent",
          "neutral",
          "danger",
          "warning",
          "success",
        ],
      },
    },
  },
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof Button>;

// Test utility function
const testButtonClick = async (
  canvasElement: HTMLElement,
  args: ButtonProps
) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole("button", { name: args.label });
  await userEvent.click(button);
  expect(button).toHaveTextContent(args.label ?? "");
  expect(button).toBeEnabled();
  expect(args.onClick).toHaveBeenCalled();
};
export const Default: Story = {
  name: "Default:Button",
  args: {
    label: "Default Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Primary: Story = {
  name: "Variant:Primary",
  args: {
    variant: "primary",
    label: "Primary Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Secondary: Story = {
  name: "Variant:Secondary",
  args: {
    variant: "secondary",
    label: "Secondary Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Accent: Story = {
  name: "Variant:Accent",
  args: {
    variant: "accent",
    label: "Accent Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Neutral: Story = {
  name: "Variant:Neutral",
  args: {
    variant: "neutral",
    label: "Neutral Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Danger: Story = {
  name: "Variant:Danger",
  args: {
    variant: "danger",
    label: "Danger Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Warning: Story = {
  name: "Variant:Warning",
  args: {
    variant: "warning",
    label: "Warning Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Success: Story = {
  name: "Variant:Success",
  args: {
    variant: "success",
    label: "Success Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Block: Story = {
  name: "Type:Block",
  args: {
    variant: "primary",
    label: "Block Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Dashed: Story = {
  name: "Type:Dashed",
  args: {
    type: "dashed",
    variant: "primary",
    label: "Dashed Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Outlined: Story = {
  name: "Type:Outlined",
  args: {
    type: "outlined",
    variant: "primary",
    label: "Outlined Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Link: Story = {
  name: "Type:Link",
  args: {
    type: "link",
    variant: "primary",
    label: "Link Button",
    href: "https://storybook.js.org",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("link", { name: "Link Button" });
    await userEvent.click(button);
    expect(button).toHaveTextContent(args.label ?? "");
    expect(button).toHaveAttribute("href", "https://storybook.js.org");
  },
};

export const Text: Story = {
  name: "Type:Text",
  args: {
    type: "text",
    variant: "primary",
    label: "Text Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Small: Story = {
  name: "Size:Small",
  args: {
    size: "small",
    variant: "primary",
    label: "Small Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Middle: Story = {
  name: "Size:Middle",
  args: {
    size: "middle",
    variant: "primary",
    label: "Middle Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Large: Story = {
  name: "Size:Large",
  args: {
    size: "large",
    variant: "primary",
    label: "Large Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Disabled: Story = {
  name: "State:Disabled",
  args: {
    variant: "primary",
    label: "Disabled Button",
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", {
      name: "Disabled Button",
    });
    expect(button).toHaveTextContent(args.label ?? "");
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  name: "State:Loading",
  args: {
    variant: "primary",
    label: "Loading Button",
    loading: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button");
    expect(button).toHaveTextContent(args.label ?? "");
    const span = await within(button).findByLabelText("loading");
    expect(span).toBeInTheDocument();
    await userEvent.click(button);
    expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const DefaultShape: Story = {
  name: "Shape:Default",
  args: {
    variant: "primary",
    label: "Default Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Circle: Story = {
  name: "Shape:Circle",
  args: {
    shape: "circle",
    variant: "primary",
    label: "C",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const Round: Story = {
  name: "Shape:Round",
  args: {
    shape: "round",
    variant: "primary",
    label: "Round Button",
  },
  play: async ({ args, canvasElement }) => {
    await testButtonClick(canvasElement, args);
  },
};

export const IconOnly: Story = {
  name: "Icon: Icon Only",
  args: {
    icon: <SampleIcon aria-label="Sample Icon" />,
    shape: "circle",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button");
    await userEvent.click(button);
    expect(button).toBeEnabled();
    expect(args.onClick).toHaveBeenCalled();
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
  },
};

export const IconStart: Story = {
  name: "Icon: Icon Start",
  args: {
    label: "Button with Icon",
    icon: <SampleIcon />,
    iconPosition: "start",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: args.label });
    await userEvent.click(button);
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent(args.label ?? "");

    expect(args.onClick).toHaveBeenCalled();
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const firstChild = button.firstChild as Element;
    expect(firstChild.tagName).toBe("SPAN");
    expect(firstChild.querySelector("svg")).toBe(svg);
  },
};

export const IconEnd: Story = {
  name: "Icon: Icon End",
  args: {
    label: "Button with Icon",
    icon: <SampleIcon />,
    iconPosition: "end",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: args.label });
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent(args.label ?? "");
    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalled();
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const lastChild = button.lastChild as Element;
    expect(lastChild.tagName).toBe("SPAN");
    expect(lastChild.querySelector("svg")).toBe(svg);
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width Button",
    fullWidth: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: args.label });
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent(args.label ?? "");
    expect(button).toHaveClass("ant-btn-block");
  },
};

export const Hover: Story = {
  name: "Pseudo:Hover",
  args: {
    label: "Hover Button",
  },
};
Hover.parameters = { pseudo: { hover: true } };

export const Focus: Story = {
  name: "Pseudo:Focus",
  args: {
    label: "Focus Button",
  },
};
Focus.parameters = { pseudo: { focus: true } };

export const Active: Story = {
  name: "Pseudo:Active",
  args: {
    label: "Active Button",
  },
};
Active.parameters = { pseudo: { active: true } };
