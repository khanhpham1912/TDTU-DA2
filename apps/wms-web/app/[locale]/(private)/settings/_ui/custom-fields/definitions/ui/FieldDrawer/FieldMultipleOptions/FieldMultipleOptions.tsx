import CommonContext from "@/contexts/CommonContext";
import { typeConfig } from "@/utils/custom.field.utility";
import { PlusOutlined } from "@ant-design/icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Switch } from "antd";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { ECustomFieldType } from "wms-models/lib/shared";

const FieldMultipleOptions = ({
  fieldType,
}: {
  fieldType: ECustomFieldType;
}) => {
  const t = useTranslations();
  const { modal } = useContext(CommonContext);

  const onRemoveOption = (remove: Function) => {
    modal?.confirm({
      title: (
        <span className=" font-medium text-base">{`${t(
          "Delete this option"
        )} ?`}</span>
      ),
      icon: (
        <FontAwesomeIcon
          icon={faTrashCan}
          className="color-[#ff4d4f] mr-4 mt-1"
        />
      ),
      cancelText: t("Cancel"),
      okText: t("Delete"),
      okButtonProps: { danger: true },
      onOk: () => remove(),
    });
  };

  return (
    <div className=" flex flex-col gap-6 pt-5">
      {fieldType === ECustomFieldType.SELECT && (
        <div className="flex gap-2 items-center">
          <Form.Item
            noStyle
            name={["extraData", "selectConfig", "multiple"]}
            valuePropName="checked"
          >
            <Switch size="small" />
          </Form.Item>
          <span className="text-gray-900 font-normal">
            {t("Multiple selection")}
          </span>
        </div>
      )}
      <div>
        <Form.List name={["extraData", typeConfig[fieldType], "options"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div className="flex gap-2 justify-between items-center">
                  <Form.Item
                    {...field}
                    className="w-[90%]"
                    label={`${t("Option")} ${index + 1}`}
                    rules={[{ required: true, message: t("Please type") }]}
                  >
                    <Input
                      placeholder={t("Enter")}
                      className="w-full"
                      maxLength={120}
                    />
                  </Form.Item>
                  {index !== 0 ? (
                    <span
                      className="material-symbols-outlined text-[#ff4d4f] cursor-pointer"
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
              <Form.Item className=" flex justify-center">
                <Button
                  type="primary"
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
