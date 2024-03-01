import {
  CSSProperties,
  FC,
  Fragment,
  HTMLAttributes,
  ReactNode,
  useId,
} from "react";
import styles from "./simple-table-view.module.scss";
import classNames from "classnames";

export type Layout = "horizontal" | "vertical";

interface TableViewProps extends HTMLAttributes<HTMLElement> {
  data: {
    label?: ReactNode;
    content?: ReactNode;
    layout?: Layout;
  }[];
  noBreak?: boolean;
  labelWidth?: CSSProperties["width"];
  layout?: Layout;
  breakChar?: ReactNode;
}

const TableView: FC<TableViewProps> = ({
  data,
  className,
  labelWidth = "auto",
  layout = "horizontal",
  noBreak = false,
  breakChar = ":",
}) => {
  const id = useId();
  return (
    <table className={classNames("m-0", styles["table-detail"], className)}>
      <tbody>
        {Array.isArray(data) &&
          data?.map((row: any, index) => {
            const _layout = row?.layout || layout;
            const isVertical = _layout === "vertical";
            return isVertical ? (
              <Fragment key={id + index}>
                <tr>
                  <td
                    colSpan={2}
                    className="detail-key pb-0"
                    style={{ width: labelWidth } as any}
                  >
                    <div className="detail-key__label">
                      {row.label}
                      {noBreak ? "" : breakChar}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="detail-value pt-0">
                    {row.content}
                  </td>
                </tr>
              </Fragment>
            ) : (
              <tr key={id + index}>
                <td className="detail-key" style={{ width: labelWidth } as any}>
                  <div className="detail-key__label font-normal text-gray-500 text-sm">
                    {row.label}
                    {noBreak ? "" : breakChar}
                  </div>
                </td>
                <td className="text-right font-semibold text-gray-600 text-sm">{row.content}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableView;
