import { DatePicker } from "@/components/DatePicker";
import { FORMAT_DATE, disabledAfter } from "@/configs/date.config";
import { displayDate, displayNumber } from "@/utils/display.utility";
import { pushNotify } from "@/utils/toast";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { InboundOrder, InboundOrderItem } from "wms-models/lib/inbound";
import { Item } from "wms-models/lib/items";

const useInboundForm = () => {
  const t = useTranslations();
  const [form] = Form.useForm()


  const handleAddItem = (
    newItem: Item,
    add: (
      value: Partial<
        InboundOrderItem & {
          weight: number;
          conversionValue: number;
          conversionWeight: number;
        }
      >,
      index: number
    ) => void
  ) => {
    try {
      if (!newItem) {
        return;
      }
      const values = form.getFieldsValue();

      const hasProduct = !!values?.items?.find(
        (item: InboundOrderItem) => item?.no === newItem?.no
      );

      if (hasProduct) {
        const items = values.items?.map((item: InboundOrderItem) => {
          if (item?.no === newItem?.no) {
            item.itemCount += 1;
          }
          return item;
        });
        form.setFieldValue("items", items);
        return;
      }
      add(
        {
          ...newItem,
          itemCount: 1,
        },
        0
      );
    } catch (error) {
      console.error(error);
      pushNotify(t("An error has occurred"), { type: "error" });
    }
  };

  const formColumns = [
    {
      title: t("Item"),
      fixed: "left",
      width: 220,
      render: ({ field }: any) => {
        return (
          <Form.Item<InboundOrder>
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
              const barcode = getFieldValue(["items", field.name, "barcode"]);
              const name = getFieldValue(["items", field.name, "name"]);

              return (
                <div className="d-flex gap-8 align-center">
                  <div className="d-flex column">
                    <Tooltip title={name}>
                      <span className="text-1line color-neutral-900">
                        {name}
                      </span>
                    </Tooltip>
                    <div className="d-flex gap-4 color-neutral-500 align-center text-note">
                      <span className="text-1line">{`SKU: `}</span>
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
                <div className="d-flex gap-8 align-center">
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
        min: 1,
        placeholder: "0",
      },
    },
    {
      title: t("Unit value (VND)"),
      width: 140,
      formType: "InputNumber",
      formName: "unitValue",
      inputNumberConfig: {
        min: 0,
        placeholder: "0",
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
      width: 150,
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
      title: t("Production date"),
      width: 120,
      align: "right",
      render: ({ field }: any) => {
        return (
          <Form.Item<InboundOrder>
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
          <Form.Item<InboundOrder>
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
      width: 60,
      render: ({ field, remove }: any) => {
        return (
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ fontSize: 16 }}
            className="color-danger pointer"
            onClick={() => remove(field.name)}
          />
        );
      },
    },
  ];

  return {
    form,
    handleAddItem,
    formColumns,
  };
};

export default useInboundForm;