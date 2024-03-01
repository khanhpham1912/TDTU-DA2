import { createItem, getItem, updateItem } from "@/services/items.service";
import { pushNotify } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useTranslations } from "next-intl";
import { Dispatch, useEffect } from "react";
import { useBoolean } from "usehooks-ts";
import { Item } from "wms-models/lib/items";

export default function useItemForm({
  itemId,
  setSelectedItem,
}: {
  itemId?: string;
  setSelectedItem?: Dispatch<any>;
}) {
  const {
    value: showItemForm,
    setTrue: openItemForm,
    setFalse: closeItemForm,
  } = useBoolean(false);
  const t = useTranslations();
  const [itemForm] = Form.useForm();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (itemId) {
      openItemForm();
    }
  }, [itemId]);
  useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId),
    enabled: !!itemId,
    retry: false,
    onSuccess: (response) => {
      itemForm.setFieldsValue(response?.data);
    },
  });

  const handleCloseItemForm = () => {
    itemForm.resetFields();
    setSelectedItem?.(undefined);
    closeItemForm();
  };

  const createItemMutation = useMutation({
    mutationFn: (request: Item) => createItem(request),
    onSuccess: (_response) => {
      pushNotify(t("Create successfully"));
      queryClient.invalidateQueries({
        queryKey: ["items-management"],
      });
      handleCloseItemForm();
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

  const updateItemMutation = useMutation({
    mutationFn: (request: Item) => updateItem(itemId, request),
    onSuccess: (_response) => {
      queryClient.invalidateQueries({
        queryKey: ["items-management"],
      });
      handleCloseItemForm();
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

  const handleSubmitItemForm = async () => {
    try {
      const values = await itemForm.validateFields();

      if (Object.keys(values?.dimension)?.length === 0) {
        delete values.dimension;
      }
      if (!itemId) {
        createItemMutation.mutate(values);
      } else {
        updateItemMutation.mutate(values);
      }
    } catch (error: any) {
      if (error?.errorFields && !!error?.errorFields?.length) {
        const errorField = error?.errorFields?.[0];
        itemForm.scrollToField(errorField.name, {
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  return {
    itemForm,
    showItemForm,
    openItemForm,
    handleCloseItemForm,
    handleSubmitItemForm,
  };
}
