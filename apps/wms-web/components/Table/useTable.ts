// libs
import { useQuery, useMutation } from "@tanstack/react-query";

// services
import { updateUserSetting } from "@/services/setting.service";

// hooks
import { useCallback, useMemo, useState, useContext, useEffect } from "react";

// utils
import ObjectUtility from "@/utils/object.utility";
import { countValues } from "@/utils/filter.utility";
import { CreateOrUpdateUserSetting } from "oms-models/lib/user.setting";
// contexts
import CommonContext from "@/contexts/CommonContext";

const DEFAULT_PAGING = {
  currentPage: 1,
  pageSize: 20,
};

const DEFAULT_SORT = {
  sortBy: "createdAt",
  sortType: "DESC",
};

// models
import type { TableProps } from "antd/es/table";
import { Form } from "antd";

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
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const { setting, setSetting, isReady } = useContext(CommonContext);
  const [filterForm] = Form.useForm();

  const settingKey = useMemo(() => {
    return queryConfig.queryKey;
  }, [queryConfig.queryKey]);

  const settings = useMemo(() => {
    const extra = columns.find((column) => !!column.extraData);
    const extraSelects: string[] = [];
    if (!!extra?.extraData) {
      const splitItems = extra?.extraData
        ?.split(",")
        .map((value: string) => value.trim());
      extraSelects.push(...splitItems);
    }
    if (settingKey && !!setting?.[settingKey]?.length) {
      return [...setting[settingKey], ...extraSelects]?.filter((item) => {
        return !!item;
      });
    } else {
      const defaultSettings = columns
        ?.filter((col) => col.isDefault && !!col.key)
        ?.map((col) => col.key);
      return [...defaultSettings, ...extraSelects];
    }
  }, [columns, setting, settingKey]);

  const settingMutation = useMutation({
    mutationFn: (request: CreateOrUpdateUserSetting) =>
      updateUserSetting(request),
  });

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

  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, filter: { ...hardcodeFilter } }));
    // Reset filter form when change hardcodeFilter
    filterForm.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardcodeFilter]);

  const filter = useMemo(() => {
    return filterParams.filter as any;
  }, [filterParams]);

  const searchValue = useMemo(() => {
    return filterParams.search;
  }, [filterParams]);

  const countFilter = useMemo(() => {
    const hardcodeKeys = Object.keys(hardcodeFilter || []);
    const values: any = [];
    hardcodeKeys.map((key: string) => {
      values.push(hardcodeFilter[key]);
    });
    if (countValues(filter) < values.flat().length) {
      return countValues(filter);
    }
    return countValues(filter) - values.flat().length;
  }, [filter, hardcodeFilter]);

  const tableQuery = useQuery({
    queryKey: [
      queryConfig.queryKey,
      { ...filterParams, selects: settings || [] },
    ],
    queryFn: () =>
      queryConfig.queryFn({
        ...filterParams,
        selects: settings || [],
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: isReady,
    retry: false,
    onSuccess: (response) => {
      const pagination = response?.data?.paging;
      if (pagination?.currentPage > pagination?.pageTotal) {
        const _filterParams = JSON.parse(JSON.stringify(filterParams));
        _filterParams.paging.currentPage = pagination?.pageTotal;
        setFilterParams(_filterParams);
      }
    },
  });

  const handleChangeTable: TableProps<any>["onChange"] = useCallback(
    (_pagination: any, _filters: any, sorter: any, _extra: any) => {
      let sort = DEFAULT_SORT;
      const _filterParams = JSON.parse(JSON.stringify(filterParams));
      if (sorter.order) {
        sort = {
          sortBy: sorter.columnKey,
          sortType: sorter.order === "ascend" ? "ASC" : "DESC",
        };
      }
      _filterParams.sort = sort;
      setFilterParams(_filterParams);
    },
    [filterParams]
  );

  const handleChangePagination = (currentPage: number, pageSize: number) => {
    const _filterParams = JSON.parse(JSON.stringify(filterParams));
    _filterParams.paging = {
      currentPage,
      pageSize,
    };
    setFilterParams(_filterParams);
  };

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

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
        handleCloseFilter();
      } catch (error) {
        console.error(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterParams, handleCloseFilter, hardcodeFilter]
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

  const handleOpenSettingChange = useCallback((flag: boolean) => {
    setOpenSetting(flag);
  }, []);

  const handleCloseSetting = useCallback(() => {
    setOpenSetting(false);
  }, []);

  const handleSubmitSetting = useCallback(
    (values: string[]) => {
      if (settingKey) {
        const _setting = JSON.parse(JSON.stringify(setting || {}));
        _setting[settingKey] = [...values];
        settingMutation.mutate({
          key: settingKey,
          data: values,
        });
        setSetting(_setting);
      }
      setOpenSetting(false);
    },
    [setSetting, settingMutation, setting, settingKey]
  );

  const settingData = useMemo(() => {
    return columns
      ?.filter((item) => !item.extraData)
      ?.map((item) => {
        return {
          value: item.key,
          label: item.title,
          disabled: item.isDefault,
        };
      });
  }, [columns]);

  const mergeColumns = useMemo(() => {
    if (showIndex) {
      return [
        {
          title: "#",
          dataIndex: "index",
          width: "60px",
          align: "right",
          render: (_: any, __: any, index: number) => index + 1,
        },
        ...columns.filter((col: any) => {
          return settings?.includes(col?.key) || col?.isDefault === true;
        }),
      ];
    } else {
      return [
        ...columns.filter((col: any) => {
          return settings?.includes(col?.key) || col?.isDefault === true;
        }),
      ];
    }
  }, [columns, settings, showIndex]);

  const handleResetSetting = useCallback(() => {
    if (settingKey) {
      const resetSetting = columns
        ?.filter((col) => col.isDefault)
        ?.map((col) => {
          return col.key;
        });
      const _setting = JSON.parse(JSON.stringify(setting));
      _setting[settingKey] = resetSetting;
      setSetting(_setting);
      settingMutation.mutate({
        key: settingKey,
        data: resetSetting,
      });
    }
    setOpenSetting(false);
  }, [columns, setSetting, settingMutation, setting, settingKey]);

  return {
    filterForm,
    openFilter,
    countFilter,
    searchValue,
    filter,
    tableQuery,
    handleChangeTable,
    handleChangePagination,
    handleOpenFilter,
    handleCloseFilter,
    handleSubmitFilter,
    handleSearch,
    openSetting,
    handleOpenSettingChange,
    handleCloseSetting,
    handleSubmitSetting,
    handleResetSetting,
    mergeColumns,
    settingData,
    settings,
  };
};

export default usePostTable;
