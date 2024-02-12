"use client";
import "react-toastify/dist/ReactToastify.css";
// config
import themeConfig from "@/theme/themeConfig";

// contexts
import { ToastContainer } from "react-toastify";
import { ConfigProvider, Modal, theme } from "antd";
import CommonContext from "@/contexts/CommonContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// hooks
import { useMemo, useState } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.defaultAlgorithm,
        ...themeConfig,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <CommonContext.Provider value={{ modal }}>
          {contextHolder}
          <ToastContainer />
          {children}
        </CommonContext.Provider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
