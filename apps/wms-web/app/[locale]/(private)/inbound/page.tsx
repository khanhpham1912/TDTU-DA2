"use client";

import { Table } from "@/components";
import { useTranslations } from "next-intl";
import { useInboundManagement } from "./_logic";
import { useRouter } from "next/navigation";
import { getInbounds } from "@/services/inbounds.service";

export default function InboundPage() {
  const t = useTranslations();
  const { push } = useRouter();
  const { columns, filterOptions } = useInboundManagement();

  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        queryConfig={{
          queryKey: "inbound-management",
          queryFn: getInbounds,
        }}
        onClickAdd={() => {
          push("/inbound/add");
        }}
        addText={t("Create inbound")}
      />
    </div>
  );
}
