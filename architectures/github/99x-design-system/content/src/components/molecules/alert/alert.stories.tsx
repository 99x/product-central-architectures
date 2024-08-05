import { within, expect, fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Molecules/Alert",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Alert>;

const commonAlertPlay = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { args, canvasElement }: { args: any; canvasElement: HTMLElement },
  additionalChecks?: (alert: HTMLElement) => void
) => {
  const canvas = within(canvasElement);
  const alert = await canvas.findByRole("alert");
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveClass(`ant-alert-${args.type || "success"}`);
  additionalChecks && additionalChecks(alert);
};

export const Default: Story = {
  args: {
    message: "This is a default alert",
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement });
  },
};

export const Success: Story = {
  name: "Type: Success",
  args: {
    message: "This is a success alert",
    type: "success",
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement });
  },
};

export const Warning: Story = {
  name: "Type: Warning",
  args: {
    message: "This is a warning alert",
    type: "warning",
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement });
  },
};

export const Error: Story = {
  name: "Type: Error",
  args: {
    message: "This is an error alert",
    type: "error",
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement });
  },
};

export const Info: Story = {
  name: "Type: Info",
  args: {
    message: "This is an info alert",
    type: "info",
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement });
  },
};

export const WithClose: Story = {
  args: {
    message: "This is an alert with close button",
    closable: true,
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement }, (alert) => {
      const closeBtn = within(alert).getByRole("button");
      expect(closeBtn).toBeInTheDocument();
    });
  },
};
export const WithOnClose: Story = {
  args: {
    message: "This is an alert with close button",
    closable: true,
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement }, (alert) => {
      const close = within(alert).getByRole("button");
      expect(close).toBeInTheDocument();
      close.click();
      expect(args.onClose).toHaveBeenCalled();
    });
  },
};

export const WithDescription: Story = {
  args: {
    message: "This is an alert with description",
    description: "This is a description",
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement }, (alert) => {
      const description = alert.querySelector(".ant-alert-description");
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("This is a description");
    });
  },
};

export const WithIcon: Story = {
  args: {
    message: "This is an alert with icon",
    showIcon: true,
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement }, (alert) => {
      const icon = within(alert).getByRole("img");
      expect(icon).toBeInTheDocument();
    });
  },
};

export const WithCustomIcon: Story = {
  args: {
    message: "This is an alert with custom icon",
    showIcon: true,
    icon: <span>🚀</span>,
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement }, (alert) => {
      const icon = within(alert).getByText("🚀");
      expect(icon).toBeInTheDocument();
    });
  },
};

export const WithBanner: Story = {
  args: {
    message: "This is a banner alert",
    banner: true,
  },
  play: async ({ canvasElement, args }) => {
    await commonAlertPlay({ args, canvasElement }, (alert) => {
      expect(alert).toHaveClass("ant-alert-banner");
    });
  },
};
