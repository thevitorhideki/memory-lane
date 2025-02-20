interface WidgetProps {
  width: number;
  height: number;
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function Widget({ width, height, children, title }: WidgetProps) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        gridColumn: `span ${width}`,
        gridRow: `span ${height}`,
        boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
      }}
    >
      <h2 className="text-center font-bold mb-3">{title}</h2>
      {children}
    </div>
  );
}
