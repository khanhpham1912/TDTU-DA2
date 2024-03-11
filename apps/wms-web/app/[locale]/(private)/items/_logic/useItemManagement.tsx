import CommonContext from "@/contexts/CommonContext";
import { deleteItem } from "@/services/items.service";
import {
  displayDate,
  displayNumber,
  displayValue,
} from "@/utils/display.utility";
import { getEnumValues } from "@/utils/enum.utility";
import { pushNotify } from "@/utils/toast";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useContext, useMemo, useState } from "react";
import { EProductType, Item, UOM } from "wms-models/lib/items";

export default function useItemManagement() {
  const t = useTranslations();
  const [selectedItem, setSelectedItem] = useState<any>();
  const queryClient = useQueryClient();
  const { modal } = useContext(CommonContext);

  const deleteItemMutation = useMutation({
    mutationFn: (request: string) => deleteItem(request),
    onSuccess: (_response) => {
      pushNotify(t("Remove successfully"));
      queryClient.invalidateQueries({ queryKey: ["items-management"] });
    },
    onError: (error: any) => {
      if (error?.response?.data?.message === "Item has been used") {
        pushNotify(t("Item has been used"), { type: "error" });
        return;
      }
      pushNotify(
        error?.response?.data?.message ||
          error.message ||
          t("An error has occurred"),
        {
          type: "error",
        }
      );
    },
  });
  const handleRemoveItem = (item: Item) => {
    modal?.confirm({
      title: (
        <span className="font-medium text-base">{`${t(
          "Delete item"
        )} ${item?.no}?`}</span>
      ),
      icon: (
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-[#ff4d4f] mr-3 mt-1 text-base"
        />
      ),
      content: (
        <span className="text-[#ff4d4f]">{`${t(
          "Note: This information will be deleted permanently"
        )}.`}</span>
      ),
      cancelText: t("Cancel"),
      okText: t("Delete"),
      okButtonProps: { danger: true },
      onOk: () => deleteItemMutation.mutate(item?._id),
    });
  };

  const filterOptions: any = useMemo(() => {
    const _filterOptions: any[] = [
      {
        formName: "uom",
        label: t("UOM"),
        filterType: "Select",
        selectConfig: {
          options: getEnumValues(UOM).map((item) => {
            return {
              value: item,
              label: t(item as any),
            };
          }),
        },
      },

      {
        formName: "type",
        label: `${t("Product type")}`,
        filterType: "Select",
        selectConfig: {
          options: getEnumValues(EProductType).map((item) => {
            return {
              value: item,
              label: t(item as any),
            };
          }),
        },
      },
    ];
    return _filterOptions;
  }, [t]);

  const columns: any = [
    {
      title: t("Name"),
      fixed: "left",
      width: 250,
      render: (record: Item) => (
        <div className="flex flex-col">
          <span
            className=" text-blue-500 cursor-pointer"
            onClick={() => setSelectedItem(record?._id)}
          >
            {record?.name}
          </span>
          <span className=" text-gray-500">{record?.sku}</span>
        </div>
      ),
    },
    {
      title: t("Weight (kg)"),
      width: 150,
      render: (record: Item) => (
        <div className="text-right">
          {record?.grossWeight ? displayNumber(record?.grossWeight ?? 0) : "-"}
        </div>
      ),
    },
    {
      title: t("Production date"),
      width: 200,
      render: (record: Item) => (
        <span>{displayDate(record?.productionDate)}</span>
      ),
    },
    {
      title: t("Expire date"),
      width: 200,
      render: (record: Item) => <span>{displayDate(record?.expiryDate)}</span>,
    },
    {
      title: t("Supplier"),
      width: 200,
      render: (record: Item) => (
        <span>{displayValue(record?.supplier?.name)}</span>
      ),
    },
    {
      title: t("Product type"),
      width: 200,
      render: (record: Item) => (
        <span>{displayValue(t(record?.type as any))}</span>
      ),
    },
    {
      title: t("UOM"),
      width: 200,
      render: (record: Item) => (
        <span>{displayValue(t(record?.uom as any))}</span>
      ),
    },
    {
      title: t("Remark"),
      width: 300,
      render: (record: Item) => (
        <span>{displayValue(record?.description)}</span>
      ),
    },
    {
      title: t("Action"),
      width: 100,
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
              setSelectedItem(record?._id);
            }}
          />

          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-[#ff4d4f] cursor-pointer"
            onClick={() => handleRemoveItem(record)}
          />
        </div>
      ),
    },
  ];
  return { columns, filterOptions, selectedItem, setSelectedItem };
}
