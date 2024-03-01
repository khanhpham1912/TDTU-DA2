// styles
import styles from "./styles.module.scss";

// components
import { Button, ConfigProvider, Divider, Modal, QRCode, Table } from "antd";

import { CustomFieldView } from "@/components/custom.field";

// hooks
import { useTranslations } from "next-intl";

// utils
import classNames from "classnames";
import { EEntity } from "wms-models/lib/shared";
import {
  PrintHeader,
  PrintContent,
  tablePrintTheme,
  PrintFooter,
} from "@/components/Print";
import { getInbound } from "@/services/inbounds.service";
import {
  displayValue,
  displayDate,
  displayNumber,
} from "@/utils/display.utility";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { useCallback, useMemo, useRef } from "react";
import { InboundOrderItem } from "wms-models/lib/inbound";

export const PrintInboundModal = ({
  open,
  onCancel,
  inboundId,
}: {
  open: boolean;
  onCancel: () => void;
  inboundId: string;
}) => {
  const t = useTranslations();
  const componentRef: any = useRef();

  //   const { inboundOrder?.data?.data, columns, loading, componentRef, handlePrint } =
  //     usePrintReceiptNoteModal({ receiptNoteId });
  const inboundOrder = useQuery({
    queryKey: ["inbound-detail", inboundId],
    queryFn: () => getInbound(inboundId),
    refetchOnWindowFocus: false,
  });
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    pageStyle: "print",
  });

  const isTotalRow = useCallback(
    (index: number) => index === inboundOrder?.data?.data?.items?.length,
    [inboundOrder?.data?.data?.items]
  );

  const sharedOnCell: any = useCallback(
    (_: any, index: number) => {
      if (isTotalRow(index)) {
        return { colSpan: 0 };
      }

      return {};
    },
    [isTotalRow]
  );

  const columns: any = [
    {
      title: <div className="flex items-center justify-center h-full">STT</div>,
      dataIndex: "index",
      width: 24,
      align: "left",
      onCell: (_: any, index: number) => {
        return {
          colSpan: isTotalRow(index) ? 3 : 1,
        };
      },
      render: (_value: any, _record: any, index: number) => {
        if (isTotalRow(index)) return null;
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Mã SKU",
      onCell: sharedOnCell,
      render: (record: InboundOrderItem) => <div>{record?.sku}</div>,
    },
    {
      title: "Sản phẩm",
      onCell: sharedOnCell,
      render: (record: InboundOrderItem) => <div>{record?.name}</div>,
    },
    {
      title: "Trọng lượng (KG)",
      align: "right",
      render: (_value: any, record: any, index: number) => {
        if (index !== inboundOrder?.data?.data?.items?.length) {
          return (
            <div className="font-weight-bold">
              {displayNumber(record?.grossWeight)}
            </div>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Loại sản phẩm",
      onCell: sharedOnCell,
      render: (_value: any, record: InboundOrderItem, index: number) => {
        if (index !== inboundOrder?.data?.data?.items?.length) {
          return <div>{t(record?.type as any)}</div>;
        } else {
          return null;
        }
      },
    },
    {
      title: "HSD",
      width: 50,

      render: (_value: any, record: InboundOrderItem, index: number) => {
        if (index !== inboundOrder?.data?.data?.items?.length) {
          return <div>{displayDate(record?.expiryDate)}</div>;
        }
        return null;
      },
    },

    {
      title: "ĐVT",
      width: 50,

      render: (_value: any, record: InboundOrderItem, index: number) => {
        if (index !== inboundOrder?.data?.data?.items?.length) {
          return <div>{displayValue(t(record?.uom as any))}</div>;
        }
        return null;
      },
    },
    {
      title: "Số lượng",
      onCell: sharedOnCell,
      render: (_value: any, record: InboundOrderItem, index: number) => {
        if (index !== inboundOrder?.data?.data?.items?.length) {
          return <div>{record?.itemCount}</div>;
        }
      },
    },
  ];
  return (
    <Modal
      destroyOnClose
      width="80vw"
      centered
      open={open}
      style={{ overflow: "hidden" }}
      title={t("Print inbound order")}
      onCancel={onCancel}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>{t("Close")}</Button>
          <Button type="primary" onClick={handlePrint}>
            {t("Print")}
          </Button>
        </div>
      }
    >
      <div ref={componentRef} className={styles["print-component"]}>
        <PrintHeader title="Biên bản nhận hàng" />
        <div className="flex gap-3 flex-col">
          <div className="flex justify-between">
            <PrintContent
              items={[
                {
                  label: "Mã đơn nhập kho:",
                  value: displayValue(inboundOrder?.data?.data?.no),
                },
                {
                  label: "Ngày tạo biên bản:",
                  value: displayDate(inboundOrder?.data?.data?.createdAt),
                },
                {
                  label: "Thời gian nhận hàng:",
                  value: displayDate(inboundOrder?.data?.data?.arrivalTime),
                },
              ]}
            />
          </div>

          <Divider style={{ background: "#3D424C", margin: 0 }} />

          <PrintContent
            items={[
              {
                label: "Tài xế giao hàng:",
                value: displayValue(
                  inboundOrder?.data?.data?.shipper?.shipperName
                ),
              },
              {
                label: "SĐT:",
                value: displayValue(
                  inboundOrder?.data?.data?.shipper?.shipperPhone
                ),
              },
              {
                label: "Biển số xe:",
                value: displayValue(
                  inboundOrder?.data?.data?.shipper?.shipperLicense
                ),
              },
            ]}
          />

          <Divider style={{ background: "#3D424C", margin: 0 }} />

          <CustomFieldView
            layout="print"
            entity={EEntity.Inbound}
            data={{
              customFieldMapping: inboundOrder?.data?.data?.customFieldMapping,
            }}
          />

          <div className="flex flex-col gap-1 pb-4">
            <span style={{ fontSize: "12px" }}>Bảng danh sách:</span>
            <ConfigProvider theme={{ ...tablePrintTheme }}>
              <Table
                className={classNames(
                  "printing-table",
                  styles["printing-table--custom"]
                )}
                dataSource={[...(inboundOrder?.data?.data?.items || []), {}]}
                bordered
                pagination={false}
                columns={columns}
              />
            </ConfigProvider>
          </div>
          <PrintFooter
            noteList={["Ghi chú (khách hàng)", "Ghi chú (biên bản nhận hàng)"]}
            signList={{
              right: "Đại diện nhận hàng",
              left: "Đại diện giao hàng",
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
