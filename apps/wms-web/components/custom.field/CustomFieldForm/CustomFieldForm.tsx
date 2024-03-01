// components
import { Form, Row, Col } from "antd";

// libs
import { useQuery } from "@tanstack/react-query";

// services
import { getAllCustomFieldMappings } from "@/services/custom.field.mapping.service";

// configs

// hooks
import { useTranslations } from "next-intl";

// utils

// models
import { ECustomFieldType, EEntity } from "wms-models/lib/shared";
import { renderFormField } from "../render.field";
import { isEmail, isPhone } from "@/utils/rules.utility";

export const CustomFieldForm = ({
  entity,
  labelClassName,
}: {
  entity: EEntity;
  labelClassName?: string;
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
    <Row gutter={16}>
      {customFieldsQuery?.data?.data
        ?.filter((field: any) => field?.displayOnWeb)
        ?.map?.((field: any) => {
          const rules = [];
          let valuePropName = "value";
          if (field.required) {
            rules.push({ required: true, message: t("Please enter") });
          }
          const fieldType = field?.customField?.type;
          if (fieldType === ECustomFieldType.PHONE) {
            rules.push(isPhone(t("Invalid phone number")));
          } else if (fieldType === ECustomFieldType.EMAIL) {
            rules.push(isEmail(t("Invalid email address")));
          } else if (fieldType === ECustomFieldType.SWITCH) {
            valuePropName = "checked";
          }

          return (
            <Col key={field._id} xs={24}>
              <Form.Item
                name={["customFieldMapping", field._id]}
                label={
                  <div className={labelClassName}>{field.displayName}</div>
                }
                rules={rules}
                valuePropName={valuePropName}
                validateDebounce={300}
                style={{ width: "100%" }}
              >
                {renderFormField(field, t)}
              </Form.Item>
            </Col>
          );
        })}
    </Row>
  );
};
