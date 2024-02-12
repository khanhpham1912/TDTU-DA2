"use client";

import { Table } from "@/components";
import { useBreadcrumb } from "@/hooks";
import { getItems } from "@/services/items.service";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import { useItemForm, useItemManagement } from "./_logic";
import { ItemForm } from "./_ui";

export default function Items() {
  const t = useTranslations();

  const {columns, filterOptions} = useItemManagement();
  const {itemForm, showItemForm, openItemForm, handleCloseItemForm, handleSubmitItemForm} = useItemForm()


  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        dataSource={[
          {
            sku: "sp1",
            name: "sản phẩm 1",
            description: "nothing",
            uom: "BUCKET",
            type: "CONSUMER_GOODS",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "10/12/2023",
            expiryDate: "10/6/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp2",
            name: "sản phẩm 2",
            description: "nothing",
            uom: "SET",
            type: "HEALTH_AND_BEAUTY",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "18/02/2023",
            expiryDate: "10/7/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp3",
            name: "sản phẩm 3",
            description: "nothing",
            uom: "CASE",
            type: "RUBBER_AND_PLASTICS",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "10/12/2023",
            expiryDate: "10/6/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp4",
            name: "sản phẩm 4",
            description: "nothing",
            uom: "GROSS",
            type: "FURNITURE",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "10/01/2023",
            expiryDate: "10/1/2024",
            supplier: "Hảo hảo",
          },
          {
            sku: "sp5",
            name: "sản phẩm 5",
            description: "nothing",
            uom: "LOT",
            type: "STEELS",
            grossWeight: 12,
            netWeight: 0,
            productionDate: "23/12/2023",
            expiryDate: "23/6/2024",
            supplier: "Hảo hảo",
          },
        ]}
        queryConfig={{
          queryKey: ["items-management"],
          queryFn: getItems,
        }}
        onClickAdd={openItemForm}
        addText={t("Create item")}
      />
      <ItemForm form={itemForm} open={showItemForm} onClose={handleCloseItemForm} onSubmit={handleSubmitItemForm}/>
    </div>
  );
}
