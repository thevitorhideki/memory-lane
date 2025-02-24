'use client';

import { Counter } from '@/components/Counter';
import { InfoCard } from '@/components/InfoCard';
import { Widget } from '@/components/Widget';
import { WordCloud } from '@/components/WordCloud';
import { useCoupleStore } from '@/store/chatStore';
import { AnalyzedData, AnalyzeWhatsApp } from '@/utils/analyzeWhatsApp';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Wrapped() {
  const { chatData, nicknames } = useCoupleStore();
  const router = useRouter();
  const [analyzedData, setAnalyzedData] = useState<AnalyzedData | null>(null);

  useEffect(() => {
    if (!chatData) {
      router.push('/');
    } else {
      try {
        const analyzer = new AnalyzeWhatsApp(chatData);
        // Obtém os dados analisados
        const totalMessages = analyzer.messagesCount();
        const messagesPerMonth = analyzer.messageCountPerMonth();
        const messagesPerAuthor = analyzer.messageCountPerAuthor();
        const activityByHour = analyzer.activityTimeOfDay();
        const activityByDay = analyzer.activityDayOfWeek();
        const frequentWords = analyzer.mostFreqWords();
        const laughs = analyzer.laughsPerAuthor();

        // Agrupa os dados em um objeto
        setAnalyzedData({
          totalMessages,
          messagesPerMonth,
          messagesPerAuthor,
          activityByHour,
          activityByDay,
          frequentWords,
          laughs,
        });
      } catch (error) {
        console.error('Erro ao analisar a conversa:', error);
      }
    }
  }, [router, chatData]);

  if (!chatData || !analyzedData) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Carregando análise...
      </div>
    );
  }

  return (
    <main>
      <p>{nicknames[0]}</p>
      <p>{nicknames[1]}</p>

      <Counter />

      <section
        className="mt-8 w-full grid gap-6 justify-center"
        style={{
          gridTemplateColumns: 'repeat(6, 175px)',
          gridTemplateRows: 'repeat(4, 175px)',
        }}
      >
        <Widget width={3} height={2} title="Palavras mais faladas">
          <WordCloud
            words={analyzedData.frequentWords
              .slice(0, 80)
              .map((w) => ({ text: w.word, count: w.count }))}
          />
        </Widget>

        <InfoCard
          width={2}
          height={1}
          title="Quantas mensagens cada um mandou"
          info={analyzedData.messagesPerAuthor}
        />

        <InfoCard
          width={2}
          height={1}
          title="Quantas vezes cada um riu"
          info={analyzedData.laughs}
        />
      </section>
    </main>
  );
}
