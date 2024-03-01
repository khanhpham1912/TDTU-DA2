// styles
import styles from "./styles.module.scss";
export const PrintFooter = ({
  noteList = [],
  signList = { right: "" },
}: {
  noteList?: string[];
  signList?: { right: string; left?: string };
}) => {
  return (
    <div className={styles.footer} id="PRINT_FOOTER">
      {/* #regionNote  */}
      <div className="flex flex-col gap-3 items-center">
        {!!noteList.length
          ? noteList?.map((note: string, key: number) => (
              <div key={key} className="flex gap-1 w-[95%]">
                <span className="text-xs">{`${note}:`}</span>
                <div className={styles.blank} />
              </div>
            ))
          : null}
      </div>
      {/* #endRegionNote */}
      <div className={styles["page-break"]} />

      <div className="flex justify-between pl-14 pr-16 text-xs">
        <div className="flex flex-col justify-end">{signList?.left}</div>
        <div className="flex flex-col items-center">
          <span>............ , ngày ....... tháng ....... năm .......</span>
          <span>{signList?.right}</span>
        </div>
      </div>
      <div style={{ height: 150 }}></div>
    </div>
  );
};
