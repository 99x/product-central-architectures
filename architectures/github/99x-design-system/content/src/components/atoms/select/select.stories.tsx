import { within, userEvent, expect, fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Atoms/Select",
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const verifySelect = async (
  canvasElement: HTMLElement,
  options: { value: string; label: string }[],
  {
    disabled = false,
    defaultValue,
    onChangeFn,
    size,
  }: {
    disabled?: boolean;
    defaultValue?: string;
    onChangeFn?: jest.Matchers<void, [string]>;
    size?: string;
  }
) => {
  const canvas = within(canvasElement);
  const select = canvas.getByRole("combobox");

  if (disabled) {
    expect(select).toBeDisabled();
    return;
  }

  if (defaultValue !== undefined) {
    const selectedItem = canvasElement.querySelector(
      ".ant-select-selection-item"
    );
    expect(selectedItem).toHaveTextContent(
      options[parseInt(defaultValue) - 1].label
    );
  }

  if (onChangeFn) {
    await userEvent.selectOptions(select, "1");
    expect(onChangeFn).toHaveBeenCalled();
  }

  if (size) {
    const selectContainer = select.closest(".ant-select");
    expect(selectContainer).toHaveClass(`ant-select-${size}`);
  }
  if (options) {
    userEvent.click(select);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);

    dropdownItems.forEach((dropdownItem, index) => {
      expect(dropdownItem.textContent?.trim()).toEqual(options[index].label);
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectOptionByIndex = async (_: any, index: number) => {
  const dropdownItems = document.querySelectorAll(
    ".ant-select-item-option-content"
  );
  if (dropdownItems[index]) {
    await userEvent.click(dropdownItems[index]);
  }
};

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const typeText = async (element: HTMLElement, text: string) => {
  await userEvent.type(element, text, { delay: 50 });
  await wait(1000);
};

const clickElement = async (element: HTMLElement) => {
  await userEvent.click(element);
  await wait(1000);
};

export const Default: Story = {
  args: {
    id: "default",
    label: "Default",
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, {});
  },
};

export const WithPlaceholder: Story = {
  args: {
    id: "placeholder",
    label: "With Placeholder",
    placeholder: "Select an option",
    options: options,
  },
  play: async ({ canvasElement, args }) => {
    const select = canvasElement.querySelector(
      ".ant-select-selection-placeholder"
    );
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent(args.placeholder!);
  },
};

export const WithDefaultValue: Story = {
  args: {
    id: "default-value",
    label: "With Default Value",
    defaultValue: "2",
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, { defaultValue: "2" });
  },
};

export const WithAllowClear: Story = {
  args: {
    id: "allow-clear",
    label: "With Allow Clear",
    allowClear: true,
    defaultValue: "2",
    options: options,
    onClear: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const clearButton = canvasElement.querySelector(
      ".ant-select-clear"
    ) as HTMLButtonElement;
    await clickElement(clearButton);
    expect(args.onClear).toHaveBeenCalled();
  },
};

export const WithCustomListHeight: Story = {
  args: {
    id: "custom-list-height",
    label: "With Custom List Height",
    listHeight: 50,
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    userEvent.click(select);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    const dropdown = document.querySelector(".rc-virtual-list-holder");
    expect(dropdown).toHaveStyle("max-height: 50px");
  },
};

export const Disabled: Story = {
  name: "State: Disabled",
  args: {
    id: "disabled",
    label: "Disabled",
    disabled: true,
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, { disabled: true });
  },
};

export const Loading: Story = {
  name: "State: Loading",
  args: {
    id: "loading",
    label: "Loading",
    loading: true,
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, {});
    const loader = canvasElement.querySelector(
      ".anticon.anticon-loading.anticon-spin"
    );
    expect(loader).toBeInTheDocument();
  },
};

export const ControlledOpen: Story = {
  args: {
    id: "controlled-open",
    label: "Controlled Open",
    open: true,
    options: options,
  },
  play: async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    const dropdown = document.querySelector(".ant-select-dropdown");
    expect(dropdown).toBeInTheDocument();
  },
};

export const WithSearch: Story = {
  args: {
    id: "search",
    label: "With Search",
    showSearch: true,
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    userEvent.type(select, "2");
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(1);
    expect(dropdownItems[0].textContent?.trim()).toEqual("Option 2");
  },
};

export const Small: Story = {
  name: "Size: Small",
  args: {
    id: "small",
    label: "Small",
    size: "small",
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, { size: "sm" });
  },
};

export const Large: Story = {
  name: "Size: Large",
  args: {
    id: "large",
    label: "Large",
    size: "large",
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, { size: "lg" });
  },
};

export const Warning: Story = {
  name: "Status: Warning",
  args: {
    id: "warning",
    label: "Warning",
    status: "warning",
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, {});
    const select = canvasElement.querySelector(".ant-select-status-warning");
    expect(select).toBeInTheDocument();
  },
};

export const Error: Story = {
  name: "Status: Error",
  args: {
    id: "error",
    label: "Error",
    status: "error",
    options: options,
  },
  play: async ({ canvasElement }) => {
    await verifySelect(canvasElement, options, {});
    const select = canvasElement.querySelector(".ant-select-status-error");
    expect(select).toBeInTheDocument();
  },
};

export const TopLeft: Story = {
  name: "Placement: Top Left",
  parameters: {
    layout: "centered",
  },
  args: {
    id: "top-left",
    label: "Top Left",
    placement: "topLeft",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    userEvent.click(select);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const dropdown = document.querySelector(
      ".ant-select-dropdown-placement-topLeft"
    );
    expect(dropdown).toBeInTheDocument();
  },
};

export const TopRight: Story = {
  name: "Placement: Top Right",
  parameters: {
    layout: "centered",
  },
  args: {
    id: "top-right",
    label: "Top Right",
    placement: "topRight",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    userEvent.click(select);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const dropdown = document.querySelector(
      ".ant-select-dropdown-placement-topRight"
    );
    expect(dropdown).toBeInTheDocument();
  },
};

export const BottomLeft: Story = {
  name: "Placement: Bottom Left",
  parameters: {
    layout: "centered",
  },
  args: {
    id: "bottom-left",
    label: "Bottom Left",
    placement: "bottomLeft",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    userEvent.click(select);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const dropdown = document.querySelector(
      ".ant-select-dropdown-placement-bottomLeft"
    );
    expect(dropdown).toBeInTheDocument();
  },
};

export const BottomRight: Story = {
  name: "Placement: Bottom Right",
  parameters: {
    layout: "centered",
  },
  args: {
    id: "bottom-right",
    label: "Bottom Right",
    placement: "bottomRight",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    userEvent.click(select);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const dropdown = document.querySelector(
      ".ant-select-dropdown-placement-bottomRight"
    );
    expect(dropdown).toBeInTheDocument();
  },
};

export const Outlined: Story = {
  name: "Type: Outlined",
  args: {
    id: "outlined",
    label: "Outlined",
    type: "outlined",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const element = canvasElement.querySelector(".ant-select-outlined");
    expect(element).toBeInTheDocument();
  },
};

export const Filled: Story = {
  name: "Type: Filled",
  args: {
    id: "filled",
    label: "Filled",
    type: "filled",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const element = canvasElement.querySelector(".ant-select-filled");
    expect(element).toBeInTheDocument();
  },
};

export const Borderless: Story = {
  name: "Type: Borderless",
  args: {
    id: "borderless",
    label: "Borderless",
    type: "borderless",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const element = canvasElement.querySelector(".ant-select-borderless");
    expect(element).toBeInTheDocument();
  },
};

export const WithOptionRender: Story = {
  args: {
    id: "option-render",
    label: "With Option Render",
    options: options,
    optionRender: (option) => <div>{option.label} ⬆️</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);

    dropdownItems.forEach((dropdownItem, index) => {
      expect(dropdownItem.textContent?.trim()).toEqual(
        `${options[index].label} ⬆️`
      );
    });
  },
};

export const Multiple: Story = {
  name: "Mode: Multiple",
  args: {
    id: "multiple",
    label: "Multiple",
    mode: "multiple",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);

    dropdownItems.forEach((dropdownItem, index) => {
      expect(dropdownItem.textContent?.trim()).toEqual(options[index].label);
    });

    await selectOptionByIndex(canvas, 0);
    await selectOptionByIndex(canvas, 1);

    const selectedItems = canvasElement.querySelectorAll(
      ".ant-select-selection-item"
    );
    expect(selectedItems.length).toBe(2);
    expect(selectedItems[0]).toHaveTextContent("Option 1");
    expect(selectedItems[1]).toHaveTextContent("Option 2");
  },
};

export const Tags: Story = {
  name: "Mode: Tags",
  args: {
    id: "tags",
    label: "Tags",
    mode: "tags",
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);

    dropdownItems.forEach((dropdownItem, index) => {
      expect(dropdownItem.textContent?.trim()).toEqual(options[index].label);
    });

    await selectOptionByIndex(canvas, 0);
    await selectOptionByIndex(canvas, 1);

    await typeText(select, "abc");
    const newDropdownItem = document.querySelector(
      ".ant-select-item-option-content"
    );
    await clickElement(newDropdownItem as HTMLElement);

    const selectedItems = canvasElement.querySelectorAll(
      ".ant-select-selection-item"
    );
    expect(selectedItems.length).toBe(3);
    expect(selectedItems[0]).toHaveTextContent("Option 1");
    expect(selectedItems[1]).toHaveTextContent("Option 2");
    expect(selectedItems[2]).toHaveTextContent("abc");
  },
};

export const WithMaxCount: Story = {
  args: {
    id: "max-count",
    label: "With Max Count 2",
    mode: "multiple",
    maxCount: 2,
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);

    dropdownItems.forEach((dropdownItem, index) => {
      expect(dropdownItem.textContent?.trim()).toEqual(options[index].label);
    });

    await selectOptionByIndex(canvas, 0);
    await selectOptionByIndex(canvas, 1);

    const thirdItem = (dropdownItems[2] as HTMLElement).closest(
      ".ant-select-item-option"
    );
    expect(thirdItem).toHaveClass("ant-select-item-option-disabled");

    const selectedItems = canvasElement.querySelectorAll(
      ".ant-select-selection-item"
    );
    expect(selectedItems.length).toBe(2);
    expect(selectedItems[0]).toHaveTextContent("Option 1");
    expect(selectedItems[1]).toHaveTextContent("Option 2");
  },
};

export const WithMaxTagCount: Story = {
  args: {
    id: "max-tag-count",
    label: "With Max Tag Count 2",
    mode: "tags",
    maxTagCount: 2,
    tokenSeparators: [","],
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await typeText(select, "abc,");
    await typeText(select, "efg,");
    await typeText(select, "hij,");

    const selectedItems = canvasElement.querySelectorAll(
      ".ant-select-selection-item"
    );
    expect(selectedItems.length).toBe(3);
    expect(selectedItems[0]).toHaveTextContent("abc");
    expect(selectedItems[1]).toHaveTextContent("efg");
    expect(selectedItems[2]).toHaveTextContent("+ 1 ...");
  },
};

export const WithMaxTagTextLength: Story = {
  args: {
    id: "max-tag-text-length",
    label: "With Max Tag Text Length 5",
    mode: "multiple",
    maxTagTextLength: 5,
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItem = document.querySelector(
      ".ant-select-item-option-content"
    ) as HTMLElement;
    await clickElement(dropdownItem);

    const selectedItems = canvasElement.querySelectorAll(
      ".ant-select-selection-item"
    );
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toHaveTextContent("Optio...");
  },
};

export const WithTokenSeparators: Story = {
  args: {
    id: "token-separators",
    label: "With Token Separators",
    mode: "tags",
    tokenSeparators: [","],
    options: options,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await typeText(select, "abc,efg,");

    const selectedItems = canvasElement.querySelectorAll(
      ".ant-select-selection-item"
    );
    expect(selectedItems.length).toBe(2);
    expect(selectedItems[0]).toHaveTextContent("abc");
    expect(selectedItems[1]).toHaveTextContent("efg");
  },
};

export const WithCustomNotFoundContent: Story = {
  args: {
    id: "not-found-content",
    label: "With Not Found Content",
    notFoundContent: "No options found",
    options: options,
    mode: "multiple",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);
    await typeText(select, "abc");

    const notFoundContent = document.querySelector(".ant-select-item-empty");
    expect(notFoundContent).toBeInTheDocument();
    expect(notFoundContent).toHaveTextContent("No options found");
  },
};

export const WithOnChange: Story = {
  args: {
    id: "on-change",
    label: "With On Change",
    options: options,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);

    await selectOptionByIndex(canvas, 0);
    expect(args.onChange).toHaveBeenCalled();
  },
};

export const WithOnSelect: Story = {
  args: {
    id: "on-select",
    label: "With On Select",
    options: options,
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);

    await selectOptionByIndex(canvas, 0);
    expect(args.onSelect).toHaveBeenCalled();
  },
};

export const WithOnDeselect: Story = {
  args: {
    id: "on-deselect",
    label: "With On Deselect",
    mode: "multiple",
    options: options,
    defaultValue: ["1"],
    onDeselect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await clickElement(select);

    const dropdownItems = document.querySelectorAll(
      ".ant-select-item-option-content"
    );
    expect(dropdownItems.length).toBe(options.length);
    await selectOptionByIndex(canvas, 0);

    const closeIcon = canvasElement.querySelector(
      ".ant-select-selection-item-remove"
    );
    await clickElement(closeIcon as HTMLElement);
    expect(args.onDeselect).toHaveBeenCalled();
  },
};

export const WithOnSearch: Story = {
  args: {
    id: "on-search",
    label: "With On Search",
    showSearch: true,
    options: options,
    onSearch: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");

    await typeText(select, "Option");
    expect(args.onSearch).toHaveBeenCalled();
  },
};
