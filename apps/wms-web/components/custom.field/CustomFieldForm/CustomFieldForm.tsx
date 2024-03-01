// components
import { Form, Row, Col } from "antd";

// libs
import { useQuery } from "@tanstack/react-query";

// services
import { getAllCustomFieldMappings } from "@/services/custom.field.mapping.service";

// configs

// hooks
import { useTranslations } from "next-intl";
import { useUserInfo } from "common-ui/lib/hooks";

// utils
import { isEmail, isPhone, required } from "common-ui/lib/utils/form/rules";

// models
import { ECustomFieldType, EEntity } from "wms-models/lib/shared";
import { renderFormField } from "../render.field";

export const CustomFieldForm = ({
  entity,
  xs = 24,
  labelClassName,
}: {
  entity: EEntity;
  xs?: number;
  labelClassName?: string;
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
    <Row>
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
            <Col key={field._id} xs={xs}>
              <Form.Item
                name={["customFieldMapping", field._id]}
                label={
                  <div className={labelClassName}>{field.displayName}</div>
                }
                rules={rules}
                valuePropName={valuePropName}
                validateDebounce={300}
              >
                {renderFormField(field, t)}
              </Form.Item>
            </Col>
          );
        })}
    </Row>
  );
};
