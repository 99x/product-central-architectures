import { within, userEvent, fn, expect } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Atoms/Dropdown",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const defaultItems = [
  { key: "1", label: "Option 1" },
  { key: "2", label: "Option 2" },
];

const testDropdownInteraction = async (
  canvasElement: HTMLElement,
  label: string,
  triggerType = "hover",
  items: { key: string; label: string }[] = defaultItems
) => {
  const canvas = within(canvasElement);
  const trigger = await canvas.findByText(label);
  if (triggerType === "click") {
    await userEvent.click(trigger);
  } else {
    await userEvent.hover(trigger);
  }

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const dropdownItems = document.querySelectorAll(
    ".ant-dropdown-menu-title-content"
  );
  expect(dropdownItems.length).toBe(items.length);

  dropdownItems.forEach((dropdownItem, index) => {
    expect(dropdownItem.textContent?.trim()).toEqual(items[index].label);
  });
};
export const Default: Story = {
  args: {
    triggerText: "Hover Me",
    items: defaultItems,
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Hover Me");
  },
};

export const Click: Story = {
  name: "Trigger: Click",
  args: {
    triggerText: "Click Me",
    items: defaultItems,
    trigger: ["click"],
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Click Me", "click");
  },
};

export const Text: Story = {
  name: "Type: Text",
  args: {
    triggerText: "Text Trigger",
    items: defaultItems.map((item) => ({
      ...item,
      href: `/option${item.key}`,
    })),
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Text Trigger");
  },
};

export const Button: Story = {
  name: "Type: Button",
  args: {
    triggerText: "Button Trigger",
    items: defaultItems.map((item) => ({
      ...item,
      href: `/option${item.key}`,
    })),
    trigger: ["click"],
    triggerType: "button",
    buttonProps: {
      variant: "secondary",
    },
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Button Trigger", "click");
  },
};

export const Custom: Story = {
  name: "Type: Custom",
  args: {
    children: <button type="button">😊</button>,
    triggerType: "custom",
    items: defaultItems.map((item) => ({
      ...item,
      href: `/option${item.key}`,
    })),
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "😊");
  },
};

export const Disabled: Story = {
  name: "State: Disabled",
  args: {
    triggerText: "Disabled",
    items: defaultItems,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByText("Disabled");
    expect(trigger).toHaveAttribute("disabled");
  },
};

export const Selectable: Story = {
  name: "Selectable: true",
  args: {
    triggerText: "Selectable",
    items: defaultItems,
    selectable: true,
    defaultSelectedKeys: ["1"],
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Selectable", "click");
  },
};

export const CascadingDropdown: Story = {
  name: "Cascading: Dropdown",
  args: {
    triggerText: "Cascading Dropdown",
    items: [
      {
        key: "1",
        label: "Option 1",
        children: [
          { key: "1.1", label: "Option 1.1" },
          { key: "1.2", label: "Option 1.2" },
        ],
      },
      { key: "2", label: "Option 2" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByText(args.triggerText);

    await userEvent.click(trigger);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    const dropdownItem = document.querySelector(
      ".ant-dropdown-menu-title-content"
    );

    if (dropdownItem) {
      await userEvent.click(dropdownItem);
    }

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const dropdownItems = document.querySelectorAll(
      ".ant-dropdown-menu-title-content"
    );
    expect(dropdownItems.length).toBe(4);
    const dropDownOptions = [
      "Option 1",
      "Option 2",
      "Option 1.1",
      "Option 1.2",
    ];
    dropdownItems.forEach((dropdownItem, index) => {
      expect(dropdownItem.textContent?.trim()).toEqual(dropDownOptions[index]);
    });
  },
};

export const BottomLeft: Story = {
  name: "Placement: bottomLeft",
  args: {
    triggerText: "Bottom Left",
    items: defaultItems,
    placement: "bottomLeft",
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Bottom Left");
    const dropdownMenu = document.querySelector(
      ".ant-dropdown-placement-bottomLeft"
    );
    expect(dropdownMenu).toBeInTheDocument();
  },
};

export const BottomRight: Story = {
  name: "Placement: bottomRight",
  args: {
    triggerText: "Bottom Right",
    items: defaultItems,
    placement: "bottomRight",
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Bottom Right");
    const dropdownMenu = document.querySelector(
      ".ant-dropdown-placement-bottomRight"
    );
    expect(dropdownMenu).toBeInTheDocument();
  },
};

export const BottomCenter: Story = {
  name: "Placement: bottomCenter",
  args: {
    triggerText: "Bottom Center",
    items: defaultItems,
    placement: "bottomCenter",
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Bottom Center");
    const dropdownMenu = document.querySelector(
      ".ant-dropdown-placement-bottom"
    );
    expect(dropdownMenu).toBeInTheDocument();
  },
};

export const TopLeft: Story = {
  name: "Placement: topLeft",
  args: {
    triggerText: "Top Left",
    items: defaultItems,
    placement: "topLeft",
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Top Left");
    const dropdownMenu = document.querySelector(
      ".ant-dropdown-placement-topLeft"
    );
    expect(dropdownMenu).toBeInTheDocument();
  },
};

export const TopRight: Story = {
  name: "Placement: topRight",
  args: {
    triggerText: "Top Right",
    items: defaultItems,
    placement: "topRight",
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Top Right");
    const dropdownMenu = document.querySelector(
      ".ant-dropdown-placement-topRight"
    );
    expect(dropdownMenu).toBeInTheDocument();
  },
};

export const TopCenter: Story = {
  name: "Placement: topCenter",
  args: {
    triggerText: "Top Center",
    items: defaultItems,
    placement: "topCenter",
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "Top Center");
    const dropdownMenu = document.querySelector(".ant-dropdown-placement-top");
    expect(dropdownMenu).toBeInTheDocument();
  },
};

export const WithAutoFocus: Story = {
  args: {
    triggerText: "With autoFocus",
    items: defaultItems,
    autoFocus: true,
  },
  play: async ({ canvasElement }) => {
    await testDropdownInteraction(canvasElement, "With autoFocus");
  },
};

export const WithOnOpenChange: Story = {
  args: {
    triggerText: "With onOpenChange",
    items: defaultItems.map((item) => ({
      ...item,
      href: `/option${item.key}`,
    })),
    onOpenChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByText(args.triggerText);
    await userEvent.click(trigger);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    expect(args.onOpenChange).toHaveBeenCalled();
    // await verifyDropdownItems(defaultItems);
  },
};

export const WithOnClick: Story = {
  args: {
    triggerText: "With onClick",
    items: defaultItems.map((item) => ({
      ...item,
      href: `/option${item.key}`,
    })),
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByText(args.triggerText);
    await userEvent.click(trigger);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};
