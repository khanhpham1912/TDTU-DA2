import { Tabs } from "antd"
import { useTranslations } from "next-intl";

export const CustomFields = () => {
    const t = useTranslations();
    const items: any = [{
        key: "definitions",
        label: t("Field definitions"),
        children: <></>
    }]
    return (
        <Tabs tabPosition="left" items={}/>
    )
}