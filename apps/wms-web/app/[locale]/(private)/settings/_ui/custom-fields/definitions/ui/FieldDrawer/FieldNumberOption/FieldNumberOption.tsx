import { number } from "@/configs/number.config";
import { Col, Form, InputNumber, Row } from "antd";
import { useTranslations } from "next-intl";

const FieldNumberOption = () => {
  const t = useTranslations();

  return (
    <Row gutter={[16, 16]} className="pt-16">
      <Col xs={12}>
        <Form.Item label={t("Min")} name={["extraData", "numberConfig", "min"]}>
          <InputNumber placeholder={t("Enter")} className="w-100" {...number} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          shouldUpdate={(prevValues, curValues) =>
            prevValues.extraData?.numberConfig?.max !==
              curValues.extraData?.numberConfig?.max ||
            prevValues.extraData?.numberConfig?.min !==
              curValues.extraData?.numberConfig?.min
          }
          noStyle
        >
          {({}) => {
            return (
              <Form.Item
                label={t("Max")}
                name={["extraData", "numberConfig", "max"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, max) {
                      const min = getFieldValue([
                        "extraData",
                        "numberConfig",
                        "min",
                      ]);

                      if (!max || !min || min <= max) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          t("Max number must be greater than min number")
                        )
                      );
                    },
                  }),
                ]}
              >
                <InputNumber
                  placeholder={t("Enter")}
                  className="w-100"
                  {...number}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        {/* <Form.Item label={t("Max")} name={["extraData", "numberConfig", "max"]}>
          <InputNumber placeholder={t("Type")} className="w-100" />
        </Form.Item> */}
      </Col>
    </Row>
  );
};

export default FieldNumberOption;
