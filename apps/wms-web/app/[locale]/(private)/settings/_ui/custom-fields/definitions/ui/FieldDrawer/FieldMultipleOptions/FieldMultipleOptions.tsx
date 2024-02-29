import CommonContext from "@/contexts/CommonContext";
import { typeConfig } from "@/utils/customField.utility";
import { required } from "@/utils/form/rules";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Switch } from "antd";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { ECustomFieldType } from "tms-models/lib/shared";

const FieldMultipleOptions = ({
  fieldType,
}: {
  fieldType: ECustomFieldType;
}) => {
  const t = useTranslations();
  const { modal } = useContext(CommonContext);

  const onRemoveOption = (remove: Function) => {
    modal?.delete({
      title: (
        <span className="font-weight-500 font-16">{`${t(
          "Delete this option"
        )} ?`}</span>
      ),
      cancelText: t("Cancel"),
      okText: t("Delete"),
      okButtonProps: { danger: true },
      onOk: () => remove(),
    });
  };

  return (
    <div className="d-flex column gap-24 pt-20">
      {fieldType === ECustomFieldType.SELECT && (
        <div className="d-flex gap-8 align-center">
          <Form.Item
            noStyle
            name={["extraData", "selectConfig", "multiple"]}
            valuePropName="checked"
          >
            <Switch size="small" />
          </Form.Item>
          <span className="color-character-primary text-400">
            {t("Multiple selection")}
          </span>
        </div>
      )}
      <div>
        <Form.List name={["extraData", typeConfig[fieldType], "options"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div className="d-flex gap-8 justify-space-between align-center">
                  <Form.Item
                    {...field}
                    className="w-90"
                    label={`${t("Option")} ${index + 1}`}
                    rules={[required(t("Please type"))]}
                  >
                    <Input
                      placeholder={t("Enter")}
                      className="w-100"
                      maxLength={120}
                    />
                  </Form.Item>
                  {index !== 0 ? (
                    <span
                      className="material-symbols-outlined color-danger pointer"
                      onClick={() => {
                        onRemoveOption(() => {
                          remove(field.name);
                        });
                      }}
                    >
                      delete
                    </span>
                  ) : null}
                </div>
              ))}
              <Form.Item className="d-flex justify-center">
                <Button
                  type="primary"
                  // className="bg-color-secondary"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  {t("Add")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
};

export default FieldMultipleOptions;
