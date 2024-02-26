import styles from "./styles.module.scss";
import { ListView, Section } from "@/components/common";
import {
  GeneralForm,
  InboundItemForm,
  RemarkForm,
  TransporterForm,
  WarehouseForm,
} from "@/components/request.order/Inbound";
import { Col, Form, FormInstance, Row, Tabs, TabsProps } from "antd";
import { BaseAddress } from "base-models";
import { useTranslations } from "next-intl";

interface InboundFormProps {
  itemFormConfig: { form: FormInstance };
  remarkFormConfig: { form: FormInstance };
  generalFormConfig: {
    form: FormInstance;
    onChangeArrivalDate?: (arrivalDate: any) => void;
    onChangePol?: (address: BaseAddress) => void;
    onChangeWarehouse?: (warehouse: any) => void;
  };
  transporterFormConfig: {
    form: FormInstance;
    arrivalDate?: any;
    polAddress?: BaseAddress;
    podAddress?: BaseAddress;
  };
}

const InboundForm = ({
  itemFormConfig,
  remarkFormConfig,
  generalFormConfig,
  transporterFormConfig,
}: InboundFormProps) => {
  const t = useTranslations();

  const items: TabsProps["items"] = [
    {
      key: "GENERAL",
      label: t("General"),
      children: (
        <div className="px-16">
          <GeneralForm {...generalFormConfig} />
        </div>
      ),
    },
    {
      key: "REMARK",
      label: t("Remark"),
      children: (
        <div className="px-16 pb-16">
          <RemarkForm {...remarkFormConfig} />
        </div>
      ),
    },
  ];

  return (
    <Form.Provider>
      <div className="d-flex column h-100 gap-24">
        <InboundItemForm
          {...itemFormConfig}
          tableClassName={styles["table-wrapper"]}
        />
        <Row gutter={[24, 24]}>
          <Col md={12} xs={24} className={styles.transporter}>
            <Tabs defaultActiveKey="GENERAL" items={items} type="card" />
          </Col>
          <Col md={12} xs={24}>
            <ListView
              className={styles.transporter}
              renderHeader={
                <div className="color-secondary-500 text-700 text-body">
                  {t("TRANSPORTER")}
                </div>
              }
              renderContent={
                <TransporterForm
                  {...transporterFormConfig}
                  configView={{ xs: 12 }}
                />
              }
            />
          </Col>
        </Row>
      </div>
    </Form.Provider>
  );
};
export default InboundForm;
