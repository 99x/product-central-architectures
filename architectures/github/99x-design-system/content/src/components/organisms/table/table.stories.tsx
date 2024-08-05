/* eslint-disable @typescript-eslint/no-explicit-any */
import { within, userEvent, expect, fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { Table } from "./table";

const meta: Meta<typeof Table> = {
  component: Table,
  title: "Organisms/Table",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Table>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address?: string;
}
const dataSource: DataType[] = Array.from({ length: 20 }, (_, i) => ({
  key: (i + 1).toString(),
  name: `User${i + 1}`,
  age: Math.floor(Math.random() * 50) + 20,
  address: `${Math.floor(Math.random() * 100) + 1} Downing Street`,
}));

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    render: () => (
      <div>
        <a>Edit</a>
      </div>
    ),
  },
];
type Options = {
  size?: "small" | "middle" | "large";
  bordered?: boolean;
  rowHoverable?: boolean;
  showHeader?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  rowSelectionType?: "checkbox" | "radio";
  onRowSelect?: (record: any) => void;
  pagination?: boolean | object;
  scroll?: object;
};
const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const testTable = async (
  canvasElement: HTMLElement,
  expectedRows: number,
  options?: Options
) => {
  const table = within(canvasElement).getByRole("table");

  const showHeader = options?.showHeader ?? true;
  if (showHeader) {
    const headers = within(table).getAllByRole("columnheader");
    expect(headers[0]).toHaveTextContent("Name");
    expect(headers[1]).toHaveTextContent("Age");
    expect(headers[2]).toHaveTextContent("Address");
    expect(headers[3]).toHaveTextContent("Action");
  }
  const rows = within(table).getAllByRole("row");

  expectedRows = !showHeader ? expectedRows : expectedRows + 1;
  expect(rows.length).toBe(expectedRows);

  const firstRow = rows[showHeader ? 1 : 0];
  const firstRowCells = within(firstRow).getAllByRole("cell");
  const firstRowNameCell = firstRowCells[0];
  const firstRowAgeCell = firstRowCells[1];
  const firstRowAddressCell = firstRowCells[2];

  expect(firstRowNameCell).toHaveTextContent("User1");
  expect(firstRowAgeCell).toHaveTextContent(dataSource[0]?.age?.toString());
  expect(firstRowAddressCell).toHaveTextContent(dataSource[0].address ?? "");

  const firstRowEditButton = within(firstRow).getByText("Edit");
  userEvent.click(firstRowEditButton);
  await expect(firstRowEditButton).toBeInTheDocument();

  // Check for pagination
  const pagination = canvasElement.querySelector(".ant-pagination");
  expect(pagination).toBeInTheDocument();
};

export const Default: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
  },
  play: async ({ canvasElement }) => {
    testTable(canvasElement, 10);
  },
};

export const Small: Story = {
  name: "Size: Small",
  args: {
    columns: columns,
    dataSource: dataSource,
    size: "small",
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelector(".ant-table-small")).toBeInTheDocument();
    testTable(canvasElement, 10);
  },
};

export const Middle: Story = {
  name: "Size: Middle",
  args: {
    columns: columns,
    dataSource: dataSource,
    size: "middle",
  },
  play: async ({ canvasElement }) => {
    expect(
      canvasElement.querySelector(".ant-table-middle")
    ).toBeInTheDocument();
    testTable(canvasElement, 10);
  },
};

export const Large: Story = {
  name: "Size: Large",
  args: {
    columns: columns,
    dataSource: dataSource,
    size: "large",
  },
  play: async ({ canvasElement }) => {
    testTable(canvasElement, 10);
  },
};

export const Bordered: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    bordered: true,
  },
  play: async ({ canvasElement }) => {
    expect(
      canvasElement.querySelector(".ant-table-bordered")
    ).toBeInTheDocument();
  },
};
export const WithoutRowHoverable: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    rowHoverable: false,
  },
};

export const WithoutHeader: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    showHeader: false,
  },
  play: async ({ canvasElement }) => {
    testTable(canvasElement, 10, { showHeader: false });
  },
};

export const WithCustomHeader: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    header: <h1>Custom Header</h1>,
  },
  play: async ({ canvasElement }) => {
    const title = canvasElement.querySelector(".ant-table-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Custom Header");
  },
};

export const WithCustomFooter: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    footer: <h1>Custom Footer</h1>,
  },
  play: async ({ canvasElement }) => {
    const title = canvasElement.querySelector(".ant-table-footer");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Custom Footer");
  },
};

export const WithLoading: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const spin = canvasElement.querySelector(".ant-spin");
    expect(spin).toBeInTheDocument();
  },
};

export const RowSelectionCheckbox: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    rowSelectionType: "checkbox",
    onRowSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const checkboxes = within(canvasElement).getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(11);
  },
};

export const RowSelectionRadio: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    rowSelectionType: "radio",
    onRowSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const radios = within(canvasElement).getAllByRole("radio");
    expect(radios).toHaveLength(10);
  },
};

export const WithoutPagination: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    pagination: false,
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector(".ant-pagination");
    expect(pagination).not.toBeInTheDocument();
  },
};

export const WithPaginationProps: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    pagination: {
      pageSize: 5,
      showSizeChanger: true,
      position: ["bottomCenter"],
      showTotal: (total, range) =>
        `Showing ${range[0]}-${range[1]} of ${total} items`,
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector(".ant-pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Showing 1-5 of 20 items");

    const pageSizeChanger = canvasElement.querySelector(".ant-select-selector");
    expect(pageSizeChanger).toBeInTheDocument();

    const pageNumbers = canvasElement.querySelectorAll(".ant-pagination-item");
    expect(pageNumbers).toHaveLength(4);

    userEvent.click(pageNumbers[1]);
    setTimeout(() => {
      expect(pagination).toHaveTextContent("Showing 6-10 of 20 items");
    }, 1000);
  },
};

export const WithSorter: Story = {
  args: {
    columns: [
      ...columns,
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        sorter: (a: any, b: any) => a.age - b.age,
      },
    ],
    dataSource: dataSource,
  },
  play: async ({ canvasElement }) => {
    const table = within(canvasElement).getByRole("table");
    const headers = within(table).getAllByRole("columnheader");
    const ageHeader = headers[4];
    userEvent.click(ageHeader);
    await wait();

    const rows = within(table).getAllByRole("row");
    const firstRow = rows[1];
    const firstRowCells = within(firstRow).getAllByRole("cell");
    const firstRowAgeCell = firstRowCells[1];
    const sortedData = dataSource.sort((a, b) => a.age - b.age);
    expect(firstRowAgeCell).toHaveTextContent(sortedData[0].age?.toString());
  },
};

export const WithFilter: Story = {
  args: {
    columns: [
      ...columns,
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        filters: [
          {
            text: "Less than 30",
            value: "less",
          },
          {
            text: "More than 30",
            value: "greater",
          },
        ],
        onFilter: (value: any, record: any) => {
          if (value === "less") {
            return record.age < 30;
          } else {
            return record.age > 30;
          }
        },
      },
    ],
    dataSource: dataSource,
  },
  play: async ({ canvasElement }) => {
    const table = within(canvasElement).getByRole("table");
    const headers = within(table).getAllByRole("columnheader");
    const ageHeader = headers[4];
    const filter = within(ageHeader).getByRole("button");
    userEvent.click(filter);
    await wait();

    const filterMenu = document.querySelector(
      ".ant-table-filter-dropdown"
    ) as HTMLElement;
    const checkBox = within(filterMenu).getAllByRole("checkbox")[0];
    userEvent.click(checkBox);

    const okButton = within(filterMenu).getAllByRole("button")[1];
    userEvent.click(okButton);

    await wait();
    const rows = within(table).getAllByRole("row");
    const firstRow = rows[1];
    const firstRowCells = within(firstRow).getAllByRole("cell");
    const firstRowAgeCell = firstRowCells[1];
    const sortedData = dataSource.sort((a, b) => a.age - b.age);
    expect(firstRowAgeCell).toHaveTextContent(sortedData[0].age?.toString());
  },
};

export const WithColSpanRowSpan: Story = {
  args: {
    columns: [
      {
        title: "RowHead",
        dataIndex: "key",
        rowScope: "row",
      },
      {
        title: "Name",
        dataIndex: "name",
        render: (text) => <a>{text}</a>,
        onCell: (_, index) => ({
          colSpan: index === 1 ? 2 : 1,
        }),
      },
      {
        title: "Age",
        dataIndex: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
    ],
    bordered: true,
    dataSource: dataSource,
  },
  play: async ({ canvasElement }) => {
    const table = within(canvasElement).getByRole("table");
    const rows = within(table).getAllByRole("row");
    const firstRow = rows[1];
    const firstRowCells = within(firstRow).getAllByRole("cell");
    expect(firstRowCells).toHaveLength(3);
  },
};

export const WithFixedHeader: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    scroll: {
      x: true,
      y: 240, //Height of the table
    },
  },
  play: async ({ canvasElement }) => {
    const fixedHeader = canvasElement.querySelector(".ant-table-fixed-header");
    expect(fixedHeader).toBeInTheDocument();
  },
};

export const WithFixedColumn: Story = {
  args: {
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: string) => <a>{text}</a>,
        width: 100,
        fixed: "left",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 100,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 400,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 400,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 400,
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "action",
        render: () => (
          <div>
            <a>Edit</a>
          </div>
        ),
        width: 300,
      },
    ],
    dataSource: dataSource,
    scroll: {
      x: "100vw",
    },
  },
  play: async ({ canvasElement }) => {
    const fixedColumns = canvasElement.querySelectorAll(
      ".ant-table-has-fix-left"
    );
    expect(fixedColumns).toHaveLength(1);
  },
};

export const WithScrollToFirstRowOnChange: Story = {
  args: {
    columns: columns,
    dataSource: dataSource,
    scroll: {
      scrollToFirstRowOnChange: true,
      x: true,
      y: 240,
    },
  },
};
