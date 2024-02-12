import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useBoolean } from "usehooks-ts";

export default function useItemManagement() {
  const t = useTranslations();

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

  const columns: any = [
    {
      title: t("Name"),
      width: 150,
      fixed: "left",
      render: (record: any) => (
        <div className="flex flex-col">
          <span className=" text-blue-500">{record?.name}</span>
          <span className=" text-gray-500">{record?.sku}</span>
        </div>
      ),
    },
    {
      title: t("Weight"),
      with: 70,
      render: (record: any) => <span>{record?.grossWeight}</span>,
    },
    {
      title: t("Production date"),
      width: 200,
      render: (record: any) => <span>{record?.productionDate}</span>,
    },
    {
      title: t("Expire date"),
      width: 200,

      render: (record: any) => <span>{record?.expiryDate}</span>,
    },
    {
      title: t("Supplier"),
      render: (record: any) => <span>{record?.supplier}</span>,
    },
    {
      title: t("Product type"),
      width: 200,

      render: (record: any) => <span>{record?.type}</span>,
    },
    {
      title: t("UOM"),
      width: 200,

      render: (record: any) => <span>{record?.uom}</span>,
    },
    {
      title: t("Remark"),
      width: 200,

      render: (record: any) => <span>{record?.description}</span>,
    },
  ];
  return {columns, filterOptions}
}
