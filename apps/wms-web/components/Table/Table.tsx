import styles from "./styles.module.scss";

// components
import {
  Table,
  Pagination,
  Badge,
  Button,
  Dropdown,
  ConfigProvider,
} from "antd";
// import FilterTable from "../FilterTable";
// import { ExportTable } from "../ExportTable";
// import SettingTable from "../SettingTable";
// import { EmptyList, NoResultFound, Search } from "@/components/common";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { DocxIcon, FilterIcon, ReloadIcon } from "@/icons";

// hooks
import { useTranslations } from "next-intl";
import usePostTable from "./useTable";
import { useExportTable } from "./useExportTable";

// models
import type { ColumnsType } from "antd/es/table";
// import { FilterOption } from "@/models/filter.model";

// libs
import classNames from "classnames";

interface Props {
  columns: ColumnsType;
  queryConfig: {
    queryKey: any;
    queryFn: any;
  };
  // exportConfig?: {
  //   mutationFn: any;
  //   headers: string[];
  //   fileName: string;
  // };
  // exportOptions?: FilterOption[];
  searchPlaceholder?: string;
  scroll?: {
    x?: any;
    y?: any;
  };
  showIndex?: boolean;
  // filterOptions?: FilterOption[];
  onClickAdd?: () => void;
  // onClickImport?: () => void;
  addText?: string;
  addIcon?: React.ReactNode;
  title?: React.ReactNode;
  hardcodeFilter?: any;
  extraFilterRight?: JSX.Element;
  extraFilterLeft?: JSX.Element;
  rowKey?: any;
}

const PostTable = ({
  scroll = {
    x: 600,
    y: "calc(100vh - 15.5rem)",
  },
  title,
  ...props
}: Props) => {
  const t = useTranslations();
  const {
    columns,
    // filterOptions,
    queryConfig,
    // exportConfig,
    // exportOptions,
    searchPlaceholder,
    showIndex,
    onClickAdd,
    // onClickImport,
    addText,
    addIcon,
    hardcodeFilter,
    extraFilterRight,
    extraFilterLeft,
    ...rest
  } = props;

  const {
    filterForm,
    filter,
    openFilter,
    countFilter,
    searchValue,
    handleChangeTable,
    handleChangePagination,
    handleCloseFilter,
    handleSubmitFilter,
    handleOpenFilter,
    handleSearch,
    tableQuery,
    openSetting,
    handleOpenSettingChange,
    handleCloseSetting,
    handleSubmitSetting,
    handleResetSetting,
    mergeColumns,
    settingData,
    settings,
  } = usePostTable({ queryConfig, columns, showIndex, hardcodeFilter });

  const {
    exportForm,
    openExport,
    exportLoading,
    handleOpenExport,
    onCloseExport,
    handleClickExport,
  } = useExportTable({
    filter,
    exportConfig,
    hardcodeFilter,
  });

  return (
    <div className="d-flex column gap-24 h-100">
      <div className="d-flex gap-4 justify-space-between align-center">
        <span className="color-neutral-900 text-600 text-h3">{title}</span>
        <div className="d-flex gap-16">
          {extraFilterLeft}

          <Search
            placeholder={searchPlaceholder ?? t("Search")}
            onChange={(event) => handleSearch(event.target.value)}
            allowClear
            style={{ width: "270px" }}
          />
          <div className="d-flex align-center gap-8">
            <ReloadIcon
              className="material-symbols-outlined color-neutral-500 text-h3 pointer"
              onClick={() => tableQuery.refetch()}
            />
            {filterOptions && (
              <div onClick={handleOpenFilter} className="pointer">
                <Badge
                  size="small"
                  count={countFilter}
                  style={{ zIndex: 1 }}
                  className={styles.badge}
                >
                  <FilterIcon className="material-symbols-outlined color-neutral-500" />
                </Badge>
              </div>
            )}
            <Dropdown
              destroyPopupOnHide
              dropdownRender={() => (
                <>
                  <SettingTable
                    settingData={settingData}
                    settings={settings}
                    onClose={handleCloseSetting}
                    onSubmit={handleSubmitSetting}
                    onResetSetting={handleResetSetting}
                  />
                </>
              )}
              trigger={["click"]}
              placement="bottomLeft"
              arrow={{ pointAtCenter: true }}
              open={openSetting}
              onOpenChange={handleOpenSettingChange}
            >
              <span className="material-symbols-outlined color-neutral-500 text-h3 pointer">
                settings
              </span>
            </Dropdown>
          </div>
          {onClickAdd && (
            <Button
              onClick={onClickAdd}
              type="primary"
              icon={
                addIcon || (
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#fff", fontSize: 14 }}
                  />
                )
              }
            >
              {addText || t("Add")}
            </Button>
          )}
          {onClickImport && (
            <Button onClick={onClickImport} type="default" icon={<DocxIcon />}>
              {t("Import")}
            </Button>
          )}
          {exportConfig?.mutationFn && (
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faFileExport} />}
              onClick={handleOpenExport}
            >
              {t("Export")}
            </Button>
          )}
          {extraFilterRight}
        </div>
      </div>
      <div className={styles.table}>
        <ConfigProvider
          renderEmpty={() => {
            return (
              <div
                style={{ height: "calc(100vh - 20.5rem)" }}
                className="d-flex justify-center"
              >
                {countFilter > 0 || searchValue ? (
                  <NoResultFound />
                ) : (
                  <EmptyList />
                )}
              </div>
            );
          }}
        >
          <Table
            pagination={false}
            columns={mergeColumns as any}
            dataSource={tableQuery?.data?.data?.docs}
            loading={tableQuery?.isFetching}
            rowKey="_id"
            scroll={{
              ...scroll,
              scrollToFirstRowOnChange: true,
            }}
            onChange={handleChangeTable}
            expandable={{
              showExpandColumn: false,
            }}
            className={classNames([
              {
                [styles["empty-data"]]: !tableQuery?.data?.data?.docs?.length,
              },
            ])}
            {...rest}
          />
          <Pagination
            style={{ color: "var(--color-neutral-400)" }}
            current={Number(tableQuery?.data?.data?.paging?.currentPage || 1)}
            pageSize={Number(tableQuery?.data?.data?.paging?.pageSize || 20)}
            total={Number(tableQuery?.data?.data?.paging?.totalSize || 0)}
            pageSizeOptions={[10, 20, 50]}
            onChange={handleChangePagination}
            showTotal={(total) => (
              <div>{`${t("Total")} ${total} ${t("items")}`} </div>
            )}
            hideOnSinglePage
            className="pr-16"
          />
        </ConfigProvider>
      </div>
      {filterOptions && (
        <FilterTable
          form={filterForm}
          open={openFilter}
          filterOptions={filterOptions}
          onClose={handleCloseFilter}
          onSubmitFilter={handleSubmitFilter}
        />
      )}
      <ExportTable
        form={exportForm}
        open={openExport}
        onClose={onCloseExport}
        filterOptions={exportOptions || []}
        onClickExport={handleClickExport}
        loading={exportLoading}
      />
    </div>
  );
};

export default PostTable;
