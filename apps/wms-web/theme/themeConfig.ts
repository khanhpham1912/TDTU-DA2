import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: "var(--color-primary)",
    colorError: "var(--color-danger)",
    fontFamily: "var(--font-inter)",
  },
  components: {
    Button: {
      borderRadius: 4,
      primaryShadow: "none",
    },
    Input: {
      borderRadius: 4,
      colorTextPlaceholder: "var(--color-neutral-400)",
    },
    DatePicker: {
      borderRadius: 4,
    },
    Select: {
      borderRadius: 4,
    },
    Table: {
      borderRadius: 8,
    },
  },
};

export default theme;
