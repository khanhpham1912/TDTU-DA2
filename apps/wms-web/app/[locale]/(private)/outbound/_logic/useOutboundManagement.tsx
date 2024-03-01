import CommonContext from "@/contexts/CommonContext";
import { displayNumber } from "@/utils/display.utility";
import { pushNotify } from "@/utils/toast";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { EStatus } from "wms-models/lib/shared";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { updateOutbound } from "@/services/outbounds.service";
import { Tooltip } from "antd";
import { Status } from "@/components/Status";

export default function useOutboundManagement() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { modal } = useContext(CommonContext);
  const { push } = useRouter();

  const cancelOutboundMutation = useMutation({
    mutationFn: (outboundId: string) =>
      updateOutbound(outboundId, { status: EStatus.CANCELED }),
    onSuccess: (_response) => {
      pushNotify(t("Cancel successfully"));
      queryClient.invalidateQueries({ queryKey: ["outbound-management"] });
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

  const handleCancelOutbound = (order: OutboundOrder) => {
    if (order?.status !== EStatus.NEW) {
      return;
    }
    modal?.confirm({
      title: (
        <span className="font-medium text-base">{`${t(
          "Cancel outbound order"
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
          "Note: This action cannot undo"
        )}.`}</span>
      ),
      cancelText: t("Cancel"),
      okText: t("OK"),
      okButtonProps: { danger: true },
      onOk: () => cancelOutboundMutation.mutate(order?._id),
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
      title: t("Outbound order"),
      render: (record: OutboundOrder) => (
        <div className="flex flex-col">
          <Link href={`/inbound/${record?._id}`}>{record?.no}</Link>
          <Status text={t(record?.status as any)} colorKey={record?.status} />
        </div>
      ),
    },
    {
      title: t("Shipper"),
      render: (record: OutboundOrder) => (
        <div className="flex flex-col">
          <span className="text-blue-500">{record?.shipper?.shipperName}</span>
          <span className="text-gray-500">{record?.shipper?.shipperPhone}</span>
        </div>
      ),
    },
    {
      title: t("Total weight"),
      width: 250,
      render: (record: OutboundOrder) => (
        <div className="text-right">
          {displayNumber(record?.totalGrossWeight ?? 0)}
        </div>
      ),
    },
    {
      title: t("Total value"),
      width: 250,
      render: (record: OutboundOrder) => (
        <div className="text-right">
          {displayNumber(record?.totalValue ?? 0)}
        </div>
      ),
    },
    {
      title: t("Remark"),
      render: (record: OutboundOrder) => <span>{record?.remark}</span>,
    },
    {
      title: t("Action"),
      width: 100,
      key: "action",
      fixed: "right",
      align: "center",
      isDefault: true,
      render: (_: any, record: OutboundOrder) => (
        <div className="flex gap-4 justify-center items-center">
          <Tooltip title={t("View")}>
            <FontAwesomeIcon
              icon={faEye}
              className=" text-indigo-600 cursor-pointer"
              onClick={() => {
                push(`/inbound/${record?._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title={t("Cancel")}>
            <span
              className={classNames(
                record?.status !== EStatus.NEW
                  ? "text-gray-500"
                  : "text-[#ff4d4f]",
                "cursor-pointer material-symbols-outlined"
              )}
              onClick={() => handleCancelOutbound(record)}
            >
              cancel
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
  return { columns, filterOptions };
}
