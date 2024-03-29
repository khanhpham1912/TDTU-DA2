// services
import {
  getAllCustomFieldMappings,
  removeCustomFieldMapping,
  resortCustomField,
} from "@/services/custom.field.mapping.service";
import { pushNotify } from "@/utils/toast";

// libs
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// utils
import Fuse from "fuse.js";

// hooks
import { useTranslations } from "next-intl";
import { useCallback, useContext, useState } from "react";

// models
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { EEntity } from "wms-models/lib/shared";
import { useBoolean } from "usehooks-ts";
import CommonContext from "@/contexts/CommonContext";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const useFieldMapping = ({ entity }: { entity: EEntity }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [fields, setFields] = useState<CustomFieldMapping[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const { modal } = useContext(CommonContext);
  const t = useTranslations();
  const queryClient = useQueryClient();

  const {
    value: openDrawer,
    setTrue: onOpenDrawer,
    setFalse: onCloseDrawer,
  } = useBoolean();

  const allCustomFieldsMappingQuery = useQuery({
    queryKey: ["all-custom-field-mapping", entity],
    queryFn: () =>
      getAllCustomFieldMappings({
        filter: { entity },
      }),
    enabled: !!entity,
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (response) => {
      setFields(response?.data || []);
    },
  });

  const removeFieldMutation = useMutation({
    mutationFn: (fieldId: string) => removeCustomFieldMapping(fieldId),
    onSuccess: (response) => {
      pushNotify(response.message);
      queryClient.invalidateQueries({
        queryKey: ["all-custom-field-mapping"],
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

  const resortFieldsMutation = useMutation({
    mutationFn: (request: Partial<CustomFieldMapping>) =>
      resortCustomField(request),
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const source = result.source.index;
    const destination = result.destination.index;

    const newFields: any[] = reorder(fields, source, destination);

    const sourceId = fields[source]?._id;
    const nextId = newFields[destination + 1]?._id || null;

    setFields(newFields);

    const request: Partial<CustomFieldMapping> = {
      _id: sourceId,
      next: nextId,
    };

    resortFieldsMutation.mutate(request, {
      // onSuccess: (response) => {
      //   pushNotify(response.message);
      // },
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
  };

  const onRemoveField = (fieldId: string) => {
    modal?.confirm({
      title: (
        <span className="font-weight-500 font-16">{`${t(
          "Delete this mapping field"
        )} ?`}</span>
      ),
      icon: (
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-[#ff4d4f] mr-3 mt-1 text-base"
        />
      ),
      content: (
        <span className="color-red-500">{`${t(
          "Note: This information will be deleted permanently"
        )}.`}</span>
      ),
      cancelText: t("Cancel"),
      okText: t("Delete"),
      okButtonProps: { danger: true },
      onOk: () => removeFieldMutation.mutate(fieldId),
    });
  };

  const onClickViewDetailField = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    onOpenDrawer();
  };

  const handleCloseDrawer = () => {
    !!selectedFieldId && setSelectedFieldId("");
    onCloseDrawer();
  };

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (searchValue) {
        !isSearch && setIsSearch(true);
        const options = {
          keys: ["displayName"],
          threshold: 0.3,
        };
        const fuse = new Fuse(fields, options);

        const result = fuse.search(searchValue);
        setFields(result?.map((i) => i.item));
      } else {
        setIsSearch(false);
        setFields(allCustomFieldsMappingQuery?.data?.data ?? []);
      }
    },
    [allCustomFieldsMappingQuery?.data?.data, fields, isSearch]
  );

  return {
    fields,
    openDrawer,
    selectedFieldId,
    isSearch,
    onDragEnd,
    onRemoveField,
    onOpenDrawer,
    onClickViewDetailField,
    handleCloseDrawer,
    handleSearch,
  };
};
