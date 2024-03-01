"use client";

import { Table } from "@/components";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getOutbounds } from "@/services/outbounds.service";
import { useOutboundManagement } from "./_logic";

export default function OutboundPage() {
  const t = useTranslations();
  const { push } = useRouter();
  const { columns, filterOptions } = useOutboundManagement();

  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        queryConfig={{
          queryKey: "outbound-management",
          queryFn: getOutbounds,
        }}
        onClickAdd={() => {
          push("/outbound/add");
        }}
        addText={t("Create outbound")}
      />
    </div>
  );
}
