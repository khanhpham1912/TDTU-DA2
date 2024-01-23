"use client";

import { useBreadcrumb } from "@/hooks";
import { useTranslations } from "next-intl";

export default function Items() {
  const t = useTranslations();

  useBreadcrumb({
    selectedMenu: "ITEMS",
  });
  return <div className="app-content">items</div>;
}
