// libs
import { useQuery, useQueryClient } from "@tanstack/react-query";

// services

// hooks
import { useCallback, useMemo, useState, useEffect } from "react";

// utils
import ObjectUtility from "@/utils/object.utility";
// contexts

const DEFAULT_PAGING = {
  currentPage: 1,
  pageSize: 20,
};

// models
import { Form } from "antd";
import { useTranslations } from "next-intl";

interface Props {
  queryConfig: {
    queryKey: any;
    queryFn: any;
  };
  columns: any[];
  showIndex?: boolean;
  hardcodeFilter?: any;
}

const usePostTable = (props: Props) => {
  const { queryConfig, columns, showIndex, hardcodeFilter } = props;
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [filterForm] = Form.useForm();

  const [filterParams, setFilterParams] = useState<{
    filter: any;
    paging: {
      currentPage: number;
      pageSize: number;
    };
    search: string;
  }>({
    filter: { ...hardcodeFilter },
    paging: DEFAULT_PAGING,
    search: "",
  });

  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, filter: { ...hardcodeFilter } }));
    filterForm.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardcodeFilter]);

  const filter = useMemo(() => {
    return filterParams.filter as any;
  }, [filterParams]);

  const tableQuery = useQuery({
    queryKey: [queryConfig.queryKey, { ...filterParams }],
    queryFn: () =>
      queryConfig.queryFn({
        ...filterParams,
      }),
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    // enabled: isReady,
    retry: false,
    onSuccess: (response) => {
      const paging = response?.data?.paging;
      if (paging?.currentPage > paging?.pageSize) {
        const _filterParams = JSON.parse(JSON.stringify(filterParams));
        _filterParams.paging.currentPage = paging?.pageSize;
        setFilterParams(_filterParams);
      }
    },
  });

  const handleChangePagination = (currentPage: number, pageSize: number) => {
    const _filterParams = JSON.parse(JSON.stringify(filterParams));
    _filterParams.paging = {
      currentPage,
      pageSize,
    };
    setFilterParams(_filterParams);
  };

  const handleSubmitFilter = useCallback(
    async (values: any) => {
      try {
        const _filterParams = JSON.parse(JSON.stringify(filterParams));
        const filter = ObjectUtility.omitValue({ ...values }, [{}, undefined]);
        _filterParams.filter = {
          ...hardcodeFilter,
          ...filter,
        };

        _filterParams.paging = DEFAULT_PAGING;
        setFilterParams(_filterParams);
      } catch (error) {
        console.error(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterParams, hardcodeFilter]
  );

  const handleSearch = useCallback(
    (value: string) => {
      const _filterParams = JSON.parse(JSON.stringify(filterParams));
      _filterParams.search = value;
      _filterParams.paging = DEFAULT_PAGING;
      setFilterParams(_filterParams);
    },
    [filterParams]
  );

  const mergeColumns = useMemo(() => {
    if (showIndex) {
      return [
        {
          title: t("No"),
          dataIndex: "index",
          width: 70,
          fixed: "left",
          align: "center",
          render: (_: any, __: any, index: number) => index + 1,
        },
        ...columns,
      ];
    } else {
      return columns;
    }
  }, [columns, showIndex]);

  return {
    filterForm,
    // searchValue,
    filter,
    tableQuery,
    handleChangePagination,
    handleSubmitFilter,
    handleSearch,
    mergeColumns,
  };
};

export default usePostTable;
