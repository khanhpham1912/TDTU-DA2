import {
  Button,
  Col,
  Drawer,
  Form,
  FormInstance,
  Input,
  Row,
  Space,
} from "antd";
import { useTranslations } from "next-intl";
import styles from "./styles.module.scss";

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
      title={isUpdate ? t("Update supplier") : t("Create a new supplier")}
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
          <Col xs={24}>
            <Form.Item
              name={["general", "companyName"]}
              label={t("Supplier name")}
              rules={[{ required: true, message: t("Please enter") }]}
            >
              <Input placeholder={t("Enter")} maxLength={100} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name={["contact", "name"]} label={t("Contact name")}>
              <Input placeholder={t("Enter")} maxLength={100} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name={["contact", "phone"]} label={t("Contact phone")}>
              <Input placeholder={t("Enter")} maxLength={100} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name={["general", "officeAddress"]}
              label={t("Contact address")}
            >
              <Input placeholder={t("Enter")} maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
