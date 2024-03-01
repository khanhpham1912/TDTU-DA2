/* eslint-disable @next/next/no-img-element */
// components
import { Dropdown, MenuProps } from "antd";

// icons
import { GlobalOutlined } from "@ant-design/icons";

// hooks
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const LanguageSwitch = () => {
  const pathname = usePathname();
  const items: MenuProps["items"] = useMemo(() => {
    return [
      {
        label: (
          <Link
            href={`/vi/${pathname.slice(4)}`}
            className="flex gap-2 items-center"
          >
            <Image src={"/vi.png"} alt={"vi"} width={20} height={20} />
            <span>Tiếng Việt</span>
          </Link>
        ),
        key: "VI",
      },
      {
        label: (
          <Link
            href={`/en/${pathname.slice(4)}`}
            className="flex gap-1 items-center"
          >
            <Image src={"/en.png"} alt={"en"} width={20} height={20} />
            <span className="ml-1">English</span>
          </Link>
        ),
        key: "EN",
      },
    ];
  }, [pathname]);

  return (
    <Dropdown menu={{ items }}>
      <div className="flex gap-2 cursor-pointer">
        <GlobeAltIcon className="text-[#8d97a6] hover:text-indigo-600 h-6 w-6" />
        {/* <GlobalOutlined style={{ fontSize: 20, color: "#8d97a6" }} className="hover:text-indigo-600"/> */}
      </div>
    </Dropdown>
  );
};
export default LanguageSwitch;
