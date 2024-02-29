// components
import { Form, Row, Col, Drawer, Button, Select, Input } from "antd";
import { FieldMultipleOptions } from "./FieldMultipleOptions";
import { FieldNumberOption } from "./FieldNumberOption";

// hooks
import { useTranslations } from "next-intl";
import { useFieldDrawer } from "../../logic";
import { useContext, useMemo } from "react";

// models
import { CustomField } from "tms-models/lib/custom.field";
import { ECustomFieldType } from "tms-models/lib/shared";

// utils
import { getEnumValues } from "@/utils/enum.utility";
import { required } from "@/utils/form/rules";

// configs
import { search } from "@/configs/select.config";
import { displayValue } from "common-ui/lib/utils/view.utility";
import CommonContext from "@/contexts/CommonContext";

const getCustomField = (fieldType: ECustomFieldType) => {
  switch (fieldType) {
    case ECustomFieldType.CHECKBOX:
      return <FieldMultipleOptions fieldType={fieldType} />;
    case ECustomFieldType.RADIO:
      return <FieldMultipleOptions fieldType={fieldType} />;
    case ECustomFieldType.SELECT:
      return <FieldMultipleOptions fieldType={fieldType} />;
    case ECustomFieldType.NUMBER:
      return <FieldNumberOption />;
    default:
      break;
  }
};

export const FieldDrawer = ({
  open,
  onClose,
  fieldId,
}: {
  open: boolean;
  onClose: () => void;
  fieldId?: string;
}) => {
  const t = useTranslations();
  const { modal } = useContext(CommonContext);

  const {
    form,
    name,
    customField,
    isNameValid,
    afterOpenChange,
    onChangeName,
    handleClose,
    handleClickSave,
    handleChangeType,
  } = useFieldDrawer({ onClose, modal, fieldId });

  const shouldRenderSaveButton = useMemo(() => {
    if (!customField) {
      return true;
    }
    if (
      [
        ECustomFieldType.SELECT,
        ECustomFieldType.CHECKBOX,
        ECustomFieldType.RADIO,
      ].includes(customField?.type ?? "")
    ) {
      return true;
    }
    return false;
  }, [customField]);

  return (
    <Drawer
      destroyOnClose
      title={
        <span className="text-h5 text-600">
          {!fieldId ? t("New field") : t("Update field")}
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
        <div className="d-flex justify-start gap-12">
          <Button onClick={handleClose}>{t("Close")}</Button>

          {shouldRenderSaveButton && (
            <Button type="primary" onClick={handleClickSave}>
              {t("Save")}
            </Button>
          )}
        </div>
      }
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Row>
          {!fieldId ? (
            <>
              <Col xs={24}>
                <Form.Item<CustomField>
                  name="type"
                  label={t("Type")}
                  rules={[required(t("Please select"))]}
                >
                  <Select
                    onChange={handleChangeType}
                    placeholder={t("Select")}
                    options={getEnumValues(ECustomFieldType).map((item) => {
                      return {
                        value: item,
                        label: t(item as any),
                      };
                    })}
                    {...search}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<CustomField>
                  name="name"
                  label={t("Name")}
                  {...(!isNameValid
                    ? {
                        validateStatus: "error",
                        help: t("This field already exists"),
                      }
                    : {
                        validateStatus: undefined,
                        help: t("No space, no special character"),
                      })}
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9]+$/,
                      required: true,
                      message: t("Please type"),
                    },
                  ]}
                >
                  <Input
                    value={name}
                    onChange={onChangeName}
                    placeholder={t("Enter")}
                    maxLength={120}
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Col xs={24}>
                <div className="d-flex column gap-4 pb-24">
                  <span className="color-neutral-600 text-400">
                    {`${t("Type")}:`}
                  </span>
                  <span>{t(customField?.type as any)}</span>
                </div>
              </Col>
              <Col xs={24}>
                <div className="d-flex column gap-4">
                  <span className="color-neutral-600 text-400">
                    {`${t("Name")}:`}
                  </span>
                  <span>{customField?.name}</span>
                </div>
              </Col>
            </>
          )}
          <Col xs={24}>
            <div className="d-flex column gap-4 pt-20">
              <span className="color-neutral-600 text-400">
                {`${t("System name")}:`}
              </span>
              <span>{displayValue(name)}</span>
            </div>
          </Col>

          <Form.Item<CustomField>
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.type !== curValues.type
            }
          >
            {({ getFieldValue }) => {
              const type: ECustomFieldType = getFieldValue("type");
              return <div className="w-100">{getCustomField(type)}</div>;
            }}
          </Form.Item>
        </Row>
      </Form>
    </Drawer>
  );
};
