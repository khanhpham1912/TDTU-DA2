import dayjs from "dayjs";
import { Dimension } from "wms-models/lib/items";

const FORMAT_DATE = "DD/MM/YYYY";

const FORMAT_DATE_TIME = "DD/MM/YYYY HH:mm:ss";
export const displayValue = (value: any): string => {
  return value || "-";
};

export const displayDate = (value: any, format = FORMAT_DATE): string => {
  return value ? dayjs(value).format(format) : "-";
};

export const displayDateTime = (
  value: any,
  format = FORMAT_DATE_TIME
): string => {
  return value ? dayjs(value).format(format) : "-";
};

export const displayPhone = (phoneNumber: string): string => {
  if (phoneNumber === undefined || phoneNumber === null) {
    return "-";
  }
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const formattedPhoneNumber = cleanedPhoneNumber.replace(
    /(\d{4})(\d{3})(\d{3})/,
    "$1 $2 $3"
  );
  return formattedPhoneNumber;
};

export const displayRangeDate = (
  value: { from: any; to: any },
  format = FORMAT_DATE
): string => {
  return value?.from
    ? `${dayjs(value.from).format(format)} - ${dayjs(value.to).format(format)}`
    : "-";
};

export const displayNumber = (number: number | string): string => {
  if (!number) return "0";
  const num =
    typeof number === "string" ? parseInt(number.toString(), 10) : number;
  return num?.toLocaleString("en-US");
};

export const displayLocaleText =
  (locale: string) =>
  (value: any): string => {
    return displayValue(value?.[locale]);
  };

export const displayDimension = (dimension: Dimension | undefined) =>
  dimension
    ? `${dimension?.length}x${dimension?.width}x${dimension?.height}`
    : "-";
