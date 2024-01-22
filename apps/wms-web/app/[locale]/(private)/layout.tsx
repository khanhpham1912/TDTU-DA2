"use client";
import styles from "./styles.module.scss";
import React, { useCallback, useEffect, useState } from "react";

import { useLocalStorage } from "usehooks-ts";
// contexts
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { validateJwtToken } from "@/utils/jwt.utility";
import { pushNotify } from "@/utils/toast";
import { useTranslations } from "next-intl";
import SubnavMenu from "@/components/SubnavMenu";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useLocalStorage("collapsed", false);

  const handleChangeCollapsed = useCallback(() => {
    setCollapsed((collapsed) => {
      return !collapsed;
    });
  }, [setCollapsed]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   validateJwtToken().then((isValidToken) => {
  //     if (!isValidToken) {
  //       pushNotify(t("Login session has expired"), { type: "warning" });
  //       router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
  //     }
  //   });
  // }, [pathname, router]);

  // useQuery({
  //   queryKey: ["valid-token"],
  //   queryFn: validateJwtToken,
  //   refetchOnWindowFocus: true,
  //   onSuccess: (validToken) => {
  //     if (!validToken) {
  //       router.push(`/login?callbackUrl=${pathname}`);
  //     }
  //   },
  //   onError: () => {
  //     router.push(`/login?callbackUrl=${pathname}`);
  //   },
  // });

  if (!mounted) {
    return null;
  }

  return (
    // <></>
    <div className={styles["app-container"]}>
      <SubnavMenu
        collapsed={collapsed}
        subNavMenuWidth={208}
        handleChangeCollapsed={handleChangeCollapsed}
      />
      <main className={styles["app-main__outer"]}>
        {/* <Header /> */}
        {children}
      </main>
    </div>
  );
};

export default PrivateLayout;
