import styles from "./styles.module.scss";

// components
import { Table, Pagination, Button, Input } from "antd";
// import FilterTable from "../FilterTable";
// import { ExportTable } from "../ExportTable";
// import SettingTable from "../SettingTable";
// import { EmptyList, NoResultFound, Search } from "@/components/common";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
// import { DocxIcon, FilterIcon, ReloadIcon } from "@/icons";

// hooks
import { useTranslations } from "next-intl";
import usePostTable from "./useTable";

// models
import type { ColumnsType } from "antd/es/table";
import Filter from "./Filter";
import { FilterOption } from "./Filter/filter.config";
import { SearchOutlined } from "@ant-design/icons";
// import { FilterOption } from "@/models/filter.model";

// libs

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
  filterOptions?: FilterOption[];
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
    filterOptions,
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
    handleChangePagination,
    handleSubmitFilter,
    handleSearch,
    tableQuery,
    mergeColumns,
  } = usePostTable({ queryConfig, columns, showIndex, hardcodeFilter });

  return (
    <div className="flex flex-col gap-6 h-100">
      <div className="d-flex gap-4 justify-space-between align-center">
        <span className="color-neutral-900 text-600 text-h3">{title}</span>
        <div className="flex gap-4 justify-between">
          <Input
            placeholder={searchPlaceholder ?? t("Search")}
            suffix={<SearchOutlined className="text-base" />}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.search}
          />
          <div className="flex items-center gap-2">
            {extraFilterLeft}

            <Filter
              onSubmitFilter={handleSubmitFilter}
              form={filterForm}
              filterOptions={filterOptions ?? []}
            />
            <FontAwesomeIcon
              icon={faRotateRight}
              style={{ color: "#8d97a6", fontSize: "20px" }}
              className="cursor-pointer"
              onClick={() => tableQuery.refetch()}
            />
            {/* <ReloadIcon
              className="material-symbols-outlined color-neutral-500 text-h3 pointer"
              onClick={() => tableQuery.refetch()}
            /> */}
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

            {extraFilterRight}
          </div>
        </div>
      </div>
      <div className={styles.table}>
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
          expandable={{
            showExpandColumn: false,
          }}
          {...rest}
        />
        <Pagination
          style={{ color: "var(--color-neutral-400)" }}
          current={Number(tableQuery?.data?.data?.paging?.currentPage || 1)}
          pageSize={Number(tableQuery?.data?.data?.paging?.pageSize || 20)}
          total={Number(tableQuery?.data?.data?.paging?.totalSize || 0)}
          pageSizeOptions={[10, 20, 50]}
          onChange={handleChangePagination}
          showTotal={(total) => <div>{`${t("Total")} ${total}`} </div>}
          hideOnSinglePage
          className="pr-16"
        />
      </div>
    </div>
  );
};

export default PostTable;
