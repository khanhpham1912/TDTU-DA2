import { createContext } from "react";

export interface Breadcrumb {
  name?: string;
  url?: string;
}

type ContextProps = {
  selectedMenu?: string;
  setSelectedMenu?: any;
};

const CommonContext = createContext<Partial<ContextProps>>({});

export default CommonContext;
