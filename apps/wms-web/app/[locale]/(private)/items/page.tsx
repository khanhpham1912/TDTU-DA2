"use client";

import { Table } from "@/components";
import { useBreadcrumb } from "@/hooks";
import { getItems } from "@/services/items.service";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function Items() {
  const t = useTranslations();
  useBreadcrumb({
    selectedMenu: "ITEMS",
  });
  const filterOptions: any = useMemo(() => {
    const _filterOptions: any[] = [
      {
        formName: "uom",
        label: t("UOM"),
        filterType: "Select",
        selectConfig: {
          options: [],
        },
      },

      {
        formName: "type",
        label: `${t("Product type")}`,
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
      title: t("Name"),
      render: (record: any) => (
        <div className="flex flex-col">
          <span className=" text-blue-500">{record?.name}</span>
          <span className=" text-gray-500">{record?.sku}</span>
        </div>
      ),
    },
    {
      title: t("Weight"),
      render: (record: any) => <span>{record?.grossWeight}</span>,
    },
    {
      title: t("Production date"),
      render: (record: any) => <span>{record?.productionDate}</span>,
    },
    {
      title: t("Expire date"),
      render: (record: any) => <span>{record?.expiryDate}</span>,
    },
    {
      title: t("Supplier"),
      render: (record: any) => <span>{record?.supplier}</span>,
    },
    {
      title: t("Product type"),
      render: (record: any) => <span>{record?.type}</span>,
    },
    {
      title: t("UOM"),
      render: (record: any) => <span>{record?.uom}</span>,
    },
    {
      title: t("Remark"),
      render: (record: any) => <span>{record?.description}</span>,
    },
  ];
  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        dataSource={[
          {
            sku: "sp1",
            name: "sản phẩm 1",
            description: "nothing",
            uom: "BUCKET",
            type: "CONSUMER_GOODS",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "10/12/2023",
            expiryDate: "10/6/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp2",
            name: "sản phẩm 2",
            description: "nothing",
            uom: "SET",
            type: "HEALTH_AND_BEAUTY",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "18/02/2023",
            expiryDate: "10/7/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp3",
            name: "sản phẩm 3",
            description: "nothing",
            uom: "CASE",
            type: "RUBBER_AND_PLASTICS",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "10/12/2023",
            expiryDate: "10/6/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp4",
            name: "sản phẩm 4",
            description: "nothing",
            uom: "GROSS",
            type: "FURNITURE",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "10/01/2023",
            expiryDate: "10/1/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp5",
            name: "sản phẩm 5",
            description: "nothing",
            uom: "LOT",
            type: "STEELS",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "23/12/2023",
            expiryDate: "23/6/2024",
            supplier: "Hảo hảo",
          },
        ]}
        queryConfig={{
          queryKey: ["items-manager"],
          queryFn: getItems,
        }}
        onClickAdd={() => {}}
      />
    </div>
  );
}
