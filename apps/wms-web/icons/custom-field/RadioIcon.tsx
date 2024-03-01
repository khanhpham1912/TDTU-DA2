import Icon from "@ant-design/icons";

const RadioSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8.25989" cy="8.44006" r="8" fill="#E7FAF7" />
    <path
      d="M0.759888 8.44006C0.759888 4.29793 4.11775 0.940063 8.25989 0.940063C12.402 0.940063 15.7599 4.29793 15.7599 8.44006C15.7599 12.5822 12.402 15.9401 8.25989 15.9401C4.11775 15.9401 0.759888 12.5822 0.759888 8.44006Z"
      fill="#F6F8FB"
      stroke="currentColor"
    />
    <rect
      x="4.25989"
      y="4.44006"
      width="8"
      height="8"
      rx="4"
      fill="currentColor"
    />
  </svg>
);

export const RadioIcon = (props: any) => (
  <Icon component={RadioSvg} {...props} />
);
