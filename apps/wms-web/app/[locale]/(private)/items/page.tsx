"use client";

import { Table } from "@/components";
import { useBreadcrumb } from "@/hooks";
import { getItems } from "@/services/items.service";
import { useTranslations } from "next-intl";

export default function Items() {
  const t = useTranslations();
  useBreadcrumb({
    selectedMenu: "ITEMS",
  });
  return (
    <div className="app-content">
      <Table
        showIndex
        columns={[]}
        filterOptions={[]}
        queryConfig={{
          queryKey: ["items-manager"],
          queryFn: getItems,
        }}
        onClickAdd={() => {}}
      />
    </div>
  );
}
