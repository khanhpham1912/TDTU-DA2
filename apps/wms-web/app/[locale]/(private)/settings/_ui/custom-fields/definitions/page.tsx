"use client";

// components
import { PostView } from "@/components/common";
import { FieldDrawer } from "./ui";
import { Divider, List } from "antd";

// services
import { getCustomFields } from "@/services/customField.service";

// utils
import { FieldDefinitionsIconMapping } from "@/utils/customField.utility";

// models
import { CustomField } from "tms-models/custom.field";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

// hooks
import { useCustomFieldManagement } from "./logic";
import { useTranslations } from "next-intl";
import { useBreadcrumb } from "@/hooks";
import { useContext } from "react";
import CommonContext from "@/contexts/CommonContext";

const DefinitionsPage = () => {
  const t = useTranslations();
  const { modal } = useContext(CommonContext);

  const {
    openDrawer,
    selectedFieldId,
    onOpenDrawer,
    handCloseDrawer,
    handleRemoveField,
    handleSelectedField,
  } = useCustomFieldManagement({ modal });
  return (
    <div className="app-content h-100">
      <List/>
      {/* <PostView
        title={t("Field definitions")}
        queryConfig={{
          queryKey: "field-definitions",
          queryFn: getCustomFields,
        }}
        searchConfig={{
          placeholder: t("Search"),
        }}
        filterConfig={{ default: [], options: [] }}
        showSetting={false}
        addConfig={{
          onClick: onOpenDrawer,
          text: t("Add field"),
        }}
        mode={["LIST"]}
        listConfig={{
          renderCard: (field: CustomField) => {
            return (
              <div
                className="d-flex justify-space-between align-center"
                style={{
                  border: "1px solid var(--color-neutral-100)",
                  background: "#fff",
                  height: "32px",
                  borderRadius: 4,
                  padding: "8px 12px",
                }}
              >
                <div className="d-flex gap-8 align-center color-neutral-600">
                  {FieldDefinitionsIconMapping?.[field.type]}
                  <span className="text-700 text-h5">{field.type}</span>
                  <Divider
                    type="vertical"
                    style={{ margin: 0, height: 24 }}
                    className="color-neutral-500"
                  />
                  <span className="text-body text-400">{field.name}</span>
                </div>
                <div className="d-flex gap-8 align-center">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="color-blue-500 font-18 pointer"
                    onClick={() => handleSelectedField(field._id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="pointer color-red-500 font-18"
                    onClick={() => handleRemoveField(field._id)}
                  />
                </div>
              </div>
            );
          },
          gutter: [12, 12],
        }}
      />
      <FieldDrawer
        open={openDrawer}
        onClose={handCloseDrawer}
        fieldId={selectedFieldId}
      /> */}
    </div>
  );
};

export default DefinitionsPage;
