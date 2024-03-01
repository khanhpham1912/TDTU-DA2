// styles
import styles from "./styles.module.scss";

// utils
import { FieldDefinitionsIconMapping } from "@/utils/custom.field.utility";

// models
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";

// components

// hooks
import { useTranslations } from "next-intl";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Status } from "@/components/Status";

export const DragField = ({
  provided,
  field,
  isSearch = false,
  onRemoveField,
  onClickViewDetailField,
  showDisplayOnPrint,
}: {
  provided: any;
  field: CustomFieldMapping;
  isSearch?: boolean;
  onRemoveField: (fieldId: string) => void;
  onClickViewDetailField: (fieldId: string) => void;
  showDisplayOnPrint: boolean;
}) => {
  const t = useTranslations();

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={styles.field}
    >
      <div className=" flex gap-4 items-center">
        {!isSearch && (
          <span
            className="material-symbols-outlined text-gray-500"
            {...provided.dragHandleProps}
          >
            drag_indicator
          </span>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            {FieldDefinitionsIconMapping[field.customField.type]}
            <span className="text-gray-600 font-bold text-base">
              {field.displayName}
            </span>
            <div
              style={{
                height: 16,
                width: 1,
                borderRight: "1px solid #b8c0cc",
              }}
            />
            <span className=" text-neutral-600 font-normal text-sm">
              {field._id}
            </span>
          </div>
          <div className="flex gap-2">
            <Status
              text={
                <div className="flex gap-1 font-semibold">
                  <span
                    className={
                      field.displayOnWeb
                        ? " text-green-500"
                        : "text-neutral-500"
                    }
                  >
                    {t("Display on web")}
                  </span>
                  {field.required && (
                    <span
                      style={{ textTransform: "lowercase" }}
                      className="color-neutral-500"
                    >{`(${t("Required")})`}</span>
                  )}
                </div>
              }
              colorKey={field.displayOnWeb ? "COMPLETED" : "default"}
            />
            {showDisplayOnPrint && (
              <Status
                text={
                  <div className="d-flex gap-2 text-600">
                    <span
                      className={
                        field.displayOnDocument
                          ? "color-green-500"
                          : "color-neutral-500"
                      }
                    >
                      {t("Display on print")}
                    </span>
                  </div>
                }
                colorKey={field.displayOnDocument ? "COMPLETED" : "default"}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="cursor-pointer text-blue-500"
          onClick={() => onClickViewDetailField(field?._id)}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className="cursor-pointer text-red-500"
          onClick={() => onRemoveField(field?._id)}
        />
      </div>
    </div>
  );
};
