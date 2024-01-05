import { createContext } from "react";

export interface Breadcrumb {
  name?: string;
  url?: string;
}

type ContextProps = {
  breadcrumbs?: {
    items?: Breadcrumb[];
  };
  setBreadcrumbs?: Function;

  selectedMenu?: string;
  setSelectedMenu?: Function;

  openedMenu?: string;
  setOpenedMenu?: Function;
};

const CommonContext = createContext<Partial<ContextProps>>({});

export default CommonContext;
