"use client";
import React, { useEffect, useMemo, useState } from "react";

// contexts
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { PrivateHeader, SideBar } from "@/components";
import { validateJwtToken } from "@/utils/jwt.utility";
import { pushNotify } from "@/utils/toast";

import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = useMemo(() => pathname?.split("/")[2], [pathname]);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const navigation = [
    {
      name: t("Items"),
      href: "/items",
      icon: HomeIcon,
      current: currentPage === "items",
    },
    {
      name: t("Suppliers"),
      href: "/suppliers",
      icon: HomeIcon,
      current: currentPage === "suppliers",
    },
    {
      name: t("Inbound orders"),
      href: "/inbound",
      icon: UsersIcon,
      current: currentPage === "inbound",
    },
    {
      name: t("Outbound orders"),
      href: "/outbound",
      icon: FolderIcon,
      current: currentPage === "outbound",
    },
  ];

  const userNavigation = [
    {
      name: "Logout",
      className: "text-[#ff4d4f]",
      href: "/login",
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    validateJwtToken().then((isValidToken) => {
      if (!isValidToken) {
        pushNotify(t("Login session has expired"), { type: "warning" });
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    });
  }, [pathname, router]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-row min-h-screen m-0">
      <SideBar
        showSideBar={sidebarOpen}
        onOpenSideBar={() => setSidebarOpen(true)}
        onCloseSideBar={() => setSidebarOpen(false)}
        navigation={navigation}
      />

      <main className="lg:pl-56 flex flex-col h-screen box-border overflow-x-auto overflow-y-hidden w-full">
        <PrivateHeader
          onOpenSideBar={() => setSidebarOpen(true)}
          userNavigation={userNavigation}
        />
        {children}
      </main>
    </div>
  );
};

export default PrivateLayout;
