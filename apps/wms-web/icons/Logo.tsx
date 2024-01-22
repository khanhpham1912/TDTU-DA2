import { useTranslations } from "next-intl";

export function Logo() {
  const t = useTranslations();
  return (
    <div className="flex gap-2 text-white">
      <span className="material-symbols-outlined">warehouse</span>
      <span>WMS</span>
    </div>
  );
}
