import Icon from "@ant-design/icons";

const CheckboxSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0932 0.604614C14.119 0.604614 14.1447 0.6052 14.1702 0.60636L12.5053 2.27128H2.42655L2.42655 13.9379H14.0932V7.7544L15.7599 6.08773V13.9379C15.7599 14.8584 15.0137 15.6046 14.0932 15.6046H2.42655C1.50608 15.6046 0.759888 14.8584 0.759888 13.9379V2.27128C0.759888 1.35081 1.50608 0.604614 2.42655 0.604614H14.0932ZM7.91929 11.5713L17.4689 2.02172L16.2904 0.843211L7.9193 9.21428L5.54511 6.84004L4.36659 8.01854L7.91929 11.5713Z"
      fill="currentColor"
    />
  </svg>
);

export const CheckboxIcon = (props: any) => (
  <Icon component={CheckboxSvg} {...props} />
);
