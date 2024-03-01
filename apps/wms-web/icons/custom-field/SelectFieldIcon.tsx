import Icon from "@ant-design/icons";

const SelectSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.0047 0H2.99529C1.34353 0 0 1.34353 0 2.99529V13.0071C0 14.6565 1.34353 16 2.99529 16H13.0071C14.6565 16 16 14.6565 16 13.0047V2.99529C16 1.34353 14.6565 0 13.0047 0ZM8 10.2729L4.64941 7.18353L5.28706 6.49176L8 8.99294L10.7129 6.48941L11.3506 7.18118L8 10.2729Z"
      fill="#8D97A6"
    />
  </svg>
);

export const SelectFieldIcon = (props: any) => (
  <Icon component={SelectSvg} {...props} />
);
