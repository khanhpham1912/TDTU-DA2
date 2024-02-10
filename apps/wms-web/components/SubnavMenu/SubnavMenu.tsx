"use client";
import { useContext, useMemo } from "react";
import styles from "./styles.module.scss";

// components
import type { MenuProps } from "antd";
import { Layout, Menu, Tooltip } from "antd";
import Link from "next/link";

// icons
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CommonContext from "@/contexts/CommonContext";

// hooks
import { useTranslations } from "next-intl";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function getSubMenu(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  popupClassName?: any
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    popupClassName,
  };
}

interface Props {
  collapsed?: boolean;
  handleLogout?: () => void;
  subNavMenuWidth: number;
  handleChangeCollapsed: () => void;
}

const SubNavMenu = (props: Props) => {
  const { collapsed, subNavMenuWidth } = props;
  const t = useTranslations();
  const { selectedMenu } = useContext(CommonContext);

  const items: MenuItem[] = useMemo(() => {
    return [
      getItem(
        <Link href="/items">{t("Items")}</Link>,
        "ITEMS",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          article
        </span>
      ),
      getItem(
        <Link href="/inbound">{t("Inbound")}</Link>,
        "INBOUND",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          article
        </span>
      ),
      getItem(
        <Tooltip title={t("Outbound")} placement="right">
          {" "}
          <Link href="/outbound" />{" "}
        </Tooltip>,

        "OUTBOUND",
        // <Tooltip title={t("Outbound")} placement="right">
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          article
        </span>
        // </Tooltip>
      ),
    ];
  }, [t]);

  return (
    <Sider width={80} className={styles["app-sidebar"]}>
      <div className={styles["app-logo"]}>
        <span className="material-symbols-outlined text-5xl">warehouse</span>
      </div>
      <Menu
        mode={"inline"}
        selectedKeys={
          Array.isArray(selectedMenu) ? selectedMenu : [selectedMenu as string]
        }
        style={{ height: "100%", borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};

export default SubNavMenu;
