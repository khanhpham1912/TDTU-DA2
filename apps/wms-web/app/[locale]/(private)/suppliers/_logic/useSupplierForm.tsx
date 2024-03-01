import {
  createSupplier,
  getSupplier,
  updateSupplier,
} from "@/services/suppliers.service";
import { pushNotify } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useTranslations } from "next-intl";
import { Dispatch, useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { VietQR } from "vietqr";

export default function useSupplierForm({
  supplierId,
  setSelectedSupplier,
}: {
  supplierId?: string;
  setSelectedSupplier?: Dispatch<any>;
}) {
  const {
    value: showItemForm,
    setTrue: openItemForm,
    setFalse: closeItemForm,
  } = useBoolean(false);
  const [banks, setBanks] = useState<any>();
  const t = useTranslations();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (supplierId) {
      openItemForm();
    }
  }, [supplierId]);

  const vietQR = new VietQR({
    clientID: "1d6f9aef-7df0-4004-979a-245e4cc05544",
    apiKey: "fc3f0705-773a-455b-ad66-b31a90f541d1",
  });

  useEffect(() => {
    vietQR
      .getBanks()
      .then((banks: any) => {
        setBanks(banks);
        console.log(banks);
      })
      .catch((_err: any) => {});
  }, []);
  // list banks are supported create QR code by Vietqr

  useQuery({
    queryKey: ["item", supplierId],
    queryFn: () => getSupplier(supplierId),
    enabled: !!supplierId,
    retry: false,
    onSuccess: (response) => {
      form.setFieldsValue(response?.data);
    },
  });

  const handleCloseItemForm = () => {
    form.resetFields();
    setSelectedSupplier?.(undefined);
    closeItemForm();
  };

  const createItemMutation = useMutation({
    mutationFn: (request: any) => createSupplier(request),
    onSuccess: (_response) => {
      pushNotify(t("Create successfully"));
      queryClient.invalidateQueries({
        queryKey: ["supplier-management"],
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
    mutationFn: (request: any) => updateSupplier(supplierId, request),
    onSuccess: (_response) => {
      pushNotify(t("Update successfully"));
      queryClient.invalidateQueries({
        queryKey: ["supplier-management"],
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
      const values = await form.validateFields();

      if (!supplierId) {
        createItemMutation.mutate(values);
      } else {
        updateItemMutation.mutate(values);
      }
    } catch (error: any) {
      if (error?.errorFields && !!error?.errorFields?.length) {
        const errorField = error?.errorFields?.[0];
        form.scrollToField(errorField.name, {
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  return {
    form,
    showItemForm,
    openItemForm,
    handleCloseItemForm,
    handleSubmitItemForm,
  };
}
