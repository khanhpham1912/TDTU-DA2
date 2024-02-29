// styles
import styles from "./styles.module.scss";

// utils
import { FieldDefinitionsIconMapping } from "@/utils/customField.utility";

// models
import { CustomFieldMapping } from "tms-models/lib/custom.field.mapping";

// components
import { Status } from "@/components/common";

// hooks
import { useTranslations } from "next-intl";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const DragField = ({
  provided,
  field,
  isSearch = false,
  onRemoveField,
  onClickViewDetailField,
}: {
  provided: any;
  field: CustomFieldMapping;
  isSearch?: boolean;
  onRemoveField: (fieldId: string) => void;
  onClickViewDetailField: (fieldId: string) => void;
}) => {
  const t = useTranslations();

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={styles.field}
    >
      <div className="d-flex gap-16 align-center">
        {!isSearch && (
          <span
            className="material-symbols-outlined color-neutral-500"
            {...provided.dragHandleProps}
          >
            drag_indicator
          </span>
        )}
        <div className="d-flex column gap-4">
          <div className="d-flex gap-8 align-center">
            {FieldDefinitionsIconMapping[field.customField.type]}
            <span className="color-neutral-600 text-700 text-h5">
              {field.displayName}
            </span>
            <div
              style={{
                height: 16,
                width: 1,
                borderRight: "1px solid var(--color-neutral-400)",
              }}
            />
            <span className="color-neutral-600 text-400 text-body">
              {field._id}
            </span>
          </div>
          <div className="d-flex gap-8">
            <Status
              text={
                <div className="d-flex gap-2 text-600">
                  <span
                    className={
                      field.displayOnWeb
                        ? "color-green-500"
                        : "color-neutral-500"
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
              colorKey={field.displayOnWeb ? "ACTIVE" : "default"}
            />
            <Status
              text={
                <div className="d-flex gap-2 text-600">
                  <span
                    className={
                      field.displayOnMobile
                        ? "color-green-500"
                        : "color-neutral-500"
                    }
                  >
                    {t("Display on mobile")}
                  </span>
                  {field.isAllowMobileModified && (
                    <span
                      style={{ textTransform: "lowercase" }}
                      className="color-neutral-500"
                    >{`(${t("Allow driver update")})`}</span>
                  )}
                </div>
              }
              colorKey={field.displayOnMobile ? "ACTIVE" : "default"}
            />
          </div>
        </div>
      </div>
      <div className="d-flex gap-8">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="pointer color-blue-500"
          onClick={() => onClickViewDetailField(field?._id)}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className="pointer color-red-500"
          onClick={() => onRemoveField(field?._id)}
        />
      </div>
    </div>
  );
};
