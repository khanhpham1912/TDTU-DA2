"use client";
import "react-toastify/dist/ReactToastify.css";
// config
import themeConfig from "@/theme/themeConfig";

// contexts
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme } from "antd";
import CommonContext from "@/contexts/CommonContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// hooks
import { useMemo, useState } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState({
    items: [],
  });
  const [selectedMenu, setSelectedMenu] = useState("");
  const [openedMenu, setOpenedMenu] = useState("");

  const contextValue = useMemo(
    () => ({
      breadcrumbs,
      setBreadcrumbs,
      selectedMenu,
      setSelectedMenu,
      openedMenu,
      setOpenedMenu,
    }),
    [breadcrumbs, openedMenu, selectedMenu]
  );

  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.defaultAlgorithm,
        ...themeConfig,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <CommonContext.Provider value={contextValue}>
          <ToastContainer />
          {children}
        </CommonContext.Provider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
