import { ConfigProvider, TableProps } from "antd";
import AntTable from "antd/es/table";
import type { ColumnsType } from "antd/es/table";

type Prop<T extends object> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  pagination?: false | TableProps["pagination"];
  rowKey: string;
  rowSelectionType?: "checkbox" | "radio";
  onRowSelect?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  size?: "small" | "middle" | "large";
  bordered?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  rowHoverable?: boolean;
  showHeader?: boolean;
  className?: string;
  rowClassName?: string;
  scroll?: {
    scrollToFirstRowOnChange?: boolean;
    x?: true | number | string;
    y?: number | string;
  };
};

export const Table = <T extends object>(props: Prop<T>) => {
  const {
    scroll = { x: true }, // Set default value for scroll
    ...otherProps
  } = props;

  const enhancedColumns = otherProps.columns.map((col) => {
    if (!col.render) {
      return {
        ...col,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (text: any) =>
          text === null || text === undefined || text === "" ? "-" : text,
      };
    } else {
      return col;
    }
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#EEEFF6",
            cellPaddingBlock: 10,
          },
        },
      }}
    >
      <div className="table-container">
        <AntTable<T>
          columns={enhancedColumns}
          dataSource={otherProps.dataSource}
          scroll={scroll}
          rowKey={otherProps.rowKey}
          size={otherProps.size}
          pagination={otherProps.pagination}
          bordered={otherProps.bordered}
          loading={otherProps.loading}
          rowHoverable={otherProps.rowHoverable}
          showHeader={otherProps.showHeader}
          {...(otherProps.rowSelectionType && {
            rowSelection: {
              type: otherProps.rowSelectionType,
              onChange: otherProps.onRowSelect,
            },
          })}
          {...(otherProps.footer && {
            footer: () => otherProps.footer,
          })}
          {...(otherProps.header && {
            title: () => otherProps.header,
          })}
        />
      </div>
    </ConfigProvider>
  );
};
