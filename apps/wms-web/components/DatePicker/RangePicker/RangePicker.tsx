"use client";
import { DatePicker, TimeRangePickerProps } from "antd";

// hooks
import { useTranslations } from "next-intl";
import { useCallback } from "react";

// libs
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { FORMAT_DATE } from "@/configs/date.config";

const RangePicker = ({
  value,
  onChange,
  ...rest
}: {
  value?: any;
  onChange?: (value: any) => void;
} & TimeRangePickerProps) => {
  const t = useTranslations();

  const handleChange = useCallback(
    (dates: any) => {
      onChange?.({
        from: dates?.[0]
          ? dayjs(dates?.[0])
              .startOf("day")
              .toISOString()
          : null,
        to: dates?.[1]
          ? dayjs(dates?.[1])
              .endOf("day")
              .toISOString()
          : null,
      });
    },
    [onChange]
  );

  return (
    <DatePicker.RangePicker
      style={{ width: "100%" }}
      placeholder={[`${t("From")}`, `${t("To")}`]}
      onChange={handleChange}
      format={FORMAT_DATE}
      value={[
        value?.from ? dayjs(value?.from) : null,
        value?.to ? dayjs(value?.to) : null,
      ]}
      {...rest}
    />
  );
};

export default RangePicker;
