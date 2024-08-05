import { expect } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Atoms/Skeleton",
  parameters: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

const verifyElementByQuery = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvasElement: any,
  query: string,
  checkIsPresent = true
) => {
  const element = canvasElement.querySelector(query);
  if (checkIsPresent) {
    expect(element).toBeInTheDocument();
  } else {
    expect(element).not.toBeInTheDocument();
  }
  return element;
};

export const Default: Story = {
  args: {
    title: true,
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-title");
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph");
  },
};

export const Active: Story = {
  name: "State:Active",
  args: {
    active: true,
  },
  play: async ({ canvasElement }) => {
    const activeSkeleton = await verifyElementByQuery(
      canvasElement,
      ".ant-skeleton-active"
    );
    verifyElementByQuery(activeSkeleton, ".ant-skeleton-title");
    verifyElementByQuery(activeSkeleton, ".ant-skeleton-paragraph");
  },
};

export const WithCustomizableTitle: Story = {
  args: {
    title: { width: "75%" },
  },
  play: async ({ canvasElement }) => {
    const titleElem = await verifyElementByQuery(
      canvasElement,
      ".ant-skeleton-title"
    );
    const computedStyle = window.getComputedStyle(titleElem);
    expect(titleElem).toHaveStyle({ width: computedStyle.width });
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph");
  },
};

export const TitleOnly: Story = {
  args: {
    paragraph: false,
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-title");
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph", false);
  },
};

export const WithCustomizableParagraph: Story = {
  args: {
    paragraph: { rows: 5, width: "75%" },
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-title");
    const paragraphElem = await verifyElementByQuery(
      canvasElement,
      ".ant-skeleton-paragraph"
    );
    const liElements = paragraphElem.querySelectorAll("li");
    expect(liElements.length).toBe(5);
    const lastLiElem = liElements[liElements.length - 1];
    const computedStyle = window.getComputedStyle(lastLiElem);
    expect(lastLiElem).toHaveStyle({ width: computedStyle.width });
  },
};

export const ParagraphOnly: Story = {
  args: {
    title: false,
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-title", false);
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph");
  },
};

export const WithAvatar: Story = {
  args: {
    avatar: true,
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar-lg");
    verifyElementByQuery(canvasElement, ".ant-skeleton-title");
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph");
  },
};

export const WithAvatarSmall: Story = {
  args: {
    avatar: { size: "small" },
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar-sm");
    verifyElementByQuery(canvasElement, ".ant-skeleton-title");
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph");
  },
};

export const WithAvatarDefault: Story = {
  args: {
    avatar: { size: "default" },
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar");
    verifyElementByQuery(canvasElement, ".ant-skeleton-title");
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph");
  },
};

export const WithAvatarLarge: Story = {
  args: {
    avatar: { size: "large" },
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar-lg");
    verifyElementByQuery(canvasElement, ".ant-skeleton-title");
    verifyElementByQuery(canvasElement, ".ant-skeleton-paragraph");
  },
};

export const TypeButton: Story = {
  name: "Type: Button",
  args: {
    type: "button",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-button");
  },
};

export const TypeButtonSmall: Story = {
  name: "Button Size:Small",
  args: {
    type: "button",
    size: "small",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-button-sm");
  },
};

export const TypeButtonLarge: Story = {
  name: "Button Size:Large",
  args: {
    type: "button",
    size: "large",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-button-lg");
  },
};

export const TypeButtonCircle: Story = {
  name: "Button Shape:Circle",
  args: {
    type: "button",
    shape: "circle",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-button-circle");
  },
};

export const TypeButtonSquare: Story = {
  name: "Button Shape:Square",
  args: {
    type: "button",
    shape: "square",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-button-square");
  },
};

export const TypeButtonRound: Story = {
  name: "Button Shape:Round",
  args: {
    type: "button",
    shape: "round",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-button-round");
  },
};

export const TypeAvatar: Story = {
  name: "Type: Avatar",
  args: {
    type: "avatar",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar");
  },
};

export const TypeAvatarSmall: Story = {
  name: "Avatar Size:Small",
  args: {
    type: "avatar",
    size: "small",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar-sm");
  },
};

export const TypeAvatarLarge: Story = {
  name: "Avatar Size:Large",
  args: {
    type: "avatar",
    size: "large",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar-lg");
  },
};

export const TypeAvatarCircle: Story = {
  name: "Avatar Shape:Circle",
  args: {
    type: "avatar",
    shape: "circle",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar-circle");
  },
};

export const TypeAvatarSquare: Story = {
  name: "Avatar Shape:Square",
  args: {
    type: "avatar",
    shape: "square",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-avatar-square");
  },
};

export const TypeImage: Story = {
  name: "Type: Image",
  args: {
    type: "image",
  },
  play: async ({ canvasElement }) => {
    verifyElementByQuery(canvasElement, ".ant-skeleton-image");
  },
};

export const TypeCustom: Story = {
  name: "Type: Custom",
  args: {
    type: "custom",
    className: "!w-full h-12",
  },
  play: async ({ canvasElement }) => {
    await verifyElementByQuery(canvasElement, ".ant-skeleton-image.h-12");
  },
};
