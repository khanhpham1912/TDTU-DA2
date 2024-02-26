"use client";

import { Table } from "@/components";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { InboundOrder } from "wms-models/lib/inbound";
import { Item } from "wms-models/lib/items";

export default function Items() {
  const t = useTranslations();

  const filterOptions: any = useMemo(() => {
    const _filterOptions: any[] = [
      {
        formName: "status",
        label: t("Status"),
        filterType: "Select",
        selectConfig: {
          options: [],
        },
      },
    ];
    return _filterOptions;
  }, [t]);
  const columns = [
    {
      title: t("Inbound order"),
      render: (record: InboundOrder) => (
        <div className="flex flex-col">
          <span className=" text-blue-500">{record?.no}</span>
          <span className=" text-gray-500">{record?.status}</span>
        </div>
      ),
    },
    {
      title: t("Shipper"),
      render: (record: InboundOrder) => (
        <div className="flex flex-col">
          <span className="text-blue-500">{record?.shipper?.shipperName}</span>
          <span className="text-gray-500">{record?.shipper?.shipperPhone}</span>
        </div>
      ),
    },
    {
      title: t("Total weight"),
      render: (record: InboundOrder) => <span>{record?.totalGrossWeight}</span>,
    },
    {
      title: t("Total value"),
      render: (record: InboundOrder) => <span>{record?.totalValue}</span>,
    },
    {
      title: t("Remark"),
      render: (record: InboundOrder) => <span>{record?.remark}</span>,
    },
    {
      title: t("Action"),
      width: 80,
      key: "action",
      fixed: "right",
      align: "center",
      isDefault: true,
      render: (_: any, record: Item) => (
        <div className="flex gap-4 justify-center">
          <FontAwesomeIcon
            icon={faEye}
            className=" text-indigo-600 cursor-pointer"
            onClick={() => {
              setSelectedInbound(record?._id);
            }}
          />

          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-[#ff4d4f] cursor-pointer"
            onClick={() => handleRemoveInbound(record)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        queryConfig={{
          queryKey: ["inbound-manager"],
          queryFn: () => {},
        }}
        onClickAdd={() => {}}
        addText={t("Create inbound")}
      />
    </div>
  );
}
