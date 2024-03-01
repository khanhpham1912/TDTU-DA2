"use client";
// styles
import styles from "./styles.module.scss";

// icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { Button, Input } from "antd";
import { DragField, MapFieldDrawer } from "./ui";

// hooks
import { useTranslations } from "next-intl";
import { useFieldMapping } from "./logic";

// models
import { EEntity } from "wms-models/lib/shared";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CustomField = ({ entity }: { entity: EEntity }) => {
  const t = useTranslations();

  const {
    fields,
    openDrawer,
    selectedFieldId,
    isSearch,
    onOpenDrawer,
    onDragEnd,
    onRemoveField,
    onClickViewDetailField,
    handleCloseDrawer,
    handleSearch,
  } = useFieldMapping({ entity });

  return (
    <div className="h-full gap-4">
      <div className=" flex gap-2 items-center justify-between">
        <Input
          placeholder={`${t("Search")}`}
          onChange={(event: any) => handleSearch(event.target.value)}
          allowClear
          style={{ width: "270px" }}
        />
        <Button
          type="primary"
          icon={
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "#fff", fontSize: 14 }}
            />
          }
          onClick={onOpenDrawer}
        >
          {t("Map field")}
        </Button>
      </div>
      <div className={styles.content}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided: any) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    key={field._id}
                    draggableId={field._id}
                    index={index}
                  >
                    {(provided: any) => (
                      <DragField
                        field={field}
                        provided={provided}
                        onRemoveField={onRemoveField}
                        onClickViewDetailField={onClickViewDetailField}
                        isSearch={isSearch}
                        showDisplayOnPrint={
                          entity !== EEntity.Item && entity !== EEntity.Supplier
                        }
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <MapFieldDrawer
        fieldId={selectedFieldId}
        open={openDrawer}
        onClose={handleCloseDrawer}
        entity={entity}
      />
    </div>
  );
};

export default CustomField;
