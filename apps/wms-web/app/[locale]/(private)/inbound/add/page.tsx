"use client";
// styles
import classNames from "classnames";
import styles from "./styles.module.scss";

// components
import { Col, Form, Row, Spin } from "antd";

// hooks
import { useTranslations } from "next-intl";
import useInboundForm from "./logic/useInboundForm";
import { PostList } from "@/components/PostList";
import { getItems } from "@/services/items.service";
import { Item } from "wms-models/lib/items";
import { useRef } from "react";
import EditTable from "@/components/EditTable";
import { InboundOrder } from "wms-models/lib/inbound";
import { displayNumber } from "@/utils/display.utility";

const CreateInboundOrder = () => {
  const t = useTranslations();
  const tableRef: any = useRef();
  const { form, handleAddItem, formColumns } = useInboundForm();

  return (
    <div className="app-content">
      <Form form={form} className="w-full">
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
                      <Form.Item<InboundOrder>
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
                            totalWeight += Number(
                              displayNumber(item?.grossWeight)
                            );
                            totalValue += Number(
                              displayNumber(item?.unitValue)
                            );
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
                                    <td>{t("Total gross weight (kg)")}</td>
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
      </Form>
    </div>
  );
};
export default CreateInboundOrder;