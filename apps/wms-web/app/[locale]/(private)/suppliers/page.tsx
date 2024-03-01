"use client";

import { Table } from "@/components";
import { useTranslations } from "next-intl";
import { useSupplierForm, useSupplierManagement } from "./_logic";
import { ItemForm } from "./_ui";
import { getSuppliers } from "@/services/suppliers.service";

export default function SupplierPage() {
  const t = useTranslations();

  const { columns, filterOptions, selectedSupplier, setSelectedSupplier } =
    useSupplierManagement();

  const {
    form,
    showItemForm,
    openItemForm,
    handleCloseItemForm,
    handleSubmitItemForm,
  } = useSupplierForm({ supplierId: selectedSupplier, setSelectedSupplier });

  return (
    <div className="app-content">
      <Table
        showIndex
        columns={columns}
        filterOptions={filterOptions}
        queryConfig={{
          queryKey: "supplier-management",
          queryFn: getSuppliers,
        }}
        onClickAdd={openItemForm}
        addText={t("Create supplier")}
      />
      <ItemForm
        isUpdate={!!selectedSupplier}
        form={form}
        open={showItemForm}
        onClose={handleCloseItemForm}
        onSubmit={handleSubmitItemForm}
      />
    </div>
  );
}
