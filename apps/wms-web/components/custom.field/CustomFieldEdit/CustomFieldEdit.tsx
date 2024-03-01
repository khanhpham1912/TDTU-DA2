import { getAllCustomFieldMappings } from "@/services/custom.field.mapping.service";
import { useQuery } from "@tanstack/react-query";
import { Row, Col } from "antd";
import { useUserInfo } from "common-ui/lib/hooks";
import { required, isPhone, isEmail } from "common-ui/lib/utils/form/rules";
import { useTranslations } from "next-intl";
import { ECustomFieldType, EEntity } from "wms-models/lib/shared";
import { CustomFieldInplace } from "./CustomFieldInplace";
import { renderFormField, renderViewField } from "../render.field";
import { PartialDeep } from "wareflex-utils/lib/types";
import { Picklist } from "wms-models/lib/picklist";

export const CustomFieldEdit = ({
  entity,
  xs = 24,
  data,
  labelClassName,
  onSubmit,
  allowEdit = true,
}: {
  allowEdit?: boolean;
  entity: EEntity;
  xs?: number;
  data?: PartialDeep<Picklist>;
  labelClassName?: string;
  onSubmit: (request: any, callback?: Function) => void;
}) => {
  const t = useTranslations();
  const { userInfo } = useUserInfo();
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
    <Row gutter={[16, 16]} className="pb-48">
      {customFieldsQuery?.data?.data
        ?.filter((field) => field?.displayOnWeb)
        ?.map?.((field) => {
          const rules = [];
          let valuePropName = "value";
          if (field.required) {
            rules.push(required(t("Please enter")));
          }
          const fieldType = field?.customField?.type;
          if (fieldType === ECustomFieldType.PHONE) {
            rules.push(isPhone(t("Invalid phone number")));
          } else if (fieldType === ECustomFieldType.EMAIL) {
            rules.push(isEmail(t("Invalid email address")));
          } else if (fieldType === ECustomFieldType.SWITCH) {
            valuePropName = "checked";
          } else if (fieldType === ECustomFieldType.ATTACHMENT) {
            let attachmentConfig =
              field?.customField?.extraData?.attachmentConfig || {};
            attachmentConfig = {
              ...attachmentConfig,
              filePath: `/users/${userInfo?._id}/custom-field/${entity}`,
            };
            field.customField.extraData = { attachmentConfig };
          }

          return (
            <Col key={field._id} xs={xs} style={{ minHeight: "fit-content" }}>
              <CustomFieldInplace
                fieldName={["customFieldMapping", field._id]}
                initValue={data}
                field={field}
                allowEdit={allowEdit}
                formContent={renderFormField(field, t)}
                viewContent={renderViewField(
                  {
                    ...field,
                    value: data?.customFieldMapping?.[field?._id],
                  },
                  t
                )}
                labelClassName={labelClassName}
                valuePropName={valuePropName}
                rules={rules}
                onSubmit={onSubmit}
              />
            </Col>
          );
        })}
    </Row>
  );
};
