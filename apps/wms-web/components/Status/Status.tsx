// icons

// components
import { FC, ReactNode } from "react";
import statusColors from "./statusColorConfig";
import { Tag } from "antd";

const dftColor = statusColors.default;

interface StatusProps {
  text: ReactNode;
  colorKey?: string;
}

const Status: FC<StatusProps> = ({ text, colorKey }) => {
  const statusStyle: any = colorKey
    ? statusColors[colorKey]
    : { color: dftColor.color };

  return (
    <Tag {...statusStyle} style={{ width: "fit-content" }}>
      {text}
    </Tag>
  );
};

export default Status;
