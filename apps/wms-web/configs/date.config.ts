import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

export const FORMAT_DATE = "DD/MM/YYYY";

export const disabledBeforeAndToday: RangePickerProps["disabledDate"] = (
  current
) => {
  return current < dayjs().endOf("day");
};

export const disabledBefore: RangePickerProps["disabledDate"] = (current) => {
  return current < dayjs().startOf("day");
};

export const disabledAfterAndToday: RangePickerProps["disabledDate"] = (
  current
) => {
  return current > dayjs().startOf("day");
};

export const disabledAfter: RangePickerProps["disabledDate"] = (current) => {
  return current > dayjs().endOf("day");
};
