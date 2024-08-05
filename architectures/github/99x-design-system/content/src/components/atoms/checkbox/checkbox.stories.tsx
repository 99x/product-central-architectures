import { within, expect, fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Checkbox, SingleProps } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Atoms/Checkbox",
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findCheckbox = async (canvas: any, name: string) => {
  const checkbox = await canvas.findByRole("checkbox", { name });
  expect(checkbox).toBeInTheDocument();
  return checkbox;
};

export const Default: Story = {
  args: {
    label: "Default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await findCheckbox(canvas, "Default");
    expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = {
  name: "State:Checked",
  args: {
    label: "Checked",
    checked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await findCheckbox(canvas, "Checked");
    expect(checkbox).toBeChecked();
  },
};

export const Disabled: Story = {
  name: "State:Disabled",
  args: {
    label: "Disabled",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await findCheckbox(canvas, "Disabled");
    expect(checkbox).toBeDisabled();
  },
};

export const WithOnChange: Story = {
  args: {
    type: "single",
    label: "With onChange",
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const singleProps = args as SingleProps;
    const checkbox = await canvas.findByLabelText(singleProps.label ?? "");
    expect(checkbox).toBeInTheDocument();
    checkbox.click();
    expect(singleProps.onChange).toHaveBeenCalled();
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyGroupOptions = async (canvas: any, labels: string[]) => {
  for (const label of labels) {
    const option = await canvas.findByLabelText(label);
    expect(option).toBeInTheDocument();
  }
};

export const Group: Story = {
  args: {
    type: "group",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await verifyGroupOptions(canvas, ["Option 1", "Option 2", "Option 3"]);
  },
};

export const GroupWithDefaultValue: Story = {
  args: {
    type: "group",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    defaultValue: ["option1"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [option1, option2, option3] = await Promise.all([
      canvas.findByLabelText("Option 1"),
      canvas.findByLabelText("Option 2"),
      canvas.findByLabelText("Option 3"),
    ]);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();
    expect(option3).not.toBeChecked();
  },
};

export const GroupDisabled: Story = {
  args: {
    type: "group",
    options: [
      { label: "Option 1", value: "option1", disabled: true },
      { label: "Option 2", value: "option2", disabled: true },
      { label: "Option 3", value: "option3" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [option1, option2, option3] = await Promise.all([
      canvas.findByLabelText("Option 1"),
      canvas.findByLabelText("Option 2"),
      canvas.findByLabelText("Option 3"),
    ]);
    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
    expect(option3).not.toBeDisabled();
  },
};
