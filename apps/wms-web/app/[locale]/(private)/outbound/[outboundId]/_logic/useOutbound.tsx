import { disabledAfter, FORMAT_DATE } from "@/configs/date.config";
import {
  displayNumber,
  displayDate,
  displayValue,
} from "@/utils/display.utility";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Tooltip, DatePicker } from "antd";
import { useTranslations } from "next-intl";
import {
  OutboundOrder,
  OutboundOrderItem,
} from "wms-models/lib/outbound.order";

export const useOutbound = () => {
  const t = useTranslations();
  const tableColumns: any = [
    {
      title: t("No"),
      dataIndex: "index",
      width: 70,
      fixed: "left",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: t("Item"),
      key: "name",
      fixed: "left",
      width: 250,
      render: (record: OutboundOrderItem) => (
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <Tooltip title={record?.name}>
              <span className="text-gray-900 text-sm">{record?.name}</span>
            </Tooltip>
            <div className="flex gap-1 text-gray-500 items-center text-xs">
              <span>{`SKU: `}</span>
              <span>{record?.sku}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("UOM"),
      key: "uom",
      width: 170,
      render: (record: OutboundOrderItem) => (
        <div className="flex gap-2 items-center text-sm">
          <span>{t(record?.uom as any)}</span>
        </div>
      ),
    },
    {
      title: t("Quantity"),
      key: "itemCount",
      width: 170,
      render: (record: OutboundOrderItem) => (
        <div className="text-right text-sm">
          {displayNumber(record?.itemCount)}
        </div>
      ),
    },
    {
      title: t("Unit value (VND)"),
      key: "unitValue",
      width: 200,
      render: (record: OutboundOrderItem) => (
        <div className="text-right">
          {displayNumber(record?.unitValue ?? 0)}
        </div>
      ),
    },
    {
      title: (
        <div className=" flex gap-1 items-center">
          <span>{t("Total value (VND)")}</span>
          <Tooltip title={t("Total values = Quantity * Unit Value")}>
            <span className="material-symbols-outlined text-blue-500 cursor-pointer">
              info
            </span>
          </Tooltip>
        </div>
      ),
      key: "totalValue",
      width: 200,
      render: (record: OutboundOrderItem) => (
        <div className="text-right">
          {displayNumber((record?.unitValue ?? 0) * (record?.itemCount ?? 0))}
        </div>
      ),
    },
    {
      title: t("Weight (kg)"),
      key: "grossWeight",
      width: 200,
      render: (record: OutboundOrderItem) => (
        <div className="text-right">
          {displayNumber(record?.grossWeight ?? 0)}
        </div>
      ),
    },
    {
      title: (
        <div className=" flex gap-1 items-center">
          <span>{t("Total weight (kg)")}</span>
          <Tooltip title={t("Total weight = Quantity * Weight")}>
            <span className="material-symbols-outlined text-blue-500 cursor-pointer">
              info
            </span>
          </Tooltip>
        </div>
      ),
      key: "totalWeight",
      width: 200,
      render: (record: OutboundOrderItem) => (
        <div className="text-right">
          {displayNumber((record?.grossWeight ?? 0) * (record?.itemCount ?? 0))}
        </div>
      ),
    },
    {
      title: t("Production date"),
      key: "productionDate",
      width: 200,
      render: (record: OutboundOrderItem) => (
        <div>{displayDate(record?.productionDate)}</div>
      ),
    },
    {
      title: t("Expiry date"),
      key: "expiryDate",
      width: 200,
      render: (record: OutboundOrderItem) => (
        <div>{displayDate(record?.expiryDate)}</div>
      ),
    },
    {
      title: t("Description"),
      key: "expiryDate",
      width: 250,
      render: (record: OutboundOrderItem) => (
        <div>{displayValue(record?.description)}</div>
      ),
    },
  ];
  const formColumns = [
    {
      title: t("Item"),
      fixed: "left",
      width: 220,
      render: ({ field }: any) => {
        return (
          <Form.Item<OutboundOrder>
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.sku !==
                current?.items?.[field.name]?.sku
              );
            }}
          >
            {({ getFieldValue }) => {
              const sku = getFieldValue(["items", field.name, "sku"]);
              const name = getFieldValue(["items", field.name, "name"]);

              return (
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <Tooltip title={name}>
                      <span className="text-gray-900 text-sm">{name}</span>
                    </Tooltip>
                    <div className="flex gap-1 text-gray-500 items-center text-xs">
                      <span>{`SKU: `}</span>
                      <span>{sku}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: t("UOM"),
      render: ({ field }: any) => {
        return (
          <Form.Item
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.uom !==
                current?.items?.[field.name]?.uom
              );
            }}
          >
            {({ getFieldValue }) => {
              const uom = getFieldValue(["items", field.name, "uom"]);

              return (
                <div className="flex gap-2 items-center text-sm">
                  <span>{t(uom as any)}</span>
                </div>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: t("Quantity"),
      isRequired: true,
      rules: [{ required: true, message: t("Please type") }],
      formType: "InputNumber",
      formName: "itemCount",
      inputNumberConfig: {
        min: 0,
        placeholder: "0",
        className: "border-green-500",
      },
    },
    {
      title: t("Unit value (VND)"),
      width: 150,
      render: ({ field }: any) => {
        return (
          <Form.Item<OutboundOrder>
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.unitValue !==
                current?.items?.[field.name]?.unitValue
              );
            }}
          >
            {({ getFieldValue }) => {
              const unitValue = getFieldValue([
                "items",
                field.name,
                "unitValue",
              ]);

              return (
                <div className="text-right">{displayNumber(unitValue)}</div>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: (
        <div className=" flex gap-1 items-center">
          <span>{t("Total value (VND)")}</span>
          <Tooltip title={t("Total values = Quantity * Unit Value")}>
            <span className="material-symbols-outlined text-blue-500 cursor-pointer">
              info
            </span>
          </Tooltip>
        </div>
      ),
      width: 200,
      render: ({ field }: any) => {
        return (
          <Form.Item<any>
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.itemCount !==
                  current?.items?.[field.name]?.itemCount ||
                prev?.items?.[field.name]?.unitValue !==
                  current?.items?.[field.name]?.unitValue
              );
            }}
          >
            {({ getFieldValue }) => {
              const itemCount =
                getFieldValue(["items", field.name, "itemCount"]) || 0;

              const unitValue =
                getFieldValue(["items", field.name, "unitValue"]) || 0;
              const totalValue = itemCount * unitValue;

              return (
                <div className="text-right w-full">
                  {displayNumber(totalValue)}
                </div>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: t("Weight (kg)"),
      width: 140,
      render: ({ field }: any) => {
        return (
          <Form.Item<OutboundOrder>
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.grossWeight !==
                current?.items?.[field.name]?.grossWeight
              );
            }}
          >
            {({ getFieldValue }) => {
              const grossWeight = getFieldValue([
                "items",
                field.name,
                "grossWeight",
              ]);

              return (
                <div className="text-right">{displayNumber(grossWeight)}</div>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: (
        <div className=" flex gap-1 items-center">
          <span>{t("Total weight (kg)")}</span>
          <Tooltip title={t("Total weight = Quantity * Weight")}>
            <span className="material-symbols-outlined text-blue-500 cursor-pointer">
              info
            </span>
          </Tooltip>
        </div>
      ),
      width: 200,
      render: ({ field }: any) => {
        return (
          <Form.Item<any>
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.itemCount !==
                  current?.items?.[field.name]?.itemCount ||
                prev?.items?.[field.name]?.grossWeight !==
                  current?.items?.[field.name]?.grossWeight
              );
            }}
          >
            {({ getFieldValue }) => {
              const itemCount =
                getFieldValue(["items", field.name, "itemCount"]) || 0;

              const grossWeight =
                getFieldValue(["items", field.name, "grossWeight"]) || 0;
              const totalValue = itemCount * grossWeight;

              return (
                <div className="text-right w-full">
                  {displayNumber(totalValue)}
                </div>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: t("Production date"),
      width: 150,
      align: "right",
      render: ({ field }: any) => {
        return (
          <Form.Item<OutboundOrder>
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.productionDate !==
                current?.items?.[field.name]?.productionDate
              );
            }}
          >
            {({ getFieldValue }) => {
              const shelfLife =
                getFieldValue(["items", field.name, "shelfLife"]) || 0;
              if (shelfLife) {
                return (
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name={[field.name, "productionDate"]}
                    rules={[{ required: true, message: t("Please type") }]}
                  >
                    <DatePicker
                      placeholder={t("Select date")}
                      disabledDate={disabledAfter}
                      format={FORMAT_DATE}
                    />
                  </Form.Item>
                );
              } else {
                return <span>-</span>;
              }
            }}
          </Form.Item>
        );
      },
    },
    {
      title: t("Expiry date"),
      width: 120,
      render: ({ field }: any) => {
        return (
          <Form.Item<OutboundOrder>
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.expiryDate !==
                  current?.items?.[field.name]?.expiryDate ||
                prev?.items?.[field.name]?.productionDate !==
                  current?.items?.[field.name]?.productionDate
              );
            }}
          >
            {({ getFieldValue }) => {
              const expiryDate = getFieldValue([
                "items",
                field.name,
                "expiryDate",
              ]);

              return (
                <div className="text-right w-full">
                  {displayDate(expiryDate)}
                </div>
              );
            }}
          </Form.Item>
        );
      },
    },
    {
      title: t("Action"),
      fixed: "right",
      width: 80,
      render: ({ field, remove }: any) => {
        return (
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ fontSize: 16 }}
            className="text-[#ff4d4f] cursor-pointer"
            onClick={() => remove(field.name)}
          />
        );
      },
    },
  ];

  return { formColumns, tableColumns };
};
