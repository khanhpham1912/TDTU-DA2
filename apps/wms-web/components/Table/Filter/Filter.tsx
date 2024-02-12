// components
import { Col, Form, Row, Select } from "antd";

// icons

// hooks
import { useTranslations } from "next-intl";

// models
import { useCallback } from "react";
import { FilterOption } from "./filter.config";

interface Props {
  form: any;
  filterOptions: FilterOption[];
  onSubmitFilter: (values: any) => void;
}

const getFilterItem = (filter: FilterOption, t: any) => {
  switch (filter.filterType) {
    case "Select":
      return (
        <Select
          allowClear
          placeholder={t("Select")}
          {...filter.selectConfig}
          style={{ width: "170px" }}
        />
      );
    default:
      break;
  }
};

const Filter = ({ form, filterOptions, onSubmitFilter }: Props) => {
  const t = useTranslations();

  const handleResetForm = async () => {
    form.resetFields();
    onSubmitFilter({});
  };

  const handleSubmitFilter = useCallback(async () => {
    try {
      const values = await form.getFieldsValue();
      onSubmitFilter(values);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [form, onSubmitFilter]);

  const afterOpenChange = useCallback((visible: boolean) => {
    if (typeof window !== "undefined") {
      if (visible) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    }
  }, []);

  return (
    <Form
      form={form}
      layout="horizontal"
      onValuesChange={() => handleSubmitFilter()}
    >
      <div className="flex gap-2">
        {filterOptions?.map((filter, key) => {
          return (
            <Form.Item
              style={{ marginBottom: "0px" }}
              name={filter.formName}
              label={filter.label}
            >
              {getFilterItem(filter, t)}
            </Form.Item>
          );
        })}
      </div>
    </Form>
  );
};
export default Filter;
