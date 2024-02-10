"use client";

import { Table } from "@/components";
import { useBreadcrumb } from "@/hooks";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function Items() {
  const t = useTranslations();

  useBreadcrumb({
    selectedMenu: "OUTBOUND",
  });
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
        queryConfig={{
          queryKey: ["outbound-manager"],
          queryFn: () => {},
        }}
        onClickAdd={() => {}}
      />
    </div>
  );}
