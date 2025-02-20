'use client';

import { Bar, BarChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Widget } from '@/components/Widget';
import { WordCloud } from '@/components/WordCloud';

const words = [
  { text: 'Amor', frequency: 50 },
  { text: 'Saudade', frequency: 40 },
  { text: 'Felicidade', frequency: 35 },
  { text: 'Beijo', frequency: 45 },
  { text: 'Abraço', frequency: 38 },
  { text: 'Sair', frequency: 30 },
  { text: 'Carinho', frequency: 42 },
  { text: 'Te amo', frequency: 37 },
  { text: 'Companhia', frequency: 25 },
  { text: 'Sintonia', frequency: 28 },
  { text: 'Parceria', frequency: 32 },
  { text: 'Casal', frequency: 27 },
  { text: 'Paixão', frequency: 34 },
  { text: 'Momentos', frequency: 29 },
  { text: 'Conexão', frequency: 26 },
  { text: 'Coração', frequency: 30 },
  { text: 'Eterno', frequency: 16 },
  { text: 'Compromisso', frequency: 14 },
  { text: 'Almoço', frequency: 12 },
  { text: 'Filme', frequency: 23 },
  { text: 'Netflix', frequency: 19 },
  { text: 'Bom dia', frequency: 40 },
  { text: 'Boa noite', frequency: 38 },
  { text: 'Presente', frequency: 13 },
  { text: 'Chamego', frequency: 18 },
  { text: 'Música', frequency: 20 },
  { text: 'Parabéns', frequency: 11 },
  { text: 'Saúde', frequency: 9 },
  { text: 'Planos', frequency: 14 },
  { text: 'Casamento', frequency: 8 },
  { text: 'Filhos', frequency: 7 },
];

const chartData = [
  { month: 'January', you: 186, love: 80 },
  { month: 'February', you: 305, love: 200 },
  { month: 'March', you: 237, love: 120 },
  { month: 'April', you: 73, love: 190 },
  { month: 'May', you: 209, love: 130 },
  { month: 'June', you: 214, love: 140 },
];

const chartConfig = {
  you: {
    label: 'Você',
    color: '#2eb2ff',
  },
  love: {
    label: 'Seu amor',
    color: '#fa6060',
  },
} satisfies ChartConfig;

export function Why() {
  return (
    <div
      className="mt-8 grid gap-6 items-start"
      style={{
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: 'minmax(150px, auto)',
      }}
    >
      <Widget width={2} height={2} title="Mensagens por mês">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="you" fill="var(--color-you)" radius={4} />
            <Bar dataKey="love" fill="var(--color-love)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Widget>

      <Widget width={3} height={2} title="Palavras mais faladas">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <WordCloud words={words} />
        </ChartContainer>
      </Widget>
    </div>
  );
}
