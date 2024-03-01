import Icon from "@ant-design/icons";

const DateTimeSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.66687 0.655548H2.58237V2.3201H2.16667C1.24619 2.3201 0.5 3.0663 0.5 3.98677V14.8201C0.5 15.7406 1.24619 16.4868 2.16667 16.4868H13.8333C14.7538 16.4868 15.5 15.7406 15.5 14.8201V3.98677C15.5 3.0663 14.7538 2.3201 13.8333 2.3201H13.4172V0.655548H11.3327V2.3201H4.66687V0.655548ZM1.96088 6.71403C1.96088 6.48391 2.14742 6.29736 2.37754 6.29736H13.615C13.8451 6.29736 14.0316 6.48391 14.0316 6.71403V14.6159C14.0316 14.846 13.8451 15.0326 13.615 15.0326H2.37754C2.14742 15.0326 1.96088 14.846 1.96088 14.6159V6.71403ZM3.83995 8.15765H5.49288V9.81058H3.83995V8.15765ZM3.83995 11.5025H5.49288V13.1555H3.83995V11.5025ZM8.82647 8.15765H7.17353V9.81058H8.82647V8.15765ZM7.17353 11.5025H8.82647V13.1555H7.17353V11.5025ZM12.1591 9.81058V8.15765H10.5062V9.81058H12.1591ZM10.5062 13.1555V11.5025H12.1591V13.1555H10.5062Z"
      fill="currentColor"
    />
  </svg>
);

export const DateTimeIcon = (props: any) => (
  <Icon component={DateTimeSvg} {...props} />
);