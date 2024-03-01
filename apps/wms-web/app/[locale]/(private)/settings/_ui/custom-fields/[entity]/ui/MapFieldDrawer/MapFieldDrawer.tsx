// components
import { Form, Row, Col, Drawer, Button, Input, Switch, Checkbox } from "antd";

// hooks
import { useTranslations } from "next-intl";

// models

// services
import { useFieldDrawer } from "../../logic";
import { EEntity } from "wms-models/lib/shared";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { FieldSelect } from "@/components";

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
                rules={[{ required: true, message: t("Please select") }]}
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
              rules={[{ required: true, message: t("Please select") }]}
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
                    <div className=" flex gap-2 pt-3 pl-6">
                      <Form.Item<CustomFieldMapping> name="required" noStyle>
                        <Switch size="small" />
                      </Form.Item>
                      <span className="text-neutral-900">{t("Required")}</span>
                    </div>
                  </Col>
                );
            }}
          </Form.Item>
          <Col xs={24} className=" mt-6">
            <Form.Item<any>
              name="isDisplayOnDocument"
              noStyle
              valuePropName="checked"
            >
              <Checkbox>{t("Display on print")}</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
