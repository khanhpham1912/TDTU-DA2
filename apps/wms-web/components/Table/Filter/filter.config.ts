import { SelectProps } from "antd/es/select";

export type Option = {
  value: any;
  label: any;
};

type FilterType = "Select";

interface FilterOptionsBase {
  filterType: FilterType;
  formName: string;
  label: string;
}

interface SelectConfig extends FilterOptionsBase {
  filterType: "Select";
  selectConfig: SelectProps;
}

export type FilterOption = SelectConfig;
