import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import { FieldDefinitions } from "./definitions";

export const CustomFields = () => {
  const t = useTranslations();
  const items: any = [
    {
      key: "definitions",
      label: t("Field definitions"),
      children: <FieldDefinitions />,
    },
  ];
  return <Tabs tabPosition="left" items={items} />;
};
