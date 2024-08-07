import { within, userEvent, expect, fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { SearchInput, SearchInputProps } from "./searchInput";

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: "Atoms/SearchInput",
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

// Test utility function
const testSearchInput = async (
  canvasElement: HTMLElement,
  args: SearchInputProps
) => {
  const canvas = within(canvasElement);
  const input = await canvas.findByRole("textbox", { name: args.label });
  await userEvent.type(input, "Sample search query");
  expect(input).toHaveValue("Sample search query");
  expect(args.onChange).toHaveBeenCalled();
};

export const Default: Story = {
  args: {
    label: "Default Search Input",
  },
  play: async ({ args, canvasElement }) => {
    await testSearchInput(canvasElement, args);
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Search Input",
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole("textbox", { name: args.label });
    expect(input).toBeDisabled();
  },
};

export const WithPrefix: Story = {
  args: {
    label: "Search Input with Prefix",
    prefix: <span>Prefix</span>,
  },
  play: async ({ args, canvasElement }) => {
    await testSearchInput(canvasElement, args);
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Search Input with Suffix",
    suffix: <span>Suffix</span>,
  },
  play: async ({ args, canvasElement }) => {
    await testSearchInput(canvasElement, args);
  },
};

export const Small: Story = {
  args: {
    label: "Small Search Input",
    size: "small",
  },
  play: async ({ args, canvasElement }) => {
    await testSearchInput(canvasElement, args);
  },
};

export const Large: Story = {
  args: {
    label: "Large Search Input",
    size: "large",
  },
  play: async ({ args, canvasElement }) => {
    await testSearchInput(canvasElement, args);
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Search Input with Default Value",
    defaultValue: "Initial search query",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole("textbox", { name: args.label });
    expect(input).toHaveValue(args.defaultValue);
  },
};

export const WithLoading: Story = {
  args: {
    label: "Search Input with Loading",
    loading: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole("textbox", { name: args.label });
    expect(input).toHaveClass("ant-input-search-loading");
  },
};

export const WithEnterButton: Story = {
  args: {
    label: "Search Input with Enter Button",
    enterButton: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: "Search" });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(args.onSearch).toHaveBeenCalled();
  },
};

export const WithOnPressEnter: Story = {
  args: {
    label: "Search Input with onPressEnter event",
    onPressEnter: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole("textbox", { name: args.label });
    await userEvent.type(input, "{enter}");
    expect(args.onPressEnter).toHaveBeenCalled();
  },
};
