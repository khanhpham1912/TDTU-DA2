"use client";

import { useCustomFieldManagement } from "./logic";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import { FieldDefinitionsIconMapping } from "@/utils/custom.field.utility";
import { CustomField } from "wms-models/lib/custom.field";
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Divider, Button, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getCustomFields } from "@/services/custom.field.service";
import { FieldDrawer } from "./ui";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const DEFAULT_PAGING = {
  currentPage: 1,
  pageSize: 20,
};

const FieldDefinitions = () => {
  const t = useTranslations();
  const [filterParams, setFilterParams] = useState<{
    filter: any;
    paging: {
      currentPage: number;
      pageSize: number;
    };
    search: string;
  }>({
    filter: {},
    paging: DEFAULT_PAGING,
    search: "",
  });
  const fieldDefinitionQuery = useQuery({
    queryKey: ["field-definition", { filterParams }],
    queryFn: () => getCustomFields({ ...filterParams }),
    refetchOnWindowFocus: false,
    keepPreviousData: false,
  });

  const handleSearch = useCallback(
    (value: string) => {
      const _filterParams = JSON.parse(JSON.stringify(filterParams));
      _filterParams.search = value;
      _filterParams.paging = DEFAULT_PAGING;
      setFilterParams(_filterParams);
    },
    [filterParams]
  );

  const {
    openDrawer,
    selectedFieldId,
    onOpenDrawer,
    handCloseDrawer,
    handleRemoveField,
    handleSelectedField,
  } = useCustomFieldManagement();

  return (
    <div className="h-full">
      <div className="flex justify-between mb-6">
        <div className="flex gap-2 items-center">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t("Search")}
            style={{ width: "270px" }}
          />
          <ArrowPathIcon
            className="text-[#8d97a6] cursor-pointer h-6 w-6"
            onClick={() => fieldDefinitionQuery.refetch()}
          />
        </div>

        <div className="flex items-center">
          <Button
            type="primary"
            onClick={onOpenDrawer}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "#fff", fontSize: 14 }}
              />
            }
          >
            {t("Create field")}
          </Button>
        </div>
      </div>
      <div className={styles["list"]}>
        <Row gutter={[16, 16]}>
          {fieldDefinitionQuery?.data?.data?.docs?.map?.(
            (field: CustomField, key: number) => {
              return (
                <Col key={key} xs={24}>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded cursor-pointer">
                    <div className="flex gap-2 items-center text-gray-600">
                      {FieldDefinitionsIconMapping?.[field.type]}
                      <span className="font-bold text-lg">{field.type}</span>
                      <Divider
                        type="vertical"
                        style={{ margin: 0, height: 24 }}
                        className="text-gray-500"
                      />
                      <span className="text-sm font-normal">{field.name}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-500 text-lg cursor-pointer"
                        onClick={() => handleSelectedField(field._id)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="cursor-pointer text-red-500 text-lg"
                        onClick={() => handleRemoveField(field._id)}
                      />
                    </div>
                  </div>
                </Col>
              );
            }
          )}
        </Row>
      </div>
      <FieldDrawer
        open={openDrawer}
        onClose={handCloseDrawer}
        fieldId={selectedFieldId}
      />
    </div>
  );
};

export default FieldDefinitions;
