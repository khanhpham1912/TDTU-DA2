import { createContext } from "react";

export interface Breadcrumb {
  name?: string;
  url?: string;
}

type ContextProps = {
  breadcrumbs?: {
    items?: Breadcrumb[];
  };
  setBreadcrumbs?: any;

  selectedMenu?: string;
  setSelectedMenu?: any;

  openedMenu?: string;
  setOpenedMenu?: any;
};

const CommonContext = createContext<Partial<ContextProps>>({});

export default CommonContext;
