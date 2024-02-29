// components
import { Form, Row, Col, Drawer, Button, Input, Switch, Checkbox } from "antd";
import { FieldSelect } from "@/components/common";

// hooks
import { useTranslations } from "next-intl";

// models
import { CustomFieldMapping } from "tms-models/lib/custom.field.mapping";
import { EEntity } from "tms-models/shared";

// utils
import { required } from "@/utils/form/rules";

// services
import { useFieldDrawer } from "../../logic";

export const MapFieldDrawer = ({
  open,
  onClose,
  entity,
  fieldId,
}: {
  open: boolean;
  onClose: () => void;
  entity: EEntity;
  fieldId?: string;
}) => {
  const t = useTranslations();

  const { form, fieldMapping, handleClose, afterOpenChange, handleClickSave } =
    useFieldDrawer({ fieldId, entity, onClose });

  return (
    <Drawer
      title={
        <span className="text-h5 text-600">
          {!fieldId ? t("Map field") : t("Update map field")}
        </span>
      }
      placement="right"
      onClose={handleClose}
      open={open}
      afterOpenChange={afterOpenChange}
      width={416}
      bodyStyle={{ padding: 16 }}
      style={{ borderRadius: 4 }}
      contentWrapperStyle={{
        padding: 8,
        boxShadow: "none",
      }}
      footer={
        <div className="d-flex justify-end gap-12">
          <Button onClick={handleClose}>{t("Close")}</Button>
          <Button type="primary" onClick={handleClickSave}>
            {t("Save")}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="FORM_MAP_FIELD"
        initialValues={{
          displayOnWeb: true,
          displayOnMobile: false,
          required: false,
          isAllowMobileModified: false,
        }}
      >
        <Row>
          {fieldId ? (
            <Col xs={24}>
              <div className="d-flex column gap-4 pb-24">
                <span className="color-neutral-600 text-400">
                  {`${t("Field")}:`}
                </span>
                <span>{fieldMapping?.customField?.name}</span>
              </div>
            </Col>
          ) : (
            <Col xs={24}>
              <Form.Item<CustomFieldMapping>
                name="customField"
                label={t("Field")}
                rules={[required(t("Please select"))]}
              >
                <FieldSelect
                  entity={entity}
                  selectMode="object"
                  enabled={open}
                />
              </Form.Item>
            </Col>
          )}
          <Col xs={24}>
            <Form.Item<CustomFieldMapping>
              name="displayName"
              label={t("Display name")}
              rules={[required(t("Please select"))]}
            >
              <Input placeholder={t("Type")} maxLength={120} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item<CustomFieldMapping>
              name="displayOnWeb"
              noStyle
              valuePropName="checked"
            >
              <Checkbox>{t("Display on web")}</Checkbox>
            </Form.Item>
          </Col>
          <Form.Item<CustomFieldMapping>
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.displayOnWeb !== curValues.displayOnWeb
            }
          >
            {({ getFieldValue }) => {
              const displayOnWeb: boolean = getFieldValue("displayOnWeb");
              if (displayOnWeb)
                return (
                  <Col xs={24}>
                    <div className="d-flex gap-8 pt-12 pl-24">
                      <Form.Item<CustomFieldMapping> name="required" noStyle>
                        <Switch size="small" />
                      </Form.Item>
                      <span className="color-neutral-900">{t("Required")}</span>
                    </div>
                  </Col>
                );
            }}
          </Form.Item>

          <Col xs={24} className="mt-24">
            <Form.Item<CustomFieldMapping>
              name="displayOnMobile"
              noStyle
              valuePropName="checked"
            >
              <Checkbox>{t("Display on mobile")}</Checkbox>
            </Form.Item>
          </Col>
          <Form.Item<CustomFieldMapping>
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.displayOnMobile !== curValues.displayOnMobile
            }
          >
            {({ getFieldValue }) => {
              const displayOnMobile: boolean = getFieldValue("displayOnMobile");
              if (displayOnMobile)
                return (
                  <Col xs={24}>
                    <div className="d-flex gap-8 pt-12 pl-24">
                      <Form.Item<CustomFieldMapping>
                        name="isAllowMobileModified"
                        noStyle
                        valuePropName="checked"
                      >
                        <Switch size="small" />
                      </Form.Item>
                      <span className="color-neutral-900">
                        {t("Allow driver update")}
                      </span>
                    </div>
                  </Col>
                );
            }}
          </Form.Item>
        </Row>
      </Form>
    </Drawer>
  );
};
