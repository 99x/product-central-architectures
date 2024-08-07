import { Meta, StoryObj } from '@storybook/react';
import { Row, Col } from './grid';

const meta: Meta<typeof Row> = {
  component: Row,
  title: 'Organisms/Grid/Row',
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Row>;

const Columns = (span: number, columns: number, heights?: number[]) => (
  <>
    {Array.from({ length: columns }, (_, i) => (
      <Col span={span} key={i}>
        <div
          className="bg-blue-500 text-white text-center py-4"
          style={{ height: `${heights?.[i] || 25}px` }}
        >
          Col-{i + 1}
        </div>
      </Col>
    ))}
  </>
);
export const Default: Story = {
  args: {
    children: Columns(6, 4),
  },
};

export const WithCustomGutter: Story = {
  args: {
    gutter: 24,
    children: Columns(6, 4),
  },
};

export const WithResponsiveGutter: Story = {
  args: {
    gutter: { xs: 8, sm: 16, md: 24, lg: 32 },
    children: Columns(6, 4),
  },
};

export const WithVerticalGutter: Story = {
  args: {
    gutter: [16, 24],
    children: Columns(6, 8),
  },
};

export const WithVerticalGutterResponsive: Story = {
  args: {
    gutter: [
      { xs: 8, sm: 16, md: 24, lg: 32 },
      { xs: 8, sm: 16, md: 24 },
    ],
    children: Columns(6, 8),
  },
};

export const JustifyStart: Story = {
  name: 'Justify: Start',
  args: {
    justify: 'start',
    children: Columns(4, 4),
  },
};

export const JustifyEnd: Story = {
  name: 'Justify: End',
  args: {
    justify: 'end',
    children: Columns(4, 4),
  },
};

export const JustifyCenter: Story = {
  name: 'Justify: Center',
  args: {
    justify: 'center',
    children: Columns(4, 4),
  },
};

export const JustifySpaceAround: Story = {
  name: 'Justify: Space Around',
  args: {
    justify: 'space-around',
    children: Columns(4, 4),
  },
};

export const JustifySpaceBetween: Story = {
  name: 'Justify: Space Between',
  args: {
    justify: 'space-between',
    children: Columns(4, 4),
  },
};

export const JustifySpaceEvenly: Story = {
  name: 'Justify: Space Evenly',
  args: {
    justify: 'space-evenly',
    children: Columns(4, 4),
  },
};

export const ResponsiveJustify: Story = {
  name: 'Justify: Responsive',
  args: {
    justify: {
      xs: 'start',
      sm: 'end',
      md: 'center',
      lg: 'space-around',
      xl: 'space-between',
      xxl: 'space-evenly',
    },
    children: Columns(4, 4),
  },
};

export const AlignTop: Story = {
  name: 'Align: Top',
  args: {
    align: 'top',
    children: Columns(4, 4, [100, 25, 50, 75]),
  },
};

export const AlignMiddle: Story = {
  name: 'Align: Middle',
  args: {
    align: 'middle',
    children: Columns(4, 4, [100, 25, 50, 75]),
  },
};

export const AlignBottom: Story = {
  name: 'Align: Bottom',
  args: {
    align: 'bottom',
    children: Columns(4, 4, [100, 25, 50, 75]),
  },
};

export const AlignStretch: Story = {
  name: 'Align: Stretch',
  args: {
    align: 'stretch',
    children: Columns(4, 4, [100, 25, 50, 75]),
  },
};

export const ResponsiveAlign: Story = {
  name: 'Align: Responsive',
  args: {
    align: {
      xs: 'top',
      sm: 'middle',
      md: 'bottom',
      lg: 'stretch',
      xl: 'top',
      xxl: 'middle',
    },
    children: Columns(4, 4, [100, 25, 50, 75]),
  },
};

export const NoWrap: Story = {
  name: 'Wrap: False',
  args: {
    wrap: false,
    children: Columns(6, 6),
  },
};

export const Wrap: Story = {
  name: 'Wrap: True',
  args: {
    wrap: true,
    children: Columns(6, 6),
  },
};
