interface InfoCardProps {
  title: string;
}

export function InfoCard({ title }: InfoCardProps) {
  return (
    <div className="flex flex-col gap-3 bg-rose-200  p-4 rounded-xl col-span-2 row-span-1">
      <h1 className="font-bold text-xl text-center text-rose-700">{title}</h1>

      <div className="flex justify-between text-rose-600">
        <div>
          <h2 className="text-lg">Você</h2>
          <p className="text-4xl font-bold">321</p>
        </div>

        <div className="text-right">
          <h2 className="text-lg">Seu amor</h2>
          <p className="text-4xl font-bold">402</p>
        </div>
      </div>
    </div>
  );
}
