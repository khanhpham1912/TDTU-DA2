"use client";

// styles
import styles from "./styles.module.scss";
import classNames from "classnames";

// hooks
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// components
import { ListView } from "@/components/common";
import Link from "next/link";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

// models
import { EEntity } from "wms-models/lib/shared";

const CustomFieldLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const params = useParams();
  const entity = params?.entity as string;

  const entities = [
    {
      title: t("Inbound order"),
      key: EEntity.Inbound,
      href: `/settings/custom-fields/${EEntity.Order}`,
    },
    {
      title: t("Outbound order"),
      key: EEntity.Outbound,
      href: `/settings/custom-fields/${EEntity.Shipment}`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles["left-view"]}>
        <ListView
          renderHeader={
            <Link
              className={classNames({
                [styles.field]: true,
                [styles["field--selected"]]: !entity,
              })}
              href={"/settings/custom-fields/definitions"}
            >
              <span className="text-body">{t("Fields")}</span>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="color-neutral-500"
              />
            </Link>
          }
          renderContent={
            <div className="d-flex gap-16 column">
              <span className="text-h4 text-500 color-neutral-500">
                {t("ENTITY")}
              </span>
              {entities.map((item) => {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={classNames({
                      [styles.entity]: true,
                      [styles["entity--selected"]]: item.key === entity,
                    })}
                  >
                    <span>{item.title}</span>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="color-neutral-500"
                    />
                  </Link>
                );
              })}
            </div>
          }
        />
      </div>
      <div className="w-100">{children}</div>
    </div>
  );
};

export default CustomFieldLayout;
