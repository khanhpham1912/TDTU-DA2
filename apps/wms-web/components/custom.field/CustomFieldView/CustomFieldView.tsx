
import { useTranslations } from "next-intl";

// libs
import { useQuery } from "@tanstack/react-query";

// services
import { getAllCustomFieldMappings } from "@/services/custom.field.mapping.service";
import { EEntity } from "wms-models/lib/shared";
import { renderViewField } from "../render.field";
import { PrintContent } from "@/components/Print";
import SimpleTableView from "@/components/SimpleTableView";

export const CustomFieldView = ({
  data,
  entity,
  layout = "vertical",
}: {
  data: {
    customFieldMapping?: {
      [key: string]: any;
    };
  };
  entity: EEntity;
  layout?: "horizontal" | "vertical" | "print";
}) => {
  const t = useTranslations();
  const customFieldsQuery = useQuery({
    queryKey: ["all-custom-field-mapping", entity],
    queryFn: () =>
      getAllCustomFieldMappings({
        filter: { entity },
      }),
    enabled: !!entity,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div>
      {layout !== "print" && (
        <SimpleTableView
          labelWidth={150}
          layout={layout as any}
          data={
            customFieldsQuery?.data?.data
              ?.filter((field: any) => field?.displayOnWeb)
              ?.map?.((field: any) => {
                return {
                  label: field.displayName,
                  content: (
                    <div className="font-weight-bold color-neutral-900">
                      {renderViewField(
                        {
                          ...field,
                          value: data?.customFieldMapping?.[field?._id],
                        },
                        t
                      )}
                    </div>
                  ),
                };
              }) || []
          }
        />
      )}
      {layout === "print" && (
        <PrintContent
          items={
            customFieldsQuery?.data?.data
              ?.filter((field: any) => field?.isDisplayOnDocument)
              ?.map?.((field: any) => {
                return {
                  label: field.displayName,
                  value: renderViewField(
                    {
                      ...field,
                      value: data?.customFieldMapping?.[field?._id],
                    },
                    t
                  ),
                };
              }) || []
          }
        />
      )}
    </div>
  );
};
