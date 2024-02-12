"use client";
import { Logo } from "@/icons";
import styles from "./styles.module.scss";

// components
import LanguageSwitch from "@/components/LanguageSwitch";
import classNames from "classnames";

const PublicHeader = () => {
  return (
    <header className={classNames(styles["app-header"], "border-b border-gray-200 shadow-sm")}>
      <div className={styles["app-header__left"]}>
        <Logo />
      </div>
      <div className={styles["app-header__right"]}>
        <LanguageSwitch />
      </div>
    </header>
  );
};
export default PublicHeader;
