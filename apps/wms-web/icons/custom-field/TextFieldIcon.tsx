import Icon from "@ant-design/icons";

const TextSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.67896 16.6614H3.76835L5.0173 13.093H10.0334L11.2844 16.6614H13.3738L8.56763 3.44925H6.48513L1.67896 16.6614ZM7.52324 5.93312L9.42833 11.3671H5.62136L7.52324 5.93312ZM13.6445 7.68819L12.596 10.5706L13.3098 12.5223L14.368 9.49903L15.6041 13.0249H13.4937L13.944 14.2561H16.0358L16.879 16.6613H18.3598L15.0957 7.68819H13.6445Z"
      fill="currentColor"
    />
  </svg>
);

export const TextFieldIcon = (props: any) => (
  <Icon component={TextSvg} {...props} />
);
