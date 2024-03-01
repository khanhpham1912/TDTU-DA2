// components
import { Form, Row, Col, Drawer, Button, Select, Input } from "antd";
import { FieldMultipleOptions } from "./FieldMultipleOptions";
import { FieldNumberOption } from "./FieldNumberOption";

// hooks
import { useTranslations } from "next-intl";
import { useFieldDrawer } from "../../logic";
import { useMemo } from "react";

// models

import { ECustomFieldType } from "wms-models/lib/shared";
import { CustomField } from "wms-models/lib/custom.field";
import { getEnumValues } from "@/utils/enum.utility";
import { displayValue } from "@/utils/display.utility";

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
  } = useFieldDrawer({ onClose, fieldId });

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
        <span className=" text-base font-semibold">
          {!fieldId ? t("New field") : t("Update field")}
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
        <div className="flex justify-end gap-2">
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
                  rules={[{ required: true, message: t("Please select") }]}
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
                <div className="flex flex-col gap-1 pb-5">
                  <span className="text-gray-600 font-normal">
                    {`${t("Type")}:`}
                  </span>
                  <span>{t(customField?.type as any)}</span>
                </div>
              </Col>
              <Col xs={24}>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-600 font-normal">
                    {`${t("Name")}:`}
                  </span>
                  <span>{customField?.name}</span>
                </div>
              </Col>
            </>
          )}
          <Col xs={24}>
            <div className="flex flex-col gap-1 pt-5">
              <span className="text-gray-600 font-normal">
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
              return <div className="w-full">{getCustomField(type)}</div>;
            }}
          </Form.Item>
        </Row>
      </Form>
    </Drawer>
  );
};
