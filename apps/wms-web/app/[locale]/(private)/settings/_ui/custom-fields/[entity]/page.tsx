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
import { useContext } from "react";
import CommonContext from "@/contexts/CommonContext";
import { EEntity } from "wms-models/lib/shared";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CustomFieldPage = ({ entity }: { entity: EEntity }) => {
  const t = useTranslations();
  const { modal } = useContext(CommonContext);

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
  } = useFieldMapping({ entity, modal });

  return (
    <div className="app-content h-100 gap-16">
      <div className="d-flex justify-space-between align-center">
        <div className="color-neutral-900 text-600 text-h3">{entity}</div>
        <div className="d-flex gap-8 align-center">
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

export default CustomFieldPage;
