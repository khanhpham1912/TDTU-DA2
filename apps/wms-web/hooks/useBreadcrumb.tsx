"use client";
import { useContext, useEffect } from "react";

// ctx
import CommonContext from "@/contexts/CommonContext";

// configs
export type SELECTED_MENU_KEY_TYPE = "ITEMS" | "INBOUND" | "OUTBOUND";

interface Props {
  dependencies?: any;
  selectedMenu: SELECTED_MENU_KEY_TYPE | null;
}

const useBreadcrumb = (props: Props) => {
  const { setSelectedMenu } = useContext(CommonContext);

  useEffect(
    () => {
      setSelectedMenu(props.selectedMenu);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props?.dependencies ? [...props?.dependencies] : []
  );
};

export default useBreadcrumb;
