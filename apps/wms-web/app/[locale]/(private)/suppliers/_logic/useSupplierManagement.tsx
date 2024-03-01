import CommonContext from "@/contexts/CommonContext";
import { deleteSupplier } from "@/services/suppliers.service";
import { displayPhone, displayValue } from "@/utils/display.utility";
import { pushNotify } from "@/utils/toast";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useContext, useMemo, useState } from "react";
import { Supplier } from "wms-models/lib/suppliers";

export default function useSupplierManagement() {
  const t = useTranslations();
  const [selectedSupplier, setSelectedSupplier] = useState<any>();
  const queryClient = useQueryClient();
  const { modal } = useContext(CommonContext);

  const deleteSupplierMutation = useMutation({
    mutationFn: (request: string) => deleteSupplier(request),
    onSuccess: (_response) => {
      pushNotify(t("Remove successfully"));
      queryClient.invalidateQueries({ queryKey: ["supplier-management"] });
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
  const handleRemoveItem = (item: any) => {
    modal?.confirm({
      title: (
        <span className="font-medium text-base">{`${t(
          "Delete supplier"
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
      onOk: () => deleteSupplierMutation.mutate(item?._id),
    });
  };

  const filterOptions: any = useMemo(() => {
    const _filterOptions: any[] = [];
  }, [t]);

  const columns: any = [
    {
      title: t("Supplier"),
      fixed: "left",
      width: 250,
      render: (record: Supplier) => (
        <div className="flex flex-col">
          <span
            className=" text-blue-500 cursor-pointer"
            onClick={() => setSelectedSupplier(record?._id)}
          >
            {record?.general?.companyName}
          </span>
          <span className="text-gray-500 text-xs">{record?.no}</span>
        </div>
      ),
    },
    {
      title: t("Contact info"),
      width: 150,
      render: (record: Supplier) => (
        <div className="flex flex-col">
          <span>{displayValue(record?.contact?.name)}</span>
          <span className=" text-blue-500 text-xs">
            {displayPhone(record?.contact?.phone)}
          </span>
        </div>
      ),
    },
    {
      title: t("Address"),
      width: 200,
      render: (record: Supplier) => (
        <span>{displayValue(record?.general?.officeAddress)}</span>
      ),
    },
    {
      title: t("Action"),
      width: 100,
      key: "action",
      fixed: "right",
      align: "center",
      isDefault: true,
      render: (_: any, record: Supplier) => (
        <div className="flex gap-4 justify-center">
          <FontAwesomeIcon
            icon={faEye}
            className=" text-indigo-600 cursor-pointer"
            onClick={() => {
              setSelectedSupplier(record?._id);
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
  return { columns, filterOptions, selectedSupplier, setSelectedSupplier };
}
