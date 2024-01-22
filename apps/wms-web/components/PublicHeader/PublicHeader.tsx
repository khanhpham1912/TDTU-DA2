"use client";
import { Logo } from "@/icons";
import styles from "./styles.module.scss";

// components
import LanguageSwitch from "@/components/LanguageSwitch";

const PublicHeader = () => {
  return (
    <header className={styles["app-header"]}>
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
