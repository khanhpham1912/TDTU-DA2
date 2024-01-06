"use client";
import { useCallback, useContext, useMemo } from "react";
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
import { LogoIcon, WareflexIcon } from "@/icons";

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
  const { selectedMenu, openedMenu, setOpenedMenu } = useContext(CommonContext);

  const renderMenuKeys = () => {
    if (collapsed) return;
    if (Array.isArray(openedMenu)) return openedMenu;
    return [openedMenu as string];
  };

  const items: MenuItem[] = useMemo(() => {
    return [
      getItem(
        <Link href="/dashboard">{t("Dashboard")}</Link>,
        "DASHBOARD",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          dashboard
        </span>
      ),
      getSubMenu(
        <span>{t("Data master")}</span>,
        "DATA_MASTER",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          database
        </span>,
        [
          getItem(<Link href="/data-master/items">{t("Items")}</Link>, "ITEM"),
          getItem(
            <Link href="/data-master/driver">{t("Driver")}</Link>,
            "DRIVER"
          ),
          getItem(<Link href="/data-master/truck">{t("Truck")}</Link>, "TRUCK"),
        ]
      ),
      getSubMenu(
        <span>{t("CRM")}</span>,
        "CRM",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          group
        </span>,
        [getItem(<Link href="/crm/partner">{t("Partner")}</Link>, "PARTNER")]
      ),
      getSubMenu(
        <span>{t("Operation")}</span>,
        "OPERATION",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          view_quilt
        </span>,
        [
          getItem(<Link href="/operation/order">{t("Order")}</Link>, "ORDER"),
          getItem(
            <Link href="/operation/shipment">{t("Shipment")}</Link>,
            "SHIPMENT"
          ),
          getItem(
            <Link href="/operation/vehicle-schedule">
              {t("Vehicle schedule")}
            </Link>,
            "VEHICLE_SCHEDULE"
          ),
        ]
      ),
      getItem(
        <Link href="/shipment-report">{t("Shipment report")}</Link>,
        "SHIPMENT_REPORT",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          article
        </span>
      ),
      getItem(
        <Link href="/setting-page">{t("Setting")}</Link>,
        "SETTING",
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          settings
        </span>
      ),
      // getItem(
      //   <Link href="/settings">{t("Setting")}</Link>,
      //   "SETTING",
      //   <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
      //     settings
      //   </span>
      // ),
    ];
  }, [t]);

  const handleOpenChange = useCallback(
    (openKeys: string[]) => {
      const oldOpenedMenu = Array.isArray(openedMenu)
        ? openedMenu
        : [openedMenu];
      const newOpenedMenu = openKeys.filter(
        (item) => !oldOpenedMenu.includes(item)
      );
      setOpenedMenu(newOpenedMenu);
    },
    [openedMenu, setOpenedMenu]
  );

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
        <LogoIcon />
        {!collapsed && <WareflexIcon />}
      </div>
      <Menu
        mode={"inline"}
        selectedKeys={
          Array.isArray(selectedMenu) ? selectedMenu : [selectedMenu as string]
        }
        openKeys={renderMenuKeys()}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onOpenChange={handleOpenChange}
      />
    </Sider>
  );
};

export default SubNavMenu;
