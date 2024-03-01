import {
  createCustomField,
  fieldVerification,
  getCustomField,
  updateCustomField,
} from "@/services/custom.field.service";
import { typeConfig } from "@/utils/custom.field.utility";
import { displayValue } from "@/utils/display.utility";
import { pushNotify } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { CustomField } from "wms-models/lib/custom.field";
import { ECustomFieldType } from "wms-models/lib/shared";

export const useFieldDrawer = ({
  fieldId,
  onClose,
}: {
  fieldId?: string;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const queryClient = useQueryClient();
  const debouncedName = useDebounce(name, 400);

  useQuery({
    queryKey: ["name-verification", debouncedName],
    queryFn: () => fieldVerification(debouncedName),
    enabled: !!debouncedName,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const isValid = response?.data as boolean;
      setIsNameValid(isValid);
    },
  });

  const handleChangeType = (type: any) => {
    const values = form.getFieldsValue();
    if (
      [
        ECustomFieldType.SELECT,
        ECustomFieldType.CHECKBOX,
        ECustomFieldType.RADIO,
      ].includes(type)
    ) {
      form.setFieldValue(["extraData", typeConfig[type], "options"], [""]);
    } else if (values?.extraData) {
      form.setFieldValue("extraData", undefined);
    }
    form.setFieldValue("type", type);
    if (name) {
      const nameValue = name.split("_");
      const fieldId = `${displayValue(type)}_${
        nameValue?.[1] ?? nameValue?.[0]
      }`.toLowerCase();
      setName(fieldId);
    }
  };

  const customFieldQuery = useQuery({
    queryKey: ["custom-field-detail", fieldId],
    queryFn: () => getCustomField(fieldId as string),
    enabled: !!fieldId,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      form.setFieldsValue(response?.data);
      setName(
        `${displayValue(response?.data?.type)}_${response?.data
          ?.name}`.toLowerCase()
      );
    },
  });

  const createCustomFieldMutation = useMutation({
    mutationFn: (request: CustomField) => createCustomField(request),
  });

  const updateCustomFieldMutation = useMutation({
    mutationFn: (request: CustomField) =>
      updateCustomField(fieldId as string, request),
  });

  const handleClose = () => {
    setName("");
    setIsNameValid(true);
    form.resetFields();
    onClose();
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.value) {
      const type = form.getFieldValue("type");
      let fieldId;
      if (!!type) {
        fieldId = `${displayValue(type)}_${e.target.value}`.toLowerCase();
      } else {
        fieldId = `${e.target.value}`.toLowerCase();
      }
      setName(fieldId);
    } else {
      setName("");
      setIsNameValid(true);
    }
    form.setFieldValue("name", e.target.value);
  };

  const afterOpenChange = useCallback((visible: boolean) => {
    if (typeof window !== "undefined") {
      if (visible) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    }
  }, []);

  const handleCreateField = useCallback(async () => {
    try {
      const request: CustomField = await form.validateFields();
      if (
        request?.extraData?.selectConfig &&
        !request?.extraData?.selectConfig?.multiple
      ) {
        request.extraData.selectConfig.multiple = false;
      }
      createCustomFieldMutation.mutate(request, {
        onSuccess: (response) => {
          pushNotify(response.message);
          queryClient.invalidateQueries({
            queryKey: ["field-definitions"],
          });
          handleClose();
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
    } catch (error: any) {
      console.error(error);
      if (error?.errorFields && !!error?.errorFields?.length) {
        const errorField = error?.errorFields?.[0];
        form.scrollToField(errorField.name, {
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleUpdateField = useCallback(async () => {
    try {
      const request: CustomField = await form.validateFields();
      const origin = customFieldQuery?.data?.data as CustomField;
      const type = origin?.type;

      if (
        JSON.stringify(
          (request?.extraData as any)?.[typeConfig[type]]?.options
        ) ===
          JSON.stringify(
            (origin?.extraData as any)?.[typeConfig[type]]?.options
          ) &&
        (request?.extraData as any)?.[typeConfig[type]]?.multiple ===
          (origin?.extraData as any)?.[typeConfig[type]]?.multiple
      ) {
        handleClose();
        return;
      }
      updateCustomFieldMutation.mutate(request, {
        onSuccess: (response) => {
          pushNotify(response.message);
          queryClient.invalidateQueries({
            queryKey: ["field-definitions"],
          });
          handleClose();
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
    } catch (error: any) {
      console.error(error);
      if (error?.errorFields && !!error?.errorFields?.length) {
        const errorField = error?.errorFields?.[0];
        form.scrollToField(errorField.name, {
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customFieldQuery?.data?.data, form]);

  const handleClickSave = () => {
    if (fieldId) {
      handleUpdateField();
      return;
    }
    handleCreateField();
  };

  return {
    form,
    name,
    customField: customFieldQuery?.data?.data,
    isNameValid,
    afterOpenChange,
    onChangeName,
    handleClose,
    handleClickSave,
    handleChangeType,
  };
};
