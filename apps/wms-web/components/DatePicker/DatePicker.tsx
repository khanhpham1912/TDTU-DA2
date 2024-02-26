"use client";
import { FORMAT_DATE } from "@/configs/date.config";
import { DatePicker, DatePickerProps } from "antd";

// hooks
import { useTranslations } from "next-intl";
import { useCallback } from "react";

// libs
import dayjs from "dayjs";

interface Props {
  value?: any;
  onChange?: (value: any) => void;
  timeMode?: "normal" | "startOfDay";
}

const CustomDatePicker = ({
  timeMode = "normal",
  ...props
}: Props & DatePickerProps) => {
  const t = useTranslations();
  const { value, onChange, ...rest } = props;

  const handleChange = useCallback(
    (value: any) => {
      if (timeMode === "startOfDay") {
        onChange?.(dayjs(value).startOf("day").toISOString());
      } else {
        onChange?.(dayjs(value).toISOString());
      }
    },
    [onChange, timeMode]
  );

  return (
    <DatePicker
      style={{ width: "100%" }}
      placeholder={t("Select date")}
      onChange={handleChange}
      format={FORMAT_DATE}
      value={value ? dayjs(value) : null}
      {...rest}
    />
  );
};

export default CustomDatePicker;
