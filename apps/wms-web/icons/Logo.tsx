import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useTranslations } from "next-intl";

export function Logo({ className }: { className?: string }) {
  const t = useTranslations();
  return (
    <div
      className={classNames(
        "flex gap-2 items-center justify-center h-fit text-2xl font-bold",
        className
      )}
    >
      <FontAwesomeIcon
        icon={faWarehouse}
        // className="text-indigo-600"
      />
      <span>WMS</span>
    </div>
  );
}
