import { HookAPI } from "antd/es/modal/useModal";
import { createContext } from "react";

type ContextProps = {
  modal?: HookAPI;
};

const CommonContext = createContext<Partial<ContextProps>>({});

export default CommonContext;
