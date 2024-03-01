import {
  createCustomFieldMapping,
  getCustomFieldMapping,
  updateCustomFieldMapping,
} from "@/services/custom.field.mapping.service";
import { pushNotify } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { EEntity } from "wms-models/shared";

export const useFieldDrawer = ({
  fieldId,
  entity,
  onClose,
}: {
  fieldId?: string;
  onClose: () => void;
  entity: EEntity;
}) => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const fieldMappingQuery = useQuery({
    queryKey: ["field-mapping-detail", fieldId],
    queryFn: () => getCustomFieldMapping(fieldId as string),
    enabled: !!fieldId,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      form.setFieldsValue(response?.data);
    },
  });

  const afterOpenChange = useCallback((visible: boolean) => {
    if (typeof window !== "undefined") {
      if (visible) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    }
  }, []);

  const createFiledMappingMutation = useMutation({
    mutationFn: (request: Partial<CustomFieldMapping>) =>
      createCustomFieldMapping({ ...request, entity }),
  });

  const handleCreateFieldMapping = useCallback(async () => {
    try {
      const request: CustomFieldMapping = await form.validateFields();
      createFiledMappingMutation.mutate(request, {
        onSuccess: (response) => {
          pushNotify(response.message);
          queryClient.invalidateQueries({
            queryKey: ["all-custom-field-mapping"],
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
  }, []);

  const updateFiledMappingMutation = useMutation({
    mutationFn: (request: Partial<CustomFieldMapping>) =>
      updateCustomFieldMapping(fieldId as string, request),
  });

  const handleUpdateFieldMapping = useCallback(() => {
    const request: CustomFieldMapping = form.getFieldsValue();
    updateFiledMappingMutation.mutate(request, {
      onSuccess: (response) => {
        pushNotify(response.message);
        queryClient.invalidateQueries({
          queryKey: ["all-custom-field-mapping"],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSave = () => {
    if (fieldId) {
      handleUpdateFieldMapping();
      return;
    }
    handleCreateFieldMapping();
  };
  return {
    fieldMapping: fieldMappingQuery?.data?.data,
    form,
    handleClose,
    afterOpenChange,
    handleClickSave,
  };
};
