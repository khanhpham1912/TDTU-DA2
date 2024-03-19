import { DatePicker } from "@/components/DatePicker";
import { FORMAT_DATE, disabledAfter } from "@/configs/date.config";
import { EStatus } from "@/enums";
import { createOutbound } from "@/services/outbounds.service";
import { displayDate, displayNumber } from "@/utils/display.utility";
import { pushNotify } from "@/utils/toast";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { Form, InputNumber, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import {
  OutboundOrder,
  OutboundOrderItem,
} from "wms-models/lib/outbound.order";
import { useRouter } from "next/navigation";

const useOutboundForm = () => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const { push } = useRouter();

  const handleAddItem = (
    newItem: any,
    add: (
      value: Partial<
        OutboundOrderItem & {
          weight: number;
          conversionValue: number;
          conversionWeight: number;
        } & any
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
        (item: OutboundOrderItem) => item?.no === newItem?.no
      );

      if (hasProduct) {
        const items = values.items?.map((item: OutboundOrderItem) => {
          if (item?.itemCount === newItem?.availableInventories) {
            throw new Error(t("Maximum number of products has been reached"));
          }
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
          no: newItem?.no,
          sku: newItem?.sku,
          name: newItem?.name,
          description: newItem?.description,
          uom: newItem?.uom,
          type: newItem?.type,
          grossWeight: newItem?.grossWeight,
          unitValue: newItem?.unitValue,
          productionDate: newItem?.productionDate,
          expiryDate: newItem?.expiryDate,
          supplier: newItem?.supplier,
          dimension: newItem?.dimension,
          itemCount: 1,
          inventory: newItem?.availableInventories,
        },
        0
      );
    } catch (error: any) {
      pushNotify(error?.message ?? t("An error has occurred"), {
        type: "error",
      });
    }
  };

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
      render: ({ field }: any) => {
        return (
          <Form.Item
            noStyle
            shouldUpdate={(prev, current) => {
              return (
                prev?.items?.[field.name]?.itemCount !==
                current?.items?.[field.name]?.itemCount
              );
            }}
          >
            {({ getFieldValue }) => {
              const total: number = getFieldValue([
                "items",
                field.name,
                "inventory",
              ]);

              return (
                <Form.Item
                  name={[field.name, "itemCount"]}
                  rules={[{ required: true, message: t("Please type") }]}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber placeholder="0" min={1} max={total} />
                </Form.Item>
              );
            }}
          </Form.Item>
        );
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
      formType: "InputNumber",
      formName: "grossWeight",
      inputNumberConfig: {
        min: 0,
        placeholder: "0",
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
      width: 60,
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

  const createOutboundMutation = useMutation({
    mutationFn: (request: any) => createOutbound(request),
    onSuccess: (response) => {
      pushNotify(response?.message);
      push(`/outbound/${response?.data?._id}`);
    },
    onError: (error: any) => {
      pushNotify(
        error?.response?.data?.message ||
          error.message ||
          t("An error has occurred"),
        {
          type: "error",
        }
      );
    },
  });

  const handleCreateOutbound = async () => {
    try {
      const values = await form.validateFields();
      let totalGrossWeight = 0;
      let totalValue = 0;
      values.items = values?.items?.map((item: any) => {
        totalValue += (item?.unitValue ?? 0) * (item?.itemCount ?? 0);
        totalGrossWeight += (item?.grossWeight ?? 0) * (item?.itemCount ?? 0);
        const { inventory, ...rest } = item;
        return { ...rest };
      });

      createOutboundMutation.mutate({
        ...values,
        totalValue,
        totalGrossWeight,
        status: EStatus.NEW,
      });
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

  return {
    form,
    handleAddItem,
    formColumns,
    handleCreateOutbound,
  };
};

export default useOutboundForm;
