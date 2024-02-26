import styles from "./styles.module.scss";
import classNames from "classnames";
import { CSSProperties } from "react";

// hooks
import { usePostList } from "./usePostList";
import { useTranslations } from "next-intl";

// components
import { Input, Pagination, Skeleton } from "antd";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

export const PostList = ({
  queryConfig,
  renderItem,
  hardcodeFilter,
  selects,
  className,
  style,
  extraHeader,
  headerClassName,
  headerStyle,
  contentClassName,
  contentStyle,
  footerClassName,
  footerStyle,
  searchPlaceholder,
  showSearch = true,
  showRefresh = true,
}: {
  queryConfig: {
    queryKey: string;
    queryFn: any;
  };
  renderItem: (item: any) => React.ReactNode;
  hardcodeFilter?: any;
  selects?: string[];
  className?: any;
  style?: CSSProperties;
  extraHeader?: React.ReactNode;
  headerClassName?: any;
  headerStyle?: CSSProperties;
  contentClassName?: any;
  contentStyle?: CSSProperties;
  footerClassName?: any;
  footerStyle?: CSSProperties;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showRefresh?: boolean;
}) => {
  const t = useTranslations();
  const { listQuery, handleSearch, handleChangePagination } = usePostList({
    queryConfig,
    hardcodeFilter,
    selects,
  });

  return (
    <div className={classNames([styles["list-view"], className])} style={style}>
      <div
        className={classNames([styles["header"], headerClassName])}
        style={headerStyle}
      >
        {extraHeader}
        <div className="d-flex gap-8">
          {showSearch && (
            <Input
              placeholder={searchPlaceholder ?? t("Search")}
              onChange={(event) => handleSearch(event.target.value)}
              allowClear
            />
          )}
          {showRefresh && (
            <div className={styles.refresh} onClick={() => listQuery.refetch()}>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames([styles["content"], contentClassName])}
        style={contentStyle}
      >
        <>
          {listQuery?.isFetching && (
            <div className="d-flex column gap-16 px-8">
              {Array.from({ length: 3 }, (_, key) => {
                return (
                  <Skeleton key={key} avatar paragraph={{ rows: 3 }} active />
                );
              })}
            </div>
          )}
          {!listQuery?.isFetching && (
            <>
              {listQuery?.data?.data?.docs?.length && (
                listQuery?.data?.data?.docs?.map?.((item: any) =>
                  renderItem(item)
                )
              )}
            </>
          )}
        </>
      </div>

      <div
        className={classNames([styles["footer"], footerClassName])}
        style={footerStyle}
      >
        {listQuery?.data?.data?.paging?.pageTotal &&
        listQuery?.data?.data?.paging?.pageTotal > 1 ? (
          <Pagination
            hideOnSinglePage
            onChange={handleChangePagination}
            current={Number(listQuery?.data?.data?.paging?.currentPage || 1)}
            pageSize={Number(listQuery?.data?.data?.paging?.pageSize || 20)}
            total={Number(listQuery?.data?.data?.paging?.totalSize || 0)}
          />
        ) : undefined}
      </div>
    </div>
  );
};
