import { InplaceItem } from "@/components/common";
import { useCustomFieldInplace } from "./useCustomFieldInplace";
import { Form } from "antd";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
export const CustomFieldInplace = ({
  fieldName,
  initValue,
  field,
  formContent,
  viewContent,
  labelClassName,
  valuePropName,
  rules,
  onSubmit,
  allowEdit = true,
  layout = "vertical",
}: {
  allowEdit?: boolean;
  fieldName: any;
  field: CustomFieldMapping;
  initValue: any;
  onSubmit: (request: any, callback?: Function) => void;
  labelClassName?: string;
  formContent?: ReactNode;
  viewContent?: ReactNode;
  valuePropName?: string;
  rules?: any[];
  layout?: "vertical" | "horizontal";
}) => {
  const [form] = Form.useForm();
  const { inplaceProps, handleClickOk } = useCustomFieldInplace({
    form,
    initValue,
    onSubmit,
  });
  return (
    <div
      className={classNames(
        "d-flex",
        layout === "vertical" ? "column" : "gap-8"
      )}
    >
      <div className={labelClassName}>{`${field.displayName}:`}</div>
      <InplaceItem
        name={fieldName}
        isEditing={
          JSON.stringify(inplaceProps.editField) === JSON.stringify(fieldName)
        }
        allowEdit={allowEdit}
        onStartEdit={inplaceProps.onStartEdit}
        onCancel={inplaceProps.onClickCancel}
        onOk={handleClickOk}
        renderForm={
          <div className={styles.inplace}>
            <Form form={form}>
              <Form.Item
                name={["customFieldMapping", field._id]}
                rules={rules}
                valuePropName={valuePropName}
                validateDebounce={300}
              >
                {formContent}
              </Form.Item>
            </Form>
          </div>
        }
        renderView={
          <div
            className="font-weight-bold color-neutral-900"
            style={{ minHeight: 22 }}
          >
            {viewContent}
          </div>
        }
      />
    </div>
  );
};
