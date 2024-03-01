import {
  Select,
  Input,
  Checkbox,
  Row,
  Col,
  Radio,
  Switch,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import { search } from "common-ui/lib/configs";
import { CustomFieldMapping } from "wms-models/lib/custom.field.mapping";
import { ECustomFieldType } from "wms-models/lib/shared";
import { DragAndDrop, DateTimePicker, RangePicker } from "../common";
import {
  displayValue,
  displayPhone,
  displayNumber,
  displayDate,
} from "common-ui/lib/utils/view.utility";

export const renderFormField = (field: CustomFieldMapping, t: any) => {
  const placeholder = t("Enter");
  const customField = field?.customField;
  const extraData = customField?.extraData;

  switch (customField?.type) {
    case ECustomFieldType.SELECT:
      const selectConfig = extraData?.selectConfig;
      return (
        <Select
          allowClear
          placeholder={t("Please select")}
          {...search}
          mode={selectConfig?.multiple ? "multiple" : undefined}
          options={selectConfig?.options?.map?.((option) => {
            return {
              value: option,
              label: option,
            };
          })}
          style={{ width: "100%" }}
        />
      );
    case ECustomFieldType.TEXT:
      return <Input allowClear placeholder={placeholder} />;
    case ECustomFieldType.EMAIL:
      return <Input allowClear placeholder={placeholder} />;
    case ECustomFieldType.PHONE:
      return <Input allowClear placeholder={placeholder} maxLength={10} />;
    case ECustomFieldType.CHECKBOX:
      const checkboxConfig = extraData?.checkboxConfig;
      return (
        <Checkbox.Group style={{ width: "100%" }}>
          <Row gutter={[16, 8]}>
            {checkboxConfig?.options?.map?.((item, key) => {
              return (
                <Col key={key} xs={24}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      );
    case ECustomFieldType.RADIO:
      const radioConfig = extraData?.radioConfig;
      return (
        <Radio.Group>
          <Row gutter={[16, 8]}>
            {radioConfig?.options?.map?.((item, key) => {
              return (
                <Col key={key} xs={24}>
                  <Radio value={item}>{item}</Radio>
                </Col>
              );
            })}
          </Row>
        </Radio.Group>
      );
    case ECustomFieldType.SWITCH:
      return <Switch />;
    case ECustomFieldType.NOTE:
      return <Input.TextArea placeholder={placeholder} rows={5} />;
    case ECustomFieldType.NUMBER:
      const numberConfig = extraData?.numberConfig || {};
      return (
        <InputNumber
          placeholder={placeholder}
          style={{ width: "100%" }}
          {...numberConfig}
        />
      );
    case ECustomFieldType.ATTACHMENT:
      const attachmentConfig = extraData?.attachmentConfig;
      return (
        <DragAndDrop
          filePath={attachmentConfig?.filePath}
          fileType={
            attachmentConfig?.fileType || [
              "image/jpeg",
              "image/png",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]
          }
          maxCount={attachmentConfig?.maxCount || 10}
          fileSize={attachmentConfig?.fileSize || 5}
        />
      );
    case ECustomFieldType.DATE:
      return <DatePicker />;
    case ECustomFieldType.DATE_TIME:
      return <DateTimePicker />;
    case ECustomFieldType.TIME:
      return <TimePicker />;
    case ECustomFieldType.RANGE_PICKER:
      return <RangePicker style={{ maxWidth: "500px" }} />;
    // case ECustomFieldType.ADDRESS:
    //   return <LocationSelect />;
    default:
      break;
  }
};

export const renderViewField = (
  field: CustomFieldMapping & { value: any },
  t: any
) => {
  const customField = field?.customField;
  const extraData = customField?.extraData;
  const value = field?.value;

  switch (customField?.type) {
    case ECustomFieldType.SELECT:
      const selectConfig = extraData?.selectConfig;
      if (selectConfig?.multiple) {
        return <span>{value?.join?.(", ")}</span>;
      } else {
        return <span>{displayValue(value)}</span>;
      }
    case ECustomFieldType.TEXT:
      return <span>{value}</span>;
    case ECustomFieldType.EMAIL:
      return <span>{displayValue(value)}</span>;
    case ECustomFieldType.PHONE:
      return <span>{displayPhone(value)}</span>;
    case ECustomFieldType.CHECKBOX:
      return <span>{value?.join?.(", ")}</span>;
    case ECustomFieldType.RADIO:
      return <span>{displayValue(value)}</span>;
    case ECustomFieldType.SWITCH:
      return <span>{value ? t("Yes") : t("No")}</span>;
    case ECustomFieldType.NOTE:
      return <span>{displayValue(value)}</span>;
    case ECustomFieldType.NUMBER:
      return <span>{displayNumber(value)}</span>;
    case ECustomFieldType.ATTACHMENT:
      return value || !!value?.length ? (
        <DragAndDrop mode="preview" value={value} />
      ) : (
        "-"
      );
    case ECustomFieldType.DATE:
      return <span>{displayDate(value)}</span>;
    case ECustomFieldType.DATE_TIME:
      return <span>{displayDate(value, "HH:mm DD/MM/YYYY")}</span>;
    case ECustomFieldType.TIME:
      return <span>{displayDate(value, "HH:mm")}</span>;
    case ECustomFieldType.RANGE_PICKER:
      return (
        <span>{`${displayDate(value?.from)} - ${displayDate(value?.to)}`}</span>
      );
    // case ECustomFieldType.ADDRESS:
    //   return <span>{displayValue(value?.address?.path)}</span>;
    default:
      <></>;
  }
};
