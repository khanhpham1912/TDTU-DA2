import {
  Button,
  Col,
  Drawer,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { useTranslations } from "next-intl";
import styles from "./styles.module.scss";
import { getEnumValues } from "@/utils/enum.utility";
import { E_PRODUCT_TYPE, E_UOM } from "@/enums";
import { Item } from "wms-models/lib/items";
import DimensionForm from "./DimensionForm";
import { number } from "@/configs/number.config";
import { disabledAfter, disabledBefore } from "@/configs/date.config";
import { DatePicker } from "@/components/DatePicker";

export default function ItemForm({
  isUpdate = false,
  form,
  open,
  onClose,
  onSubmit,
}: {
  isUpdate?: boolean;
  form: FormInstance;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const t = useTranslations();

  return (
    <Drawer
      destroyOnClose
      title={isUpdate ? t("Update item") : t("Create a new item")}
      width={712}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>{t("Cancel")}</Button>
          <Button onClick={onSubmit} type="primary">
            {t("Submit")}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" className={styles["item-form"]}>
        <Row gutter={16}>
          <Col md={12} xs={24}>
            <Form.Item<Item>
              name="name"
              label={t("Item name")}
              rules={[{ required: true, message: t("Please enter item name") }]}
            >
              <Input placeholder={t("Enter")} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="sku"
              label="SKU"
              rules={[
                { required: true, message: t("Please enter sku") },
                {
                  pattern: /^[a-zA-Z0-9-_*]+$/,
                  message: t("Only allow letters and numbers"),
                },
              ]}
            >
              <Input placeholder={t("Enter")} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="uom"
              label="UOM"
              rules={[{ required: true, message: t("Please select uom") }]}
            >
              <Select
                placeholder={t("Select")}
                options={getEnumValues(E_UOM).map((item) => {
                  return {
                    value: item,
                    label: t(item as any),
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="type"
              label={t("Product type")}
              rules={[
                { required: true, message: t("Please select product type") },
              ]}
            >
              <Select
                placeholder={t("Select")}
                options={getEnumValues(E_PRODUCT_TYPE).map((item) => {
                  return {
                    value: item,
                    label: t(item as any),
                  };
                })}
              />
            </Form.Item>
          </Col>
          {/* <Col md={12} xs={24}>
            <Form.Item name="outboundMethod" label="Outbound method">
              <Select
                placeholder={t("Select")}
                options={getEnumValues(E_OUTBOUND_METHOD).map((item) => {
                  return {
                    value: item,
                    label: item,
                  };
                })}
              />
            </Form.Item>
          </Col> */}

          <Col md={12} xs={24}>
            <Form.Item name="grossWeight" label={t("Weight")}>
              <InputNumber placeholder={t("Enter")} min={0} {...number} />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item name="productionDate" label={t("Production date")}>
              <DatePicker
                placeholder={t("Select")}
                disabledDate={disabledAfter}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="expiryDate" label={t("Expiry date")}>
              <DatePicker
                placeholder={t("Select")}
                disabledDate={disabledBefore}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="unitValue" label={t("Unit value")}>
              <InputNumber min={0} placeholder={t("Enter")} {...number} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <DimensionForm />
          </Col>
          <Col xs={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={4}
                placeholder={t("Please enter item description")}
                maxLength={200}
                showCount
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
