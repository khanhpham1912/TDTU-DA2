import styles from "./styles.module.scss";

export const PrintContent = ({
  items,
}: {
  items: { value: any; label: React.ReactNode }[];
}) => {
  return (
    <table className={styles.content}>
      <tbody>
        {items?.map((item, key) => (
          <tr key={key}>
            <td>{item.label}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
