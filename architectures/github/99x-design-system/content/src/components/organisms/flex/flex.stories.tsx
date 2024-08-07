import { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./flex";

const meta: Meta<typeof Flex> = {
  component: Flex,
  title: "Organisms/Flex",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Flex>;

const Items = (items: number, heights?: number[]) => (
  <>
    {Array.from({ length: items }, (_, i) => (
      <div
        className="bg-blue-500 text-white text-center py-4"
        style={{ height: `${heights?.[i] || 25}px`, width: "250px" }}
      >
        Item-{i + 1}
      </div>
    ))}
  </>
);

export const Default = () => <Flex>{Items(4)}</Flex>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Start: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
Start.storyName = "Justify:Start";
Start.args = {
  justify: "start",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const End: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
End.storyName = "Justify:End";
End.args = {
  justify: "end",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Center: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
Center.storyName = "Justify:Center";
Center.args = {
  justify: "center",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SpaceBetween: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
SpaceBetween.storyName = "Justify:SpaceBetween";
SpaceBetween.args = {
  justify: "space-between",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SpaceAround: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
SpaceAround.storyName = "Justify:SpaceAround";
SpaceAround.args = {
  justify: "space-around",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AlignStart: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
AlignStart.storyName = "Align:Start";
AlignStart.args = {
  align: "start",
  className: "h-full",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AlignEnd: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
AlignEnd.storyName = "Align:End";
AlignEnd.args = {
  align: "end",
  className: "h-full",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AlignCenter: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
AlignCenter.storyName = "Align:Center";
AlignCenter.args = {
  align: "center",
  className: "h-full",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AlignBaseline: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
AlignBaseline.storyName = "Align:Baseline";
AlignBaseline.args = {
  align: "baseline",
  className: "h-full",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AlignStretch: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
AlignStretch.storyName = "Align:Stretch";
AlignStretch.args = {
  align: "stretch",
  className: "h-full",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FlexStart: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
FlexStart.storyName = "Flex:Start";
FlexStart.args = {
  align: "flex-start",
  className: "h-full",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FlexEnd: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
FlexEnd.storyName = "Flex:End";
FlexEnd.args = {
  align: "flex-end",
  className: "h-full",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Vertical: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
Vertical.storyName = "Vertical: True";
Vertical.args = {
  vertical: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithoutWrap: Story = (args: any) => (
  <Flex {...args}>{Items(12)}</Flex>
);
WithoutWrap.args = {
  wrap: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GapSmall: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
GapSmall.storyName = "Gap:Small";
GapSmall.args = {
  gap: "small",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GapMiddle: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
GapMiddle.storyName = "Gap:Middle";
GapMiddle.args = {
  gap: "middle",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GapLarge: Story = (args: any) => <Flex {...args}>{Items(4)}</Flex>;
GapLarge.storyName = "Gap:Large";
GapLarge.args = {
  gap: "large",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GapCustom: Story = (args: any) => (
  <Flex {...args}>{Items(4)}</Flex>
);
GapCustom.storyName = "Gap:Custom";
GapCustom.args = {
  gap: 100,
};
