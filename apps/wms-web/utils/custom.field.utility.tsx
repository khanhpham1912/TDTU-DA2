import {
  BooleanFieldIcon,
  NoteFieldIcon,
  NumberFieldIcon,
  SelectFieldIcon,
  TextFieldIcon,
  DateTimeIcon,
  TimeIcon,
  CheckboxIcon,
  RadioIcon,
  ImageIcon,
} from "@/icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { ECustomFieldType } from "wms-models/lib/shared";

export const FieldDefinitionsIconMapping: Record<ECustomFieldType, ReactNode> =
  {
    [ECustomFieldType.TEXT]: (
      <TextFieldIcon className="text-xl text-gray-500" />
    ),
    [ECustomFieldType.NUMBER]: (
      <NumberFieldIcon className="text-xl text-gray-500" />
    ),
    [ECustomFieldType.SELECT]: (
      <SelectFieldIcon className="text-xl text-gray-500" />
    ),
    [ECustomFieldType.SWITCH]: (
      <BooleanFieldIcon className="text-xl text-gray-500" />
    ),
    [ECustomFieldType.NOTE]: (
      <NoteFieldIcon className="text-xl text-gray-500" />
    ),
    [ECustomFieldType.DATE]: <DateTimeIcon className="text-xl text-gray-500" />,
    [ECustomFieldType.DATE_TIME]: (
      <DateTimeIcon className="text-xl text-gray-500" />
    ),
    [ECustomFieldType.RANGE_PICKER]: (
      <DateTimeIcon className="text-xl text-gray-500" />
    ),
    [ECustomFieldType.TIME]: <TimeIcon className="text-xl text-gray-500" />,
    [ECustomFieldType.CHECKBOX]: (
      <CheckboxIcon className="text-h5 color-neutral-500" />
    ),
    [ECustomFieldType.RADIO]: <RadioIcon className="text-xl text-gray-500" />,
    [ECustomFieldType.ATTACHMENT]: (
      <ImageIcon className="text-xl text-gray-500" />
    ),
    // [ECustomFieldType.ADDRESS]: (
    //   <AddressIcon className="text-xl text-gray-500" />
    // ),
    [ECustomFieldType.PHONE]: (
      <FontAwesomeIcon icon={faPhone} className="text-h5 color-neutral-500" />
    ),
    [ECustomFieldType.EMAIL]: (
      <FontAwesomeIcon
        icon={faEnvelope}
        className="text-h5 color-neutral-500"
      />
    ),
  };

export const typeConfig: Record<any, any> = {
  [ECustomFieldType.SELECT]: "selectConfig",
  [ECustomFieldType.RADIO]: "radioConfig",
  [ECustomFieldType.CHECKBOX]: "checkboxConfig",
};
