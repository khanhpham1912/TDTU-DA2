import { Avatar, Dropdown, MenuProps } from "antd";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import classNames from "classnames";
export default function Profile() {
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    push("/login");
  };

  const items: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "INFO",
        disabled: true,
        label: (
          <div className={styles["user-avatar"]}>
            <Avatar
              size={32}
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            />

            <div className={styles["user-info"]}>
              <span>{localStorage.getItem("userInfo")}</span>
            </div>
          </div>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "LOGOUT",
        label: (
          <div
            className={classNames(
              styles["menu-item"],
              styles["menu-item-logout"]
            )}
            onClick={handleLogout}
          >
            <span>{`Logout`}</span>
          </div>
        ),
      },
    ];
  }, []);
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
        <Avatar
          size={32}
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        />
      </a>
    </Dropdown>
  );
}
