// libs
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_PAGING = {
  currentPage: 1,
  pageSize: 15,
};

const DEFAULT_SORT = {
  sortBy: "createdAt",
  sortType: "DESC",
};

export const usePostList = ({
  queryConfig,
  hardcodeFilter,
  selects = [],
}: {
  queryConfig: {
    queryKey: string;
    queryFn: any;
  };
  hardcodeFilter?: any;
  selects?: string[];
}) => {
  const [filterParams, setFilterParams] = useState<{
    filter: any;
    paging: {
      currentPage: number;
      pageSize: number;
    };
    sort: {
      sortBy: string;
      sortType: string;
    };
    search: string;
  }>({
    filter: { ...hardcodeFilter },
    paging: DEFAULT_PAGING,
    sort: DEFAULT_SORT,
    search: "",
  });

  const listQuery = useQuery({
    queryKey: [queryConfig.queryKey, { ...filterParams }],
    queryFn: () =>
      queryConfig.queryFn({
        ...filterParams,
        selects,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, filter: { ...hardcodeFilter } }));
  }, [hardcodeFilter]);

  const handleChangePagination = (currentPage: number, pageSize: number) => {
    const _filterParams = JSON.parse(JSON.stringify(filterParams));
    _filterParams.paging = {
      currentPage,
      pageSize,
    };
    setFilterParams(_filterParams);
  };

  const handleSearch = useCallback(
    (value: string) => {
      const _filterParams = JSON.parse(JSON.stringify(filterParams));
      _filterParams.search = value;
      _filterParams.paging = DEFAULT_PAGING;
      setFilterParams(_filterParams);
    },
    [filterParams]
  );

  return { listQuery, handleChangePagination, handleSearch };
};
