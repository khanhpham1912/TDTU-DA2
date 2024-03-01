import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import { FieldDefinitions } from "./definitions";
import { CustomField } from "./[entity]";
import { EEntity } from "wms-models/lib/shared";

export const CustomFields = () => {
  const t = useTranslations();
  const items: any = [
    {
      key: "definitions",
      label: t("Field definitions"),
      children: <FieldDefinitions />,
    },
    {
      key: "suppliers",
      label: t("Suppliers"),
      children: <CustomField entity={EEntity.Supplier} />,
    },
    {
      key: "item",
      label: t("Items"),
      children: <CustomField entity={EEntity.Item} />,
    },
    {
      key: "inbound",
      label: t("Inbound orders"),
      children: <CustomField entity={EEntity.Inbound} />,
    },
    {
      key: "outbound",
      label: t("Outbound orders"),
      children: <CustomField entity={EEntity.Outbound} />,
    },
  ];
  return <Tabs tabPosition="left" items={items} />;
};
