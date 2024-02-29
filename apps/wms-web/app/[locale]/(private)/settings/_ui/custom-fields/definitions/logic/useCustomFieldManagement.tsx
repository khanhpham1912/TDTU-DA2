import { ConfirmModalProps } from "@/models/confirm.model";
import { removeCustomField } from "@/services/customField.service";
import { pushNotify } from "@/utils/toast";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleOnRequestError } from "common-ui/lib/utils/request.utility";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";

export const useCustomFieldManagement = ({
  modal,
}: {
  modal?: ConfirmModalProps;
}) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const {
    value: openDrawer,
    setTrue: onOpenDrawer,
    setFalse: onCloseDrawer,
  } = useBoolean();

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
        queryKey: ["field-definitions"],
      });
    },
    onError: handleOnRequestError({
      message: t("An error has occurred"),
    }),
  });

  const handleRemoveField = (fieldId: string) => {
    modal?.delete({
      title: (
        <span className="font-weight-500 font-16">{`${t(
          "Delete this field"
        )} ?`}</span>
      ),
      icon: (
        <FontAwesomeIcon
          icon={faTrashCan}
          className="color-danger mr-16 mt-4"
        />
      ),
      content: (
        <span className="color-red-500">{`${t(
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
