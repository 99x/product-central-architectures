import { Meta, StoryObj } from "@storybook/react";
import { Form } from "./form";
import { Button, Input } from "../../atoms";
import { Checkbox } from "../../atoms";
import { FormItem } from "../../molecules";
import { fn, expect, userEvent } from "@storybook/test";
import { wait } from "../../../utils";

const meta: Meta<typeof Form> = {
  component: Form,
  title: "Organisms/Form",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Form>;

const LoginForm = () => (
  <>
    <FormItem name="name" label="Name" rules={[{ required: true }]}>
      <Input placeholder="Enter your name" />
    </FormItem>
    <FormItem
      name="email"
      label="Email"
      rules={[{ required: true, type: "email" }]}
    >
      <Input placeholder="Enter your email" />
    </FormItem>
    <FormItem name="remember">
      <Checkbox type="single" label="Remember me" />
    </FormItem>
    <FormItem>
      <Button label="Submit" htmlType="submit" />
    </FormItem>
  </>
);

const commonPlayFunction = async ({
  canvasElement,
  formLayoutClass,
}: {
  canvasElement: HTMLElement;
  formLayoutClass?: string;
}) => {
  const form = canvasElement.querySelector(".ant-form") as HTMLElement;
  const formItems = form.querySelectorAll(".ant-form-item");
  const labels = form.querySelectorAll("label");
  const inputs = form.querySelectorAll("input");
  const buttons = form.querySelectorAll("button");

  expect(form).toBeInTheDocument();
  expect(formItems).toHaveLength(4);
  expect(labels).toHaveLength(3);
  expect(inputs).toHaveLength(3);
  expect(buttons).toHaveLength(1);

  if (formLayoutClass) {
    expect(form).toHaveClass(formLayoutClass);
  }

  return { form, formItems, labels, inputs, buttons };
};
export const Default: Story = {
  args: {
    onFinish: fn(),
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    await commonPlayFunction({ canvasElement });
  },
};

export const WithInitialValues: Story = {
  args: {
    initialValues: {
      name: "John Doe",
      email: "",
    },
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector(".ant-form") as HTMLElement;
    const nameInput = form.querySelector("input#name") as HTMLInputElement;
    const emailInput = form.querySelector("input#email") as HTMLInputElement;

    expect(form).toBeInTheDocument();
    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("");
  },
};

export const Horizontal: Story = {
  name: "Layout: Horizontal",
  args: {
    layout: "horizontal",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    await commonPlayFunction({
      canvasElement,
      formLayoutClass: "ant-form-horizontal",
    });
  },
};

export const Vertical: Story = {
  name: "Layout: Vertical",
  args: {
    layout: "vertical",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    await commonPlayFunction({
      canvasElement,
      formLayoutClass: "ant-form-vertical",
    });
  },
};

export const Inline: Story = {
  name: "Layout: Inline",
  args: {
    layout: "inline",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    await commonPlayFunction({
      canvasElement,
      formLayoutClass: "ant-form-inline",
    });
  },
};

export const Small: Story = {
  name: "Size: Small",
  args: {
    size: "small",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    await commonPlayFunction({
      canvasElement,
      formLayoutClass: "ant-form-small",
    });
  },
};

export const Middle: Story = {
  name: "Size: Middle",
  args: {
    size: "middle",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    await commonPlayFunction({
      canvasElement,
      formLayoutClass: "ant-form-middle",
    });
  },
};

export const Large: Story = {
  name: "Size: Large",
  args: {
    size: "large",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    await commonPlayFunction({
      canvasElement,
      formLayoutClass: "ant-form-large",
    });
  },
};

export const Filled: Story = {
  name: "Variant: Filled",
  args: {
    variant: "filled",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    const { inputs } = await commonPlayFunction({ canvasElement });
    expect(inputs[0]).toHaveClass("ant-input-filled");
    expect(inputs[1]).toHaveClass("ant-input-filled");
  },
};

export const Borderless: Story = {
  name: "Variant: Borderless",
  args: {
    variant: "borderless",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    const { inputs } = await commonPlayFunction({ canvasElement });
    expect(inputs[0]).toHaveClass("ant-input-borderless");
    expect(inputs[1]).toHaveClass("ant-input-borderless");
  },
};

export const Outlined: Story = {
  name: "Variant: Outlined",
  args: {
    variant: "outlined",
    children: <LoginForm />,
  },
  play: async ({ canvasElement }) => {
    const { inputs } = await commonPlayFunction({ canvasElement });
    expect(inputs[0]).toHaveClass("ant-input-outlined");
    expect(inputs[1]).toHaveClass("ant-input-outlined");
  },
};

export const CustomizedSpacing: Story = {
  args: {
    labelCol: { span: 4 },
    wrapperCol: { span: 16, offset: 4 },
    children: <LoginForm />,
    layout: "horizontal",
  },
  play: async ({ canvasElement }) => {
    const { form, formItems } = await commonPlayFunction({ canvasElement });
    const labelCol = form.querySelector(".ant-col-4") as HTMLElement;
    const wrapperCol = form.querySelector(".ant-col-16") as HTMLElement;

    expect(form).toBeInTheDocument();
    expect(formItems).toHaveLength(4);
    expect(labelCol).toHaveClass("ant-col-4");
    expect(wrapperCol).toHaveClass("ant-col-16 ant-col-offset-4");
  },
};

export const LabelWrap: Story = {
  args: {
    layout: "horizontal",
    labelCol: { flex: "110px" },
    labelWrap: true,
    wrapperCol: { flex: 1 },
    labelAlign: "left",
    children: (
      <>
        <FormItem
          name="name"
          label="Loooooooong Label"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter your name" />
        </FormItem>
        <FormItem
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email is Required" }]}
        >
          <Input placeholder="Enter your email" />
        </FormItem>
        <FormItem name="remember">
          <Checkbox type="single" label="Remember me" />
        </FormItem>
        <FormItem>
          <Button label="Submit" htmlType="submit" />
        </FormItem>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const { form, formItems } = await commonPlayFunction({ canvasElement });
    const labelCol = form.querySelector(".ant-form-item-label") as HTMLElement;
    const wrapperCol = form.querySelector(
      ".ant-form-item-control"
    ) as HTMLElement;

    expect(form).toBeInTheDocument();
    expect(formItems).toHaveLength(4);
    expect(labelCol).toHaveStyle("flex: 0 0 110px");
    expect(labelCol).toHaveClass("ant-form-item-label-wrap");
    expect(wrapperCol).toHaveStyle("flex: 1 1 auto");
  },
};

export const WithFormCallbacks: Story = {
  args: {
    children: <LoginForm />,
    onFinish: fn(),
    onFinishFailed: fn(),
    onFieldsChange: fn(),
    onValuesChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const { inputs, buttons } = await commonPlayFunction({ canvasElement });
    const submitButton = buttons[0] as HTMLButtonElement;
    const nameInput = inputs[0] as HTMLInputElement;
    const emailInput = inputs[1] as HTMLInputElement;
    submitButton.click();
    await wait();
    expect(args.onFinishFailed).toBeCalled();
    await userEvent.type(nameInput, "John Doe");
    expect(args.onValuesChange).toBeCalled();
    expect(args.onFieldsChange).toBeCalled();
    await userEvent.type(emailInput, "test@email.com");
    submitButton.click();
    await wait();
    expect(args.onFinish).toBeCalled();
  },
};

export const WithValidateMessages: Story = {
  args: {
    children: <LoginForm />,
    validateMessages: {
      required: "This field is required",
      types: {
        email: "Invalid email",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const { form, inputs } = await commonPlayFunction({
      canvasElement,
    });
    const nameInput = inputs[0] as HTMLInputElement;
    const emailInput = inputs[1] as HTMLInputElement;
    const submitButton = form.querySelector("button") as HTMLButtonElement;
    submitButton.click();

    await wait();
    let errorMessages = form.querySelectorAll(".ant-form-item-explain");
    expect(errorMessages).toHaveLength(2);
    expect(errorMessages[0]).toHaveTextContent("This field is required");
    expect(errorMessages[1]).toHaveTextContent("This field is required");

    await userEvent.type(nameInput, "John Doe");
    submitButton.click();

    await wait();

    errorMessages = form.querySelectorAll(".ant-form-item-explain");
    expect(errorMessages).toHaveLength(1);
    expect(errorMessages[0]).toHaveTextContent("This field is required");

    await userEvent.type(emailInput, "test");
    submitButton.click();

    await wait();

    errorMessages = form.querySelectorAll(".ant-form-item-explain");
    expect(errorMessages).toHaveLength(1);
    expect(errorMessages[0]).toHaveTextContent("Invalid email");
  },
};

export const Disabled: Story = {
  args: {
    children: <LoginForm />,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector(".ant-form") as HTMLElement;
    const inputs = form.querySelectorAll("input");
    expect(form).toBeInTheDocument();
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  },
};
