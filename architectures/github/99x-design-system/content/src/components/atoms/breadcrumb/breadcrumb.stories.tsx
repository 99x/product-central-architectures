import { within, expect, getByText } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  title: "Atoms/Breadcrumb",
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [{ title: "Home" }, { title: "List" }, { title: "Item" }],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const breadcrumb = await canvas.findByRole("navigation");
    expect(breadcrumb).toBeInTheDocument();
    args.items.forEach((item) => {
      const itemElement = getByText(canvasElement, item.title);
      expect(itemElement).toBeInTheDocument();
    });
  },
};

export const WithHref: Story = {
  args: {
    items: [
      { title: "Home", href: "/home" },
      { title: "List", href: "/list" },
      { title: "Item", href: "/item" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const breadcrumb = await canvas.findByRole("navigation");
    expect(breadcrumb).toBeInTheDocument();
    args.items.forEach((item) => {
      const itemElement = getByText(canvasElement, item.title);
      expect(itemElement).toBeInTheDocument();
      if (item.href) {
        const linkElement = itemElement.closest("a");
        expect(linkElement).toHaveAttribute("href", item.href);
      }
    });
  },
};
