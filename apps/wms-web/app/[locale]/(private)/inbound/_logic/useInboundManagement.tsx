import CommonContext from "@/contexts/CommonContext";
import { deleteInbound } from "@/services/inbounds.service";
import { deleteItem } from "@/services/items.service";
import { displayDate, displayValue } from "@/utils/display.utility";
import { getEnumValues } from "@/utils/enum.utility";
import { pushNotify } from "@/utils/toast";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useContext, useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { InboundOrder } from "wms-models/lib/inbound";
import { EProductType, Item, UOM } from "wms-models/lib/items";
import { EStatus } from "wms-models/lib/shared";

export default function useInboundManagement() {
  const t = useTranslations();
  const [selectedInbound, setSelectedInbound] = useState<any>();
  const queryClient = useQueryClient();
  const { modal } = useContext(CommonContext);
  const {
    value: showInboundForm,
    setTrue: openInboundForm,
    setFalse: closeInboundForm,
  } = useBoolean(false);

  const deleteInboundMutation = useMutation({
    mutationFn: (request: string) => deleteInbound(request),
    onSuccess: (_response) => {
      pushNotify(t("Remove successfully"));
      queryClient.invalidateQueries({ queryKey: ["inbound-management"] });
    },
    onError: (error: any) => {
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
  const handleRemoveInbound = (order: InboundOrder) => {
    if (order?.status !== EStatus.NEW) {
      return;
    }
    modal?.confirm({
      title: (
        <span className="font-medium text-base">{`${t(
          "Delete inbound order"
        )} ${order?.no}?`}</span>
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
      onOk: () => deleteInboundMutation.mutate(order?._id),
    });
  };

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
  const columns: any = [
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
      render: (_: any, record: InboundOrder) => (
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
            className={classNames(
              record?.status !== EStatus.NEW
                ? "text-gray-500"
                : "text-[#ff4d4f]",
              "cursor-pointer"
            )}
            onClick={() => handleRemoveInbound(record)}
          />
        </div>
      ),
    },
  ];
  return { columns, filterOptions, selectedInbound, setSelectedInbound };
}
