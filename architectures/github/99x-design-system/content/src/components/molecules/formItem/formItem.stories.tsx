import { Meta, StoryObj } from "@storybook/react";
import { FormItem } from "./formItem";
import { Input, Checkbox } from "../../atoms";
import { Form } from "../../organisms";
import { userEvent, expect } from "@storybook/test";
import { wait } from "../../../utils";

const meta: Meta<typeof FormItem> = {
  component: FormItem,
  title: "Molecules/FormItem",
  parameters: {
    // layout: 'centered',
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FormItem>;

export const Default: Story = {
  args: {
    label: "Username",
    name: "username",
    children: <Input />,
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const label = formItem.querySelector("label") as HTMLElement;
    const input = formItem.querySelector("input") as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(label).toHaveTextContent("Username");
    expect(input).toBeInTheDocument();
  },
};

export const WithRequired: Story = {
  args: {
    label: "Username",
    name: "username",
    required: true,
    children: <Input />,
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const label = formItem.querySelector("label") as HTMLElement;
    const input = formItem.querySelector("input") as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(label).toHaveTextContent("Username");
    expect(input).toBeInTheDocument();

    const required = formItem.querySelector(
      ".ant-form-item-required"
    ) as HTMLElement;
    expect(required).toBeInTheDocument();
  },
};

export const Vertical: Story = {
  name: "Layout: Vertical",
  args: {
    label: "Username",
    name: "username",
    children: <Input />,
    layout: "vertical",
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const label = formItem.querySelector("label") as HTMLElement;
    const input = formItem.querySelector("input") as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(label).toHaveTextContent("Username");
    expect(input).toBeInTheDocument();

    expect(formItem).toHaveClass("ant-form-item-vertical");
  },
};

export const WithColon: Story = {
  args: {
    label: "Username",
    name: "username",
    colon: true,
    children: <Input />,
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const label = formItem.querySelector("label") as HTMLElement;
    const input = formItem.querySelector("input") as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(label).toHaveTextContent("Username:");
    expect(input).toBeInTheDocument();
  },
};

export const WithExtra: Story = {
  args: {
    label: "Username",
    name: "username",
    extra: "Extra information",
    children: <Input />,
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const extra = formItem.querySelector(".ant-form-item-extra") as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(extra).toHaveTextContent("Extra information");
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithInitialValue: Story = (args: any) => (
  <Form>
    <FormItem {...args}>
      <Input />
    </FormItem>
  </Form>
);

WithInitialValue.args = {
  label: "Username",
  name: "username",
  initialValue: "admin",
};

export const WithLabelCol: Story = {
  args: {
    label: "Username",
    name: "username",
    labelCol: { span: 12, offset: 2 },
    children: <Input />,
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const label = formItem.querySelector("label") as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(label).toHaveTextContent("Username");
    const labelItem = formItem.querySelector(
      ".ant-form-item-label"
    ) as HTMLElement;

    expect(labelItem).toHaveClass("ant-col-offset-2 ant-col-12");
  },
};

export const WithWrapperCol: Story = {
  args: {
    label: "Username",
    name: "username",
    wrapperCol: { span: 16, offset: 2 },
    children: <Input />,
    layout: "vertical",
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const input = formItem.querySelector("input") as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    const wrapperItem = formItem.querySelector(
      ".ant-form-item-control"
    ) as HTMLElement;

    expect(wrapperItem).toHaveClass("ant-col-offset-2 ant-col-16");
  },
};

export const WithValuePropName: Story = {
  args: {
    label: "Select your favourite sport",
    name: "sport",
    valuePropName: "checked",
    children: (
      <Checkbox
        type="group"
        defaultValue={["football", "tennis"]}
        options={[
          { label: "Football", value: "football" },
          { label: "Basketball", value: "basketball" },
          { label: "Tennis", value: "tennis" },
          { label: "Cricket", value: "cricket" },
        ]}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const formItem = canvasElement.querySelector(
      ".ant-form-item"
    ) as HTMLElement;
    const checkbox = formItem.querySelector(
      ".ant-checkbox-group"
    ) as HTMLElement;

    expect(formItem).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithValidateFirst: Story = (args: any) => (
  <Form>
    <FormItem {...args}>
      <Input />
    </FormItem>
  </Form>
);

WithValidateFirst.args = {
  label: "Username With Only 5 characters",
  name: "username",
  rules: [{ required: true, max: 5 }],
  validateFirst: true,
};
WithValidateFirst.play = async ({ canvasElement }) => {
  const formItem = canvasElement.querySelector(".ant-form-item") as HTMLElement;
  const input = formItem.querySelector("input") as HTMLElement;
  userEvent.type(input, "admins");
  await new Promise((r) => setTimeout(r, 1000));
  const error = formItem.querySelector(".ant-form-item-explain") as HTMLElement;

  expect(formItem).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(error).toHaveTextContent(
    "'username' cannot be longer than 5 characters"
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithValidateDebounce: Story = (args: any) => (
  <Form>
    <FormItem {...args}>
      <Input />
    </FormItem>
  </Form>
);

WithValidateDebounce.args = {
  label: "Username With Only 5 characters",
  name: "username",
  rules: [{ required: true, max: 5 }],
  validateDebounce: 500,
};

WithValidateDebounce.play = async ({ canvasElement }) => {
  const formItem = canvasElement.querySelector(".ant-form-item") as HTMLElement;
  const input = formItem.querySelector("input") as HTMLElement;
  userEvent.type(input, "admins");
  await wait(1000);
  const error = formItem.querySelector(".ant-form-item-explain") as HTMLElement;

  expect(formItem).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(error).toHaveTextContent(
    "'username' cannot be longer than 5 characters"
  );
};
