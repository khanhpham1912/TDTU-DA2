"use client";
// styles
import styles from "./styles.module.scss";
// components
import { Button, Col, Form, Input, Row } from "antd";

// hooks
import { useTranslations } from "next-intl";
import { PostList } from "@/components/PostList";
import { getItems } from "@/services/items.service";
import { Item } from "wms-models/lib/items";
import { useRef } from "react";
import EditTable from "@/components/EditTable";
import { OutboundOrder } from "wms-models/lib/outbound.order";
import { displayNumber } from "@/utils/display.utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faCar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import useOutboundForm from "./_logic";

const CreateOutboundOrder = () => {
  const t = useTranslations();
  const tableRef: any = useRef();
  const { form, handleAddItem, formColumns, handleCreateOutbound } =
    useOutboundForm();
  const { push } = useRouter();
  return (
    <div className="app-content">
      <div className="flex justify-between pb-4">
        <span className=" text-gray-900 font-semibold text-2xl">
          {t("New outbound order")}
        </span>
        <div className="flex gap-2">
          <Button onClick={() => push("/outbound")}>{t("Cancel")}</Button>
          <Button type="primary" onClick={handleCreateOutbound}>
            {t("Save")}
          </Button>
        </div>
      </div>
      <Form form={form} className="w-full" layout="vertical">
        <Row gutter={16}>
          <Col xs={8}>
            <PostList
              searchPlaceholder={t("Search")}
              queryConfig={{
                queryKey: "items-management",
                queryFn: getItems,
              }}
              renderItem={(item: Item) => {
                return (
                  <div
                    key={item._id}
                    className={styles.item}
                    onClick={() => {
                      handleAddItem(item, tableRef?.current?.onAdd);
                    }}
                  >
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <span className=" text-gray-900 text-sm">
                          {item?.name}
                        </span>
                        <span className="text-blue-500 text-xs">
                          {item?.sku}
                        </span>
                      </div>
                    </div>

                    <div
                      className=" text-indigo-600 text-xs"
                      style={{ fontStyle: "italic" }}
                    >
                      {`UOM: ${t(item?.uom as any)}`}
                    </div>
                  </div>
                );
              }}
            />
          </Col>

          <Col xs={16}>
            <div className={styles["items-form"]}>
              <EditTable
                ref={tableRef}
                name={["items"]}
                tableClassName={styles["table-wrapper"]}
                columns={formColumns as any}
                rules={[
                  {
                    validator: async (_: any, names: any) => {
                      if (!names || names.length === 0) {
                        return Promise.reject(
                          new Error(t("Add at least 1 item"))
                        );
                      }
                    },
                  },
                ]}
                footer={({}) => {
                  return (
                    <div className="flex-1 d-flex column justify-end">
                      <Form.Item<OutboundOrder>
                        noStyle
                        shouldUpdate={(prev, current) => {
                          return prev?.items !== current?.items;
                        }}
                      >
                        {({ getFieldValue }) => {
                          const items: any[] = getFieldValue("items") || [];
                          const totalCount: any = {};
                          let totalWeight = 0;
                          let totalValue = 0;

                          items.map((item) => {
                            if (Object.keys(totalCount).includes(item?.uom)) {
                              totalCount[item.uom] += item?.itemCount;
                            } else {
                              totalCount[item.uom] = item?.itemCount;
                            }
                            totalWeight +=
                              (item?.grossWeight ?? 0) * (item?.itemCount ?? 0);
                            totalValue +=
                              (item?.unitValue ?? 0) * (item?.itemCount ?? 0);
                          });
                          return (
                            <div className={styles.summary}>
                              <table>
                                <tbody>
                                  <tr>
                                    <td>{t("Total count")}</td>
                                    <td>
                                      {Object.keys(totalCount)?.length === 0 ? (
                                        <span>0</span>
                                      ) : (
                                        Object.entries(totalCount)
                                          ?.map(
                                            (entry: any) =>
                                              `${displayNumber(entry[1])} ${t(
                                                entry[0] as any
                                              )}`
                                          )
                                          .join(", ")
                                      )}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>{t("Total weight (kg)")}</td>
                                    <td>{displayNumber(totalWeight)}</td>
                                  </tr>

                                  <tr>
                                    <td>{t("Total unit value (VND)")}</td>
                                    <td>{displayNumber(totalValue)}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          );
                        }}
                      </Form.Item>
                    </div>
                  );
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16} className="mt-6">
          <Col xs={12}>
            <div className="flex flex-col gap-4 border border-gray-200 border-solid rounded-lg p-4">
              <span className="text-indigo-600 text-lg font-bold">
                {t("General")}
              </span>
              <div className="flex flex-col">
                {/* <Form.Item<OutboundOrder>
                  name={["arrivalTime"]}
                  label={t("Delivery time")}
                >
                  <DatePicker/>
                </Form.Item> */}
                <Form.Item<OutboundOrder>
                  name={["remark"]}
                  label={t("Remark")}
                  style={{ marginBottom: 4 }}
                >
                  <Input.TextArea
                    className={styles.input}
                    placeholder={t("Enter")}
                    maxLength={200}
                    showCount
                  />
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col xs={12}>
            <div className=" flex flex-col gap-4 border border-gray-200 border-solid rounded-lg p-4">
              <span className=" text-indigo-600 text-lg font-bold">
                {t("Transporter")}
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-gray-900">{t("Shipper")}</span>
                <Form.Item<OutboundOrder>
                  name={["shipper", "shipperName"]}
                  style={{ marginBottom: 4 }}
                >
                  <Input
                    className={styles.input}
                    placeholder={t("Name")}
                    prefix={
                      <FontAwesomeIcon
                        icon={faUser}
                        className=" text-gray-400"
                        style={{ fontSize: 16 }}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item<OutboundOrder>
                  name={["shipper", "shipperPhone"]}
                  rules={[
                    {
                      pattern: /^[0-9]{10}$/,
                      message: t("Invalid phone number"),
                    },
                  ]}
                  style={{ marginBottom: 4 }}
                >
                  <Input
                    className={styles.input}
                    placeholder={t("Phone")}
                    prefix={
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-gray-400"
                        style={{ fontSize: 16 }}
                      />
                    }
                    maxLength={10}
                  />
                </Form.Item>
                <Form.Item<OutboundOrder>
                  label={t("License plates")}
                  name={["shipper", "shipperLicense"]}
                >
                  <Input
                    placeholder={t("License plates")}
                    prefix={
                      <FontAwesomeIcon
                        icon={faCar}
                        className="text-gray-400"
                        style={{ fontSize: 16 }}
                      />
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CreateOutboundOrder;
