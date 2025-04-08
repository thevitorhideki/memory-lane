'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import { InfoCard } from '@/components/InfoCard';
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
  { text: 'Amor', count: 50 },
  { text: 'Saudade', count: 40 },
  { text: 'Felicidade', count: 35 },
  { text: 'Beijo', count: 45 },
  { text: 'Abraço', count: 38 },
  { text: 'Sair', count: 30 },
  { text: 'Carinho', count: 42 },
  { text: 'Te amo', count: 37 },
  { text: 'Companhia', count: 25 },
  { text: 'Sintonia', count: 28 },
  { text: 'Parceria', count: 32 },
  { text: 'Casal', count: 27 },
  { text: 'Paixão', count: 34 },
  { text: 'Momentos', count: 29 },
  { text: 'Conexão', count: 26 },
  { text: 'Coração', count: 30 },
  { text: 'Eterno', count: 16 },
  { text: 'Compromisso', count: 14 },
  { text: 'Almoço', count: 12 },
  { text: 'Filme', count: 23 },
  { text: 'Netflix', count: 19 },
  { text: 'Bom dia', count: 40 },
  { text: 'Boa noite', count: 38 },
  { text: 'Presente', count: 13 },
  { text: 'Chamego', count: 18 },
  { text: 'Música', count: 20 },
  { text: 'Parabéns', count: 11 },
  { text: 'Saúde', count: 9 },
  { text: 'Planos', count: 14 },
  { text: 'Casamento', count: 8 },
  { text: 'Filhos', count: 7 },
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
      className="mt-8 grid w-full grid-cols-2 items-baseline justify-center gap-3"
      style={{
        gridTemplateRows: '175px',
      }}
    >
      <Widget width={2} height={2} title="Mensagens por mês">
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
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
          </ResponsiveContainer>
        </ChartContainer>
      </Widget>

      <Widget width={2} height={3} title="Palavras mais faladas">
        <WordCloud words={words} />
      </Widget>

      <InfoCard
        info={[
          { author: 'Você', count: 5210 },
          { author: 'Seu amor', count: 5223 },
        ]}
        width={1}
        height={1}
        title="Quantas mensagens cada um mandou"
      />

      <InfoCard
        info={[
          { author: 'Você', count: 5210 },
          { author: 'Seu amor', count: 5223 },
        ]}
        width={1}
        height={1}
        title="Quem faz mais o outro rir?"
      />

      <p className="col-span-2 text-center">e muito mais...</p>
    </div>
  );
}
