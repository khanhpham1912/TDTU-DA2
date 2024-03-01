import { FORMAT_DATE } from "@/configs/date.config";
import { TimePicker as ATimePicker, TimePickerProps } from "antd";

// hooks
import { useTranslations } from "next-intl";

// libs
import dayjs from "dayjs";

interface Props {
  value?: any;
  onChange?: (value: any) => void;
}

export const TimePicker = (props: Props & TimePickerProps & any) => {
  const t = useTranslations();
  const { value, onChange, ...rest } = props;

  return (
    <ATimePicker
      style={{ width: "100%" }}
      format={`HH:mm`}
      placeholder={t("Select time")}
      onChange={onChange}
      value={value ? dayjs(value) : null}
      {...rest}
    />
  );
};
