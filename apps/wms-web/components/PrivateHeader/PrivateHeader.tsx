"use client";
import styles from "./styles.module.scss";
import classNames from "classnames";
import React from "react";

// icons

// components
import { Dropdown, Avatar } from "antd";
import LanguageSwitch from "@/components/LanguageSwitch";

// hooks
import { useMemo } from "react";

// interfaces
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";

// contexts

const Header = ({ style }: { style?: React.CSSProperties }) => {
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    push("/login");
  };

  const items: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "INFO",
        disabled: true,
        label: (
          <div className={styles["user-avatar"]}>
            <Avatar
              size={32}
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            />

            <div className={styles["user-info"]}>
              <span>{localStorage.getItem("userInfo")}</span>
            </div>
          </div>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "LOGOUT",
        label: (
          <div
            className={classNames(
              styles["menu-item"],
              styles["menu-item-logout"]
            )}
            onClick={handleLogout}
          >
            <span>{`Logout`}</span>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <header className={styles["app-header"]} style={style}>
      <div className={styles["app-header__right"]}>
        <LanguageSwitch />
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
            <Avatar
              size={32}
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            />
          </a>
        </Dropdown>
      </div>
    </header>
  );
};
export default Header;