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
      className="rounded-xl p-4 flex gap-4 items-center justify-center flex-col w-full h-full"
      style={{
        gridColumn: `span ${width}`,
        gridRow: `span ${height}`,
        boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
      }}
    >
      <h2 className="text-center text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
