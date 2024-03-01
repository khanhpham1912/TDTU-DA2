"use client";
import { FORMAT_DATE } from "@/configs/date.config";
import { DatePicker, DatePickerProps } from "antd";

// hooks
import { useTranslations } from "next-intl";

// libs
import dayjs from "dayjs";
import { useCallback } from "react";

interface Props {
  value?: any;
  onChange?: (value: any) => void;
}

const DateTimePicker = (props: Props & DatePickerProps & any) => {
  const t = useTranslations();
  const { value, onChange, ...rest } = props;

  const handleChange = useCallback(
    (value: any) => {
      onChange?.(dayjs(value).toISOString());
    },
    [onChange]
  );

  return (
    <DatePicker
      style={{ width: "100%" }}
      format={`${FORMAT_DATE} HH:mm`}
      placeholder={t("Select date")}
      onChange={handleChange}
      value={value ? dayjs(value) : null}
      showTime={{
        hideDisabledOptions: true,
        format: "HH:mm",
        defaultValue: dayjs("00:00:00", "HH:mm"),
      }}
      {...rest}
    />
  );
};

export default DateTimePicker;
