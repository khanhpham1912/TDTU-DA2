import CommonContext from "@/contexts/CommonContext";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
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
import { useContext } from "react";
import styles from "./styles.module.scss";
import { getEnumValues } from "@/utils/enum.utility";
import { E_OUTBOUND_METHOD, E_PRODUCT_TYPE, E_UOM } from "@/enums";
import dayjs from "dayjs";

export default function ItemForm({
  title,
  form,
  open,
  onClose,
  onSubmit,
}: {
  title?: string;
  form: FormInstance;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const t = useTranslations();
  const { modal } = useContext(CommonContext);

  const disabledBefore: DatePickerProps["disabledDate"] = (current) => {
    return current < dayjs().startOf("day");
  };

  const disabledAfter: DatePickerProps["disabledDate"] = (current) => {
    return current > dayjs().endOf("day");
  };
  return (
    <Drawer
      destroyOnClose
      title={title ?? t("Create a new item")}
      width={720}
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
            <Form.Item
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
              rules={[{ required: true, message: t("Please enter sku") }]}
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
          <Col md={12} xs={24}>
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
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="grossWeight" label={t("Weight")}>
              <InputNumber placeholder={t("Enter")} min={0} />
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
