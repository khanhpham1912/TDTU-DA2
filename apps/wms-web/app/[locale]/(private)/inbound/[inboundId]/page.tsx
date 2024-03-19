"use client";

import EditTable from "@/components/EditTable";
import { getInbound, updateInbound } from "@/services/inbounds.service";
import {
  displayDateTime,
  displayNumber,
  displayValue,
} from "@/utils/display.utility";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Row, Table, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { InboundOrder, InboundOrderItem } from "wms-models/lib/inbound";
import { EEntity, EStatus } from "wms-models/lib/shared";
import { useInbound } from "./_logic";
import CommonContext from "@/contexts/CommonContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { CustomFieldView } from "@/components/custom.field";
import { Status } from "@/components/Status";
import { PrintInboundModal } from "../_ui";
import { useBoolean } from "usehooks-ts";

const RowView = ({ title, content }: { title: string; content?: string }) => {
  return (
    <div className="flex justify-between text-sm">
      <span className=" font-normal text-gray-500 mr-2">
        {displayValue(title)}
      </span>
      <Tooltip title={content} mouseEnterDelay={0.5}>
        <span
          className=" font-semibold text-gray-600 flex-1"
          style={{ textAlign: "right", wordBreak: "break-all" }}
        >
          {content}
        </span>
      </Tooltip>
    </div>
  );
};

export default function InboundDetail() {
  const t = useTranslations();
  const tableRef: any = useRef();
  const { push } = useRouter();
  const params = useParams();
  const inboundId = params?.inboundId as string;
  const [isEnterQuantity, setIsEnterQuantity] = useState(false);
  const { formColumns, tableColumns } = useInbound();
  const [form] = Form.useForm();
  const { modal } = useContext(CommonContext);
  const queryClient = useQueryClient();
  const {
    value: showPrint,
    setTrue: openPrint,
    setFalse: closePrint,
  } = useBoolean(false);

  const inboundDetailQuery = useQuery({
    queryKey: ["inbound-detail", inboundId],
    queryFn: () => getInbound(inboundId),
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      form.setFieldsValue(response?.data);
    },
  });

  const cancelConfirm = () => {
    form.resetFields();
    setIsEnterQuantity(false);
  };
  const handleCancelConfirm = () => {
    const formItemValue = form.getFieldValue("items");
    if (
      JSON.stringify(formItemValue) !==
      JSON.stringify(inboundDetailQuery?.data?.data?.items)
    ) {
      modal?.confirm({
        title: (
          <span className="text-gray-900 font-medium text-base">
            {t("Recent updates have not been saved")}
          </span>
        ),
        icon: <ExclamationCircleOutlined />,
        cancelText: t("No"),
        okText: t("Yes"),
        okButtonProps: { type: "primary" },
        onOk: cancelConfirm,
      });
    } else {
      cancelConfirm();
    }
  };
  const updateInboundMutation = useMutation({
    mutationFn: (request: any) => updateInbound(inboundId, request),
    onSuccess: (response) => {
      queryClient.setQueryData(["inbound-detail", inboundId], response);
      cancelConfirm();
    },
  });

  const handleConfirmQuantity = async () => {
    try {
      const values = await form.validateFields();

      updateInboundMutation.mutate({ ...values, status: EStatus.COMPLETED });
    } catch (error: any) {
      if (error?.errorFields && !!error?.errorFields?.length) {
        const errorField = error?.errorFields?.[0];
        form.scrollToField(errorField.name, {
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleProcessInbound = () => {
    updateInboundMutation.mutate({ status: EStatus.INPROGRESS });
  };

  const tableSummaryRender = () => {
    const totalCount: any = {};
    let totalWeight = 0;
    let totalValue = 0;

    inboundDetailQuery?.data?.data?.items.map((item: InboundOrderItem) => {
      if (Object.keys(totalCount).includes(item?.uom)) {
        totalCount[item.uom] += item?.itemCount;
      } else {
        totalCount[item.uom] = item?.itemCount;
      }
      totalWeight += (item?.grossWeight ?? 0) * (item?.itemCount ?? 0);
      totalValue += (item?.unitValue ?? 0) * (item?.itemCount ?? 0);
    });
    return (
      <div className={styles["table-summary"]}>
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
                        `${displayNumber(entry[1])} ${t(entry[0] as any)}`
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
  };

  return (
    <div className="flex box-border overflow-y-auto flex-grow">
      <div className="bg-white min-w-96 max-w-96 relative">
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-2">
            <span className=" text-indigo-600 text-lg font-bold">
              {t("General information")}
            </span>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <RowView
                  title={t("Arrival time")}
                  content={displayDateTime(
                    inboundDetailQuery?.data?.data?.arrivalTime
                  )}
                />
              </Col>
              <Col xs={24}>
                <RowView
                  title={t("Remark")}
                  content={displayValue(inboundDetailQuery?.data?.data?.remark)}
                />
              </Col>
            </Row>
          </div>
          <div className="flex flex-col gap-2">
            <span className=" text-indigo-600 text-lg font-bold">
              {t("Transporter")}
            </span>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <RowView
                  title={t("Shipper name")}
                  content={displayValue(
                    inboundDetailQuery?.data?.data?.shipper?.shipperName
                  )}
                />
              </Col>
              <Col xs={24}>
                <RowView
                  title={t("Shipper phone")}
                  content={displayValue(
                    inboundDetailQuery?.data?.data?.shipper?.shipperPhone
                  )}
                />
              </Col>
              <Col xs={24}>
                <RowView
                  title={t("License plates")}
                  content={displayValue(
                    inboundDetailQuery?.data?.data?.shipper?.shipperLicense
                  )}
                />
              </Col>
            </Row>
          </div>
          <div className="flex flex-col gap-2">
            <span className=" text-indigo-600 text-lg font-bold">
              {t("Additional info")}
            </span>
            <CustomFieldView
              entity={EEntity.Inbound}
              layout="horizontal"
              data={{
                customFieldMapping:
                  inboundDetailQuery?.data?.data?.customFieldMapping,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-between overflow-x-auto overflow-y-hidden box-border bg-gray-100">
        <div className="app-content">
          <div className="flex justify-between pb-4 text-indigo-600">
            <div className="flex items-center gap-2">
              <span className=" text-neutral-900 font-bold text-2xl">
                #{inboundDetailQuery?.data?.data?.no}
              </span>
              <Status
                text={t(inboundDetailQuery?.data?.data?.status as any)}
                colorKey={inboundDetailQuery?.data?.data?.status}
              />
            </div>
            <div className="flex gap-2">
              {inboundDetailQuery?.data?.data?.status !== EStatus.NEW && (
                <Button ghost type="primary" onClick={openPrint}>
                  {t("Print")}
                </Button>
              )}
              {!isEnterQuantity &&
                inboundDetailQuery?.data?.data?.status ===
                  EStatus.INPROGRESS && (
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsEnterQuantity(true);
                      form.setFieldsValue(inboundDetailQuery?.data?.data);
                    }}
                  >
                    {t("Confirm item quantity")}
                  </Button>
                )}

              {inboundDetailQuery?.data?.data?.status === EStatus.NEW && (
                <>
                  <Button ghost type="primary" onClick={handleProcessInbound}>
                    {t("Print & Process")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => push(`/inbound/${inboundId}/edit`)}
                  >
                    {t("Edit")}
                  </Button>
                </>
              )}
              {isEnterQuantity && (
                <>
                  <Button onClick={handleCancelConfirm}>{t("Cancel")}</Button>
                  <Button type="primary" onClick={handleConfirmQuantity}>
                    {t("Confirm")}
                  </Button>
                </>
              )}
            </div>
          </div>
          {isEnterQuantity ? (
            <Form form={form}>
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
            </Form>
          ) : (
            <div className="rounded-lg" style={{ border: "1px solid #dce0e5" }}>
              <Table
                className="new-ui-table"
                columns={tableColumns}
                scroll={{ x: 1300 }}
                dataSource={inboundDetailQuery?.data?.data?.items}
                pagination={false}
              />
              <div className="flex-1 d-flex column justify-end">
                {tableSummaryRender()}
              </div>
            </div>
          )}
        </div>
      </div>
      <PrintInboundModal
        open={showPrint}
        onCancel={closePrint}
        inboundId={inboundDetailQuery?.data?.data?._id}
      />
    </div>
  );
}
