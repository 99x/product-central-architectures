import { within, expect, fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioButtonProps } from "./radio";

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "Atoms/Radio",
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Radio>;

const commonOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

interface VerifyOptions {
  options: { label: string; value: string }[];
  disabled?: boolean;
  defaultValue?: string;
  optionType?: string;
  buttonStyle?: string;
  size?: string;
  onChangeFn?: jest.Matchers<void, [string]>;
}

const verifyRadioProperties = async (
  canvasElement: HTMLElement,
  verifyOptions: VerifyOptions
) => {
  const canvas = within(canvasElement);
  const {
    options,
    disabled,
    defaultValue,
    optionType,
    buttonStyle,
    size,
    onChangeFn,
  } = verifyOptions;

  for (const option of options) {
    const radioOption = await canvas.findByLabelText(option.label);
    expect(radioOption).toBeInTheDocument();

    if (disabled) {
      expect(radioOption).toBeDisabled();
    }

    if (defaultValue && option.value === defaultValue) {
      expect(radioOption).toBeChecked();
    }

    if (optionType == "button") {
      expect(radioOption).toHaveClass("ant-radio-button-input");
    }

    if (buttonStyle) {
      const radioGroup = radioOption.closest(".ant-radio-group");
      expect(radioGroup).toHaveClass(`ant-radio-group-${buttonStyle}`);
    }

    if (size) {
      const radioGroup = radioOption.closest(".ant-radio-group");
      expect(radioGroup).toHaveClass(`ant-radio-group-${size}`);
    }
  }

  if (onChangeFn) {
    const firstOption = await canvas.findByLabelText(options[0].label);
    firstOption.click();
    expect(onChangeFn).toHaveBeenCalled();
  }
};

export const Default: Story = {
  args: {
    options: commonOptions,
  },
  play: async ({ canvasElement, args }) => {
    await verifyRadioProperties(canvasElement, { options: args.options });
  },
};

export const Disabled: Story = {
  name: "State:Disabled",
  args: {
    options: commonOptions,
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    await verifyRadioProperties(canvasElement, {
      options: args.options,
      disabled: true,
    });
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: commonOptions,
    defaultValue: "option1",
  },
  play: async ({ canvasElement, args }) => {
    await verifyRadioProperties(canvasElement, {
      options: args.options,
      defaultValue: args.defaultValue,
    });
  },
};

export const WithTypeButton: Story = {
  name: "Type: Button",
  args: {
    options: commonOptions,
    optionType: "button",
  },
  play: async ({ canvasElement, args }) => {
    await verifyRadioProperties(canvasElement, {
      options: args.options,
      optionType: args.optionType,
    });
  },
};

export const StyleSolid: Story = {
  name: "Style: Solid",
  args: {
    options: commonOptions,
    optionType: "button",
    buttonStyle: "solid",
    defaultValue: "option1",
  },
  play: async ({ canvasElement, args }) => {
    const buttonArgs = args as RadioButtonProps;
    await verifyRadioProperties(canvasElement, {
      options: buttonArgs.options,
      optionType: buttonArgs.optionType,
      buttonStyle: buttonArgs.buttonStyle,
      defaultValue: buttonArgs.defaultValue,
    });
  },
};

export const StyleOutline: Story = {
  name: "Style: Outline",
  args: {
    options: commonOptions,
    optionType: "button",
    buttonStyle: "outline",
    defaultValue: "option1",
  },
  play: async ({ canvasElement, args }) => {
    const buttonArgs = args as RadioButtonProps;
    await verifyRadioProperties(canvasElement, {
      options: buttonArgs.options,
      optionType: buttonArgs.optionType,
      buttonStyle: buttonArgs.buttonStyle,
      defaultValue: buttonArgs.defaultValue,
    });
  },
};

export const SizeSmall: Story = {
  name: "Size: Small",
  args: {
    options: commonOptions,
    optionType: "button",
    size: "small",
  },
  play: async ({ canvasElement, args }) => {
    const buttonArgs = args as RadioButtonProps;

    await verifyRadioProperties(canvasElement, {
      options: buttonArgs.options,
      optionType: buttonArgs.optionType,
      size: buttonArgs.size,
    });
  },
};

export const SizeMiddle: Story = {
  name: "Size: Middle",
  args: {
    options: commonOptions,
    optionType: "button",
    size: "middle",
  },
  play: async ({ canvasElement, args }) => {
    const buttonArgs = args as RadioButtonProps;

    await verifyRadioProperties(canvasElement, {
      options: buttonArgs.options,
      optionType: buttonArgs.optionType,
      size: buttonArgs.size,
    });
  },
};

export const SizeLarge: Story = {
  name: "Size: Large",
  args: {
    options: commonOptions,
    optionType: "button",
    size: "large",
  },
  play: async ({ canvasElement, args }) => {
    const buttonArgs = args as RadioButtonProps;

    await verifyRadioProperties(canvasElement, {
      options: buttonArgs.options,
      optionType: buttonArgs.optionType,
      size: buttonArgs.size,
    });
  },
};

export const WithOnChange: Story = {
  args: {
    options: commonOptions,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    await verifyRadioProperties(canvasElement, {
      options: args.options,
      onChangeFn: args.onChange as jest.Matchers<void, [string]>,
    });
  },
};
