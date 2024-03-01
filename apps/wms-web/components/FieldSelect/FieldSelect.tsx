// components
import { Select, SelectProps } from "antd";

// services
import { getAllUnMapped } from "@/services/custom.field.service";

// utils
import { FieldDefinitionsIconMapping } from "@/utils/custom.field.utility";

// hooks
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// models
import { RefCustomField } from "wms-models/lib/custom.field.mapping/base";

// libs
import { useQuery } from "@tanstack/react-query";
import { CustomField } from "wms-models/lib/custom.field";
import { ECustomFieldType, EEntity } from "wms-models/lib/shared";

const renderItem = (item: any, t: any) => {
  return (
    <div className="d-flex gap-12 align-center">
      {FieldDefinitionsIconMapping[item.type as ECustomFieldType]}
      <div className="d-flex gap-8">
        <span className="text-body color-info">{t(item?.type as any)}</span>
        <span className="text-body color-neutral-900">{item?.name}</span>
      </div>
    </div>
  );
};

export const FieldSelect = ({
  entity,
  selectMode,
  enabled = true,
  ...props
}: {
  value?: RefCustomField;
  onChange?: (value: any) => void;
  beforeOnChange?: (value: any) => void;
  selectMode?: "single" | "object";
  entity: EEntity;
  enabled?: boolean;
} & SelectProps) => {
  const t = useTranslations();
  const [options, setOptions] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>();

  const fieldsQuery = useQuery({
    queryKey: ["field-unmapped", entity],
    queryFn: () => getAllUnMapped(entity),
    enabled,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const options: any[] =
        response?.data?.map?.((customField: any) => {
          return {
            value: customField._id,
            label: renderItem(customField, t),
          };
        }) || [];
      setOptions(options);
    },
  });

  const handleSelect = (payload: any) => {
    if (selectMode === "object") {
      const item = fieldsQuery?.data?.data?.find?.(
        (i: any) => i?._id === payload
      ) as CustomField;
      props?.onChange?.({
        _id: item?._id,
        name: item?.name,
        type: item?.type,
        extraData: item?.extraData,
      });
    } else {
      props?.onChange?.(payload);
    }
  };

  useEffect(() => {
    setSelected(props.value?._id);
  }, [props.value]);

  return (
    <Select
      options={options}
      {...props}
      // {...search}
      showSearch
      onChange={handleSelect}
      placeholder={t("Select")}
      value={selected}
      disabled={props.disabled}
    />
  );
};
