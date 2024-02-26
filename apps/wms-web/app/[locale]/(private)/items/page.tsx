"use client";

import { Table } from "@/components";
import { getItems } from "@/services/items.service";
import { useTranslations } from "next-intl";
import { useItemForm, useItemManagement } from "./_logic";
import { ItemForm } from "./_ui";

export default function Items() {
  const t = useTranslations();

  const { columns, filterOptions, selectedItem, setSelectedItem } =
    useItemManagement();

  const {
    itemForm,
    showItemForm,
    openItemForm,
    handleCloseItemForm,
    handleSubmitItemForm,
  } = useItemForm({ itemId: selectedItem, setSelectedItem });

  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        queryConfig={{
          queryKey: "items-management",
          queryFn: getItems,
        }}
        onClickAdd={openItemForm}
        addText={t("Create item")}
      />
      <ItemForm
        isUpdate={!!selectedItem}
        form={itemForm}
        open={showItemForm}
        onClose={handleCloseItemForm}
        onSubmit={handleSubmitItemForm}
      />
    </div>
  );
}
