// components
import { Form } from "antd";

// hooks
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import { useTranslations } from "next-intl";
// utils
import { handleOnRequestError } from "common-ui/lib/utils/request.utility";

// config
import { DEFAULT_SORT } from "common-ui/lib/configs";
import * as Papa from "papaparse";
import * as FileSaver from "file-saver";

export const useExportTable = ({
  filter,
  hardcodeFilter,
  exportConfig,
}: {
  filter: { [key: string]: any };
  hardcodeFilter?: any;
  exportConfig?: {
    mutationFn: any;
    headers: string[];
    fileName: string;
  };
}) => {
  const t = useTranslations();
  const [exportForm] = Form.useForm();
  const {
    value: openExport,
    setTrue: onOpenExport,
    setFalse: onCloseExport,
  } = useBoolean();

  const handleOpenExport = () => {
    exportForm.setFieldsValue({
      ...filter,
      ...hardcodeFilter,
    });
    onOpenExport();
  };

  const exportMutation = useMutation({
    mutationFn: (request: any) => exportConfig?.mutationFn(request),
  });

  const handleClickExport = useCallback((filter: { [key: string]: any }) => {
    exportMutation.mutate(
      { filter, sort: DEFAULT_SORT },
      {
        onSuccess: (response: any) => {
          const csv = Papa.unparse({
            fields: exportConfig?.headers || [],
            data: response?.data as any,
          });

          const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
          FileSaver.saveAs(blob, `${exportConfig?.fileName}`);
          onCloseExport();
        },
        onError: handleOnRequestError({ message: t("Export failed") }),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportLoading = useMemo(() => {
    return exportMutation.isLoading;
  }, [exportMutation.isLoading]);

  return {
    exportForm,
    openExport,
    exportLoading,
    handleOpenExport,
    onCloseExport,
    handleClickExport,
  };
};
