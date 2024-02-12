import classNames from "classnames";
import { useTranslations } from "next-intl";

export function Logo({ className }: { className?: string }) {
  const t = useTranslations();
  return (
    <div className={classNames("flex gap-2", className)}>
      <span className="material-symbols-outlined">warehouse</span>
      <span>WMS</span>
    </div>
  );
}
