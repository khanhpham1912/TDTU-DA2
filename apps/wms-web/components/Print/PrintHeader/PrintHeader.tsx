export const PrintHeader = ({ title }: { title: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col gap-5 items-center pb-4"
      style={{ fontFamily: "Arial" }}
      id="PRINT_HEADER"
    >
      <div
        style={{
          color: "#3F525C",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "27px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
    </div>
  );
};
