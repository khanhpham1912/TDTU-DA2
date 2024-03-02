"use client";

import { Table } from "@/components";
import { getItems } from "@/services/items.service";
import { useTranslations } from "next-intl";
import { useItemForm, useItemManagement } from "./_logic";
import { ItemForm } from "./_ui";
import { faChevronUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubTable from "@/components/SubTable";

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
        expandable={{
          expandedRowRender: (record, _index, _indent, expanded) => (
            <SubTable record={record} expanded={expanded} />
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                className="cursor-pointer text-neutral-400"
                onClick={(e: any) => onExpand(record, e)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="cursor-pointer text-neutral-400"
                onClick={(e: any) => onExpand(record, e)}
              />
            ),
        }}
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
