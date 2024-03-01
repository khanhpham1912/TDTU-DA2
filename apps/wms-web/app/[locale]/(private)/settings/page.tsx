import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import { CustomFields } from "./_ui";

export default function SettingPage() {
  const t = useTranslations();
  return (
    <div className="app-content">
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="custom-field"
        items={[
          {
            key: "custom-field",
            label: t("Custom fields"),
            children: <CustomFields />,
          },
        ]}
      />
    </div>
  );
}
