import CommonContext from "@/contexts/CommonContext";
import { removeCustomField } from "@/services/custom.field.service";
import { pushNotify } from "@/utils/toast";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { useBoolean } from "usehooks-ts";

export const useCustomFieldManagement = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const { modal } = useContext(CommonContext);
  const {
    value: openDrawer,
    setTrue: onOpenDrawer,
    setFalse: onCloseDrawer,
  } = useBoolean(false);

  const handCloseDrawer = () => {
    !!selectedFieldId && setSelectedFieldId("");
    onCloseDrawer();
  };

  const handleSelectedField = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    onOpenDrawer();
  };

  const removeFieldMutation = useMutation({
    mutationFn: (fieldId: string) => removeCustomField(fieldId),
    onSuccess: (response) => {
      pushNotify(response.message);
      queryClient.invalidateQueries({
        queryKey: ["field-definition"],
      });
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

  const handleRemoveField = (fieldId: string) => {
    modal?.confirm({
      title: (
        <span className="text-base font-medium">{`${t(
          "Delete this field"
        )} ?`}</span>
      ),
      icon: (
        <FontAwesomeIcon
          icon={faTrashCan}
          style={{ color: "#ff4d4f", fontSize: 14 }}
          className="mr-4 mt-1"
        />
      ),
      content: (
        <span className="text-[#ff4d4f]">{`${t(
          "Note: Mapping fields are also permanently deleted"
        )}.`}</span>
      ),
      cancelText: t("Cancel"),
      okText: t("Delete"),
      okButtonProps: { danger: true },
      onOk: () => removeFieldMutation.mutate(fieldId),
    });
  };

  return {
    openDrawer,
    selectedFieldId,
    onOpenDrawer,
    handCloseDrawer,
    handleRemoveField,
    handleSelectedField,
  };
};
