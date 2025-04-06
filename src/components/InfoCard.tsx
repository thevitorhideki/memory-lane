interface InfoCardProps {
  title: string;
  width: number;
  height: number;
  info: { author: string; count: number }[];
}

export function InfoCard({ title, width, height, info }: InfoCardProps) {
  const getRandomColor = () => {
    const colors = [
      { bg: 'bg-red-200', text: 'text-red-700', subtext: 'text-red-600' },
      {
        bg: 'bg-orange-200',
        text: 'text-orange-700',
        subtext: 'text-orange-600',
      },
      {
        bg: 'bg-yellow-200',
        text: 'text-yellow-700',
        subtext: 'text-yellow-600',
      },
      { bg: 'bg-green-200', text: 'text-green-700', subtext: 'text-green-600' },
      { bg: 'bg-teal-200', text: 'text-teal-700', subtext: 'text-teal-600' },
      { bg: 'bg-blue-200', text: 'text-blue-700', subtext: 'text-blue-600' },
      {
        bg: 'bg-indigo-200',
        text: 'text-indigo-700',
        subtext: 'text-indigo-600',
      },
      {
        bg: 'bg-purple-200',
        text: 'text-purple-700',
        subtext: 'text-purple-600',
      },
      { bg: 'bg-pink-200', text: 'text-pink-700', subtext: 'text-pink-600' },
      { bg: 'bg-rose-200', text: 'text-rose-700', subtext: 'text-rose-600' },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const colors = getRandomColor();

  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-xl justify-center ${colors.bg}`}
      style={{
        gridColumn: `span ${width}`,
        gridRow: `span ${height}`,
      }}
    >
      <h1 className={`font-bold text-xl text-center ${colors.text}`}>
        {title}
      </h1>

      <div className={`flex justify-between ${colors.subtext}`}>
        <div>
          <h2 className="text-lg">{info[0].author}</h2>
          <p className="text-4xl font-bold">{info[0].count}</p>
        </div>

        <div className="text-right">
          <h2 className="text-lg">{info[1].author}</h2>
          <p className="text-4xl font-bold">{info[1].count}</p>
        </div>
      </div>
    </div>
  );
}
