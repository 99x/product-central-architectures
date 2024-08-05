import { within, userEvent, expect, fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { Toggle, ToggleProps } from './toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'Atoms/Toggle',
  parameters: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Toggle>;

const verifyToggleExistence = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const toggle = await canvas.findByRole('switch');
  expect(toggle).toBeInTheDocument();
  return toggle;
};

export const Default: Story = {
  args: {},
  play: async (props: { canvasElement: HTMLElement }) => {
    verifyToggleExistence(props.canvasElement);
  },
};

export const Checked: Story = {
  name: 'State:Checked',
  args: {
    defaultChecked: true,
  },
  play: async (props: { canvasElement: HTMLElement }) => {
    const toggle = await verifyToggleExistence(props.canvasElement);
    expect(toggle).toBeChecked();
  },
};

export const Disabled: Story = {
  name: 'State:Disabled',
  args: {
    disabled: true,
  },
  play: async (props: { canvasElement: HTMLElement }) => {
    const toggle = await verifyToggleExistence(props.canvasElement);
    expect(toggle).toBeDisabled();
  },
};

export const Loading: Story = {
  name: 'State:Loading',
  args: {
    loading: true,
    checked: true,
  },
  play: async (props: { canvasElement: HTMLElement }) => {
    const toggle = await verifyToggleExistence(props.canvasElement);
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveClass('ant-switch-loading');
  },
};

export const Small: Story = {
  name: 'Size: Small',
  args: {
    size: 'small',
  },
  play: async (props: { canvasElement: HTMLElement }) => {
    const toggle = await verifyToggleExistence(props.canvasElement);
    expect(toggle).toHaveClass('ant-switch-small');
  },
};

export const WithCheckedUnCheckedChildren: Story = {
  args: {
    defaultChecked: true,
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
  play: async (props: { canvasElement: HTMLElement }) => {
    const toggle = await verifyToggleExistence(props.canvasElement);
    expect(toggle).toHaveTextContent('On');
    await userEvent.click(toggle);
    expect(toggle).toHaveTextContent('Off');
  },
};

export const WithOnChange: Story = {
  args: {
    onChange: fn(),
  },
  play: async (props: { canvasElement: HTMLElement; args: ToggleProps }) => {
    const toggle = await verifyToggleExistence(props.canvasElement);
    await userEvent.click(toggle);
    expect(props.args.onChange).toHaveBeenCalled();
  },
};
