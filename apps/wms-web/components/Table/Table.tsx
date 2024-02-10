import styles from "./styles.module.scss";

// components
import { Table, Pagination, Button, Input } from "antd";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";

// hooks
import { useTranslations } from "next-intl";
import usePostTable from "./useTable";

// models
import type { ColumnsType } from "antd/es/table";
import Filter from "./Filter";
import { FilterOption } from "./Filter/filter.config";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  columns: ColumnsType;
  queryConfig: {
    queryKey: any;
    queryFn: any;
  };
  searchPlaceholder?: string;
  scroll?: {
    x?: any;
    y?: any;
  };
  showIndex?: boolean;
  filterOptions?: FilterOption[];
  onClickAdd?: () => void;
  addText?: string;
  addIcon?: React.ReactNode;
  title?: React.ReactNode;
  hardcodeFilter?: any;
  extraFilterRight?: JSX.Element;
  extraFilterLeft?: JSX.Element;
  rowKey?: any;
  dataSource?: any;
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
    searchPlaceholder,
    showIndex,
    onClickAdd,
    addText,
    addIcon,
    hardcodeFilter,
    extraFilterRight,
    extraFilterLeft,
    dataSource,
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
      <div className="flex gap-1 justify-between items-center">
        <div className="flex gap-1 justify-between items-center">
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

            {extraFilterRight}
          </div>
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
      </div>
      <div className={styles.table}>
        <Table
          pagination={false}
          columns={mergeColumns as any}
          dataSource={dataSource ?? tableQuery?.data?.data?.docs}
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
