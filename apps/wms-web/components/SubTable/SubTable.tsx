// components
import { Table } from "antd";
import { useSubTable } from "./useSubTable";
import { useTranslations } from "next-intl";
import { displayNumber } from "@/utils/display.utility";
import styles from "./styles.module.scss";
const SubTable = ({ expanded, record }: { record: any; expanded: boolean }) => {
  const t = useTranslations();

  const columns: any = [
    {
      title: t("Item"),
      render: (record: any) => (
        <div className="flex flex-col">
          <span className=" text-neutral-900 cursor-pointer">
            {record?.name}
          </span>
        </div>
      ),
    },

    {
      title: t("Inventory"),
      width: 100,
      render: (record: any) => (
        <div className="text-right">{displayNumber(record?.inventories)}</div>
      ),
    },
    {
      title: t("Inventory available"),
      width: 200,
      render: (record: any) => (
        <div className="text-right">
          {displayNumber(record?.availableInventories)}
        </div>
      ),
    },
  ];
  const { data } = useSubTable({ expanded, record });

  return (
    <div className={styles["table"]}>
      <Table
        rowKey="no"
        columns={columns}
        dataSource={[data]}
        pagination={false}
        expandable={{
          showExpandColumn: false,
        }}
      />
    </div>
  );
};

export default SubTable;
