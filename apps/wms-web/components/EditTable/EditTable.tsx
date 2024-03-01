import styles from "./styles.module.scss";
import classNames from "classnames";
import * as CSS from "csstype";

// components
import {
  DatePicker,
  DatePickerProps,
  Empty,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Select,
  SelectProps,
} from "antd";

import { number } from "@/configs/number.config";
import { FORMAT_DATE } from "@/configs/date.config";
import { EditTableAction } from "./EditTableAction";
import { forwardRef } from "react";

// interface
type FormType =
  | "Input"
  | "InputNumber"
  | "Select"
  | "DatePicker"
  | "RangePicker"
  | "QuerySelect"
  | "MetadataSelect";

interface BaseConfig {
  formType?: FormType;
  formName?: string | string[];
  title: string;
  width?: number;
  fixed?: "left" | "right";
  align?: "left" | "right";
  render?: ({
    field,
    fieldKey,
    remove,
  }: {
    field: any;
    fieldKey: number;
    remove: any;
  }) => React.ReactNode;
  rules?: any[];
  isRequired?: boolean;
}

export type Option = {
  value: any;
  label: any;
};

interface InputConfig extends BaseConfig {
  formType?: "Input";
  inputConfig?: InputProps;
}

interface InputNumberConfig extends BaseConfig {
  formType?: "InputNumber";
  inputNumberConfig?: InputNumberProps;
}

interface SelectConfig extends BaseConfig {
  formType?: "Select";
  selectConfig?: SelectProps;
}

interface DatePickerConfig extends BaseConfig {
  formType: "DatePicker";
  datePickerConfig?: DatePickerProps;
}

interface RangePickerConfig extends BaseConfig {
  formType: "RangePicker";
}

export type ColumnConfig =
  | InputConfig
  | InputNumberConfig
  | SelectConfig
  | DatePickerConfig
  | RangePickerConfig;

const renderItem = ({ column }: { column: ColumnConfig }) => {
  switch (column.formType) {
    case "Input":
      return <Input className="w-full" {...column.inputConfig} />;
    case "InputNumber":
      return (
        <InputNumber
          className="w-full"
          {...number}
          {...column.inputNumberConfig}
        />
      );
    case "Select":
      return <Select className="w-full" {...column.selectConfig} />;
    case "DatePicker":
      return (
        <DatePicker
          className="w-full"
          format={FORMAT_DATE}
          {...column.datePickerConfig}
        />
      );
    default:
      return <></>;
  }
};

const EditTable = forwardRef(function EditTable(
  {
    name,
    columns,
    rules,
    tableClassName,
    tableStyle,
    highlightFieldKey,
    initialValue,
    footer
  }: {
    name: string | number | (string | number)[];
    columns: ColumnConfig[];
    rules?: any[];
    footer?: ({ add }: { add: any }) => React.ReactNode;
    tableClassName?: string;
    tableStyle?: CSS.Properties;
    highlightFieldKey?: number;
    initialValue?: any[];
  },
  ref: any
) {
  return (
    <Form.List name={name} rules={rules} initialValue={initialValue || []}>
      {(fields, { add, remove }, { errors }) => {
        return (
          <>
            <EditTableAction ref={ref} add={add} remove={remove} />
            <div
              className={classNames(
                styles["table-wrapper"],
                !!errors.length && styles["table-wrapper--error"],
                tableClassName
              )}
              style={tableStyle}
            >
              <table className={styles.table}>
                <thead>
                  <tr>
                    {columns?.map((column, key) => {
                      const width = column?.width
                        ? parseInt(column.width.toString(), 10)
                        : 100;
                      return (
                        <th
                          key={key}
                          style={{
                            width: width,
                            minWidth: width,
                          }}
                          className={classNames(
                            "text-body",
                            column.fixed === "right" && styles["fixed-right"],
                            column.fixed === "left" && styles["fixed-left"],
                            {
                              ["text-right"]: column.align === "right",
                              ["text-left"]: column.align === "left",
                              ["required"]: column.isRequired,
                            }
                          )}
                        >
                          {column.title as any}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {!!fields.length &&
                    fields.map((field, fieldKey) => {
                      return (
                        <tr
                          key={fieldKey}
                          className={classNames(
                            highlightFieldKey === fieldKey &&
                              styles["highlighted"]
                          )}
                        >
                          {columns.map((column, columnKey) => {
                            const width = column?.width
                              ? parseInt(column.width.toString(), 10)
                              : 100;
                            return (
                              <td
                                key={columnKey}
                                style={{
                                  width: width,
                                  minWidth: width,
                                }}
                                className={classNames(
                                  "text-body",
                                  column.fixed === "right" &&
                                    styles["fixed-right"],
                                  column.fixed === "left" &&
                                    styles["fixed-left"],
                                  {
                                    ["text-right"]: column.align === "right",
                                    ["text-left"]: column.align === "left",
                                  }
                                )}
                              >
                                {column.render ? (
                                  column.render({ field, fieldKey, remove })
                                ) : (
                                  <>
                                    {(() => {
                                      const isArrayFormName = Array.isArray(
                                        column.formName
                                      );
                                      const formName: any = column.formName;
                                      return (
                                        <Form.Item
                                          name={
                                            isArrayFormName
                                              ? [field.name, ...formName]
                                              : [field.name, formName]
                                          }
                                          style={{ marginBottom: 0 }}
                                          rules={column.rules}
                                        >
                                          {renderItem({ column })}
                                        </Form.Item>
                                      );
                                    })()}
                                  </>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  {!fields.length && (
                    <tr>
                      <td colSpan={columns.length} className="py-12">
                        <Empty />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Form.ErrorList
              className="text-[#ff4d4f]"
              errors={[
                errors.length !== 0 && (
                  <div className="flex gap-2 px-4 py-1">{errors}</div>
                ),
              ]}
            />
            {footer?.({ add })}

          </>
        );
      }}
    </Form.List>
  );
});

export default EditTable;
