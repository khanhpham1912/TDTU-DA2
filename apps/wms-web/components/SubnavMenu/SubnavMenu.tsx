"use client";
import { useContext, useMemo } from "react";
import styles from "./styles.module.scss";

// components
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
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
        <Link href="/outbound">{t("Outbound")}</Link>,
        "OUTBOUND",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          article
        </span>
      ),
    ];
  }, [t]);

  return (
    <Sider
      width={subNavMenuWidth}
      className={styles["app-sidebar"]}
      collapsible
      collapsed={collapsed}
      trigger={
        collapsed ? (
          <MenuUnfoldOutlined
            className="pointer text-h5"
            onClick={props.handleChangeCollapsed}
          />
        ) : (
          <MenuFoldOutlined
            className="pointer text-h5"
            onClick={props.handleChangeCollapsed}
          />
        )
      }
    >
      <div className={styles["app-logo"]}>
        {collapsed ? (
          <span className="material-symbols-outlined text-5xl">warehouse</span>
        ) : (
          <>
            <span className="material-symbols-outlined text-4xl">
              warehouse
            </span>
            <span>WMS</span>
          </>
        )}
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
