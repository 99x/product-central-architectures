import { within, userEvent, expect, fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from './input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Atoms/Input',
  parameters: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

const commonInputPlay = async (
  { args, canvasElement }: { args: InputProps; canvasElement: HTMLElement },
  additionalChecks?: (input: HTMLElement) => void
) => {
  const canvas = within(canvasElement);
  const input = await canvas.findByRole('textbox', { name: args.label });
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('id', args.id);
  additionalChecks && additionalChecks(input);
};

export const Default: Story = {
  args: {
    label: 'Default',
    id: 'default',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      await userEvent.type(input, 'Sample search query');
      expect(input).toHaveValue('Sample search query');
    });
  },
};

export const Small: Story = {
  name: 'Size: Small',
  args: {
    label: 'Small',
    size: 'small',
    id: 'small',
  },
  play: async (props) => {
    await commonInputPlay(props, (input) => {
      expect(input).toHaveClass('ant-input-sm');
    });
  },
};

export const Middle: Story = {
  name: 'Size: Middle',
  args: {
    label: 'Middle',
    size: 'middle',
    id: 'middle',
  },
  play: async (props) => {
    await commonInputPlay(props);
  },
};

export const Large: Story = {
  name: 'Size: Large',
  args: {
    label: 'Large',
    size: 'large',
    id: 'large',
  },
  play: async (props) => {
    await commonInputPlay(props, (input) => {
      expect(input).toHaveClass('ant-input-lg');
    });
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Input with Default Value',
    value: 'Default Value',
    id: 'defaultValue',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      expect(input).toHaveValue(props.args.value);
    });
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Input with Placeholder',
    placeholder: 'Default Placeholder',
    id: 'placeholder',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      expect(input).toHaveProperty('placeholder', props.args.placeholder);
    });
  },
};

export const Disabled: Story = {
  name: 'State:Disabled',
  args: {
    label: 'Disabled Input',
    disabled: true,
    id: 'disabled',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      expect(input).toHaveAttribute('disabled');
    });
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Input with Prefix',
    prefix: <span>$</span>,
    id: 'prefix',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      const prefixElement = await props.canvas.findByText('$');
      expect(prefixElement).toBeInTheDocument();
      expect(prefixElement).toHaveTextContent('$');

      const inputContainer = input.parentElement as Element;
      expect(inputContainer).toContainElement(prefixElement);
      const firstChild = inputContainer.firstElementChild;
      expect(firstChild).toHaveClass('ant-input-prefix');
    });
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Input with Suffix',
    suffix: <span>$</span>,
    id: 'suffix',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      const prefixElement = await props.canvas.findByText('$');
      expect(prefixElement).toBeInTheDocument();
      expect(prefixElement).toHaveTextContent('$');

      const inputContainer = input.parentElement as Element;
      expect(inputContainer).toContainElement(prefixElement);
      const lastChild = inputContainer.lastElementChild;
      expect(lastChild).toHaveClass('ant-input-suffix');
    });
  },
};

export const WithAllowClear: Story = {
  args: {
    label: 'Input with Allow Clear',
    allowClear: true,
    id: 'allowClear',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      await userEvent.type(input, 'Sample search query');
      expect(input).toHaveValue('Sample search query');

      const inputContainer = input.parentElement as Element;
      const lastChild = inputContainer.lastElementChild;
      expect(lastChild).toHaveClass('ant-input-suffix');
      lastChild?.firstElementChild &&
        (await userEvent.click(lastChild.firstElementChild));
      expect(input).toHaveValue('');
    });
  },
};

export const WithMaxLengthAndShowCount: Story = {
  args: {
    label: 'Input with Max Length',
    maxLength: 5,
    showCount: true,
    id: 'maxLength',
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      await userEvent.type(input, 'Sample text');
      expect(input).toHaveProperty('maxLength', 5);
      expect(input).toHaveValue('Sampl');
      expect(
        props.canvas.getByText(
          `${props.args.maxLength} / ${props.args.maxLength}`
        )
      ).toBeInTheDocument();
    });
  },
};

export const WithOnChange: Story = {
  args: {
    label: 'Input with onChange event',
    id: 'onChange',
    onChange: fn(),
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      await userEvent.type(input, 'Sample change query');
      expect(props.args.onChange).toHaveBeenCalled();
    });
  },
};

export const WithOnPressEnter: Story = {
  args: {
    label: 'Input with onPressEnter event',
    id: 'onPressEnter',
    onPressEnter: fn(),
  },
  play: async (props) => {
    await commonInputPlay(props, async (input) => {
      await userEvent.type(input, '{enter}');
      expect(props.args.onPressEnter).toHaveBeenCalled();
    });
  },
};
