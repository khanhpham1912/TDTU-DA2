"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

// component
import { PublicHeader } from "@/components";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles["app-container"]}>
      <PublicHeader />
      <main className={styles["app-main__outer"]}>{children}</main>
    </div>
  );
};

export default PublicLayout;
