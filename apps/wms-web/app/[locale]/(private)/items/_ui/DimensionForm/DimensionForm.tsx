import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";

// antd
import { Col, Form, InputNumber, Row } from "antd";
import { Item } from "wms-models/lib/items";
import { number } from "@/configs/number.config";

const DimensionForm = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-2">
      <span className="title">{t("Dimension (cm)")}</span>

      <Row>
        <Col xs={8}>
          <Form.Item<Item>
            noStyle
            shouldUpdate={(prev, curr) => prev?.dimension !== curr?.dimension}
          >
            {({ getFieldValue }) => {
              const width = getFieldValue(["dimension", "width"]);
              const height = getFieldValue(["dimension", "height"]);
              return (
                <Form.Item<Item>
                  style={{ marginBottom: 0 }}
                  name={["dimension", "length"]}
                  className={styles.length}
                  // rules={[
                  //   () => ({
                  //     validator(_, _value) {
                  //       if (width || height) {
                  //         return Promise.reject(new Error(t("Please type")));
                  //       }
                  //       return Promise.resolve();
                  //     },
                  //   }),
                  // ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    placeholder="0"
                    addonAfter={t("L")}
                    {...number}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item<Item>
            noStyle
            shouldUpdate={(prev, curr) => prev?.dimension !== curr?.dimension}
          >
            {({ getFieldValue }) => {
              const length = getFieldValue(["dimension", "length"]);
              const height = getFieldValue(["dimension", "height"]);
              return (
                <Form.Item<Item>
                  style={{ marginBottom: 0 }}
                  name={["dimension", "width"]}
                  className={styles.width}
                  // rules={[
                  //   () => ({
                  //     validator(_, _value) {
                  //       if (!length || !height) {
                  //         return Promise.reject(new Error(t("Please type")));
                  //       }
                  //       return Promise.resolve();
                  //     },
                  //   }),
                  // ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    placeholder="0"
                    addonAfter={t("W")}
                    {...number}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item<Item>
            noStyle
            shouldUpdate={(prev, curr) => prev?.dimension !== curr?.dimension}
          >
            {({ getFieldValue }) => {
              const length = getFieldValue(["dimension", "length"]);
              const width = getFieldValue(["dimension", "width"]);
              return (
                <Form.Item<Item>
                  style={{ marginBottom: 0 }}
                  name={["dimension", "height"]}
                  className={styles.height}
                  // rules={[
                  //   () => ({
                  //     validator(_, _value) {
                  //       if (length || width) {
                  //         return Promise.reject(new Error(t("Please type")));
                  //       }
                  //       return Promise.resolve();
                  //     },
                  //   }),
                  // ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    placeholder="0"
                    addonAfter={t("H")}
                    {...number}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default DimensionForm;
