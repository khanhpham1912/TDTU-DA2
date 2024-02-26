"use client";

import { Table } from "@/components";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { InboundOrder } from "wms-models/lib/inbound";
import { Item } from "wms-models/lib/items";
import { useInboundManagement } from "./_logic";
import { useRouter } from "next/navigation";

export default function Items() {
  const t = useTranslations();
  const {push} = useRouter();
  const { columns, filterOptions } =
  useInboundManagement();

  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        queryConfig={{
          queryKey: ["inbound-management"],
          queryFn: () => {},
        }}
        onClickAdd={() => {push("/inbound/add")}}
        addText={t("Create inbound")}
      />
    </div>
  );
}
