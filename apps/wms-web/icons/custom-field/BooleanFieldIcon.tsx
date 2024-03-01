import Icon from "@ant-design/icons";

const BooleanSvg = () => (
  <svg
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" width="28" height="16" rx="8" fill="#B8C0CC" />
    <g
      clipPath="url(#clip0_186540_211987)"
      filter="url(#filter0_d_186540_211987)"
    >
      <rect x="4" y="2" width="12" height="12" rx="6" fill="white" />
    </g>
    <defs>
      <filter
        id="filter0_d_186540_211987"
        x="0"
        y="0"
        width="20"
        height="20"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0.137255 0 0 0 0 0.0431373 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_186540_211987"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_186540_211987"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const BooleanFieldIcon = (props: any) => (
  <Icon component={BooleanSvg} {...props} />
);
