export default function Grid({
    classes = "items-center gap-x-8 gap-y-4",
    gridCols = "",
    children,
  }) {
    return <div className={`${classes} ${gridCols} grid`}>{children}</div>;
  }
  