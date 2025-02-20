'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BarChartWidget from './widgets/barChart';
import LineChartWidget from './widgets/lineChart';
import PieChartWidget from './widgets/pieChart';
import Widget from './widgets/widget';

export default function AnalysisPage() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('analysisData');
    if (!storedData) {
      router.push('/');
      return;
    }
    setAnalysisData(JSON.parse(storedData));
  }, [router]);

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-bold">Carregando análise...</p>
      </div>
    );
  }

  return (
    <main
      className="grid gap-6 p-5"
      style={{
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: 'minmax(150px, auto)',
      }}
    >
      {/* Header widget with summary */}
      <Widget spanx={6} spany={1} title="WhatsApp Analysis" description="">
        <div style={{ fontSize: '20px', textAlign: 'center' }}>
          Total Messages: {analysisData.totalMessages}
        </div>
      </Widget>

      {/* Messages per Author (Pie Chart) */}
      <Widget spanx={2} spany={1} title="Messages Per Author" description="">
        <PieChartWidget
          data={analysisData.messagesPerAuthor}
          dataKey="count"
          nameKey="author"
        />
      </Widget>

      {/* Messages per Month (Line Chart) */}
      <Widget spanx={4} spany={1} title="Messages Per Month" description="">
        <LineChartWidget
          data={analysisData.messagesPerMonth}
          dataKey="count"
          nameKey="month"
          grid={true}
          xaxis={true}
          yaxis={true}
        />
      </Widget>

      {/* Activity Time of Day (Bar Chart) */}

      <Widget spanx={3} spany={2} title="Activity Time of Day" description="">
        <BarChartWidget
          data={analysisData.activityByHour}
          dataKey="count"
          nameKey="hour"
          grid={false}
          xaxis={true}
          yaxis={true}
          tooltip={true}
          legend={false}
        />
      </Widget>

      {/* Activity Day of Week (Bar Chart) */}
      <Widget spanx={3} spany={1} title="Activity Day of Week" description="">
        <BarChartWidget
          data={analysisData.activityByDay}
          dataKey="count"
          nameKey="day"
          grid={true}
          xaxis={true}
          yaxis={true}
          tooltip={true}
          legend={false}
        />
      </Widget>

      {/* Laughs Per Author (Bar Chart) */}
      <Widget spanx={3} spany={1} title="Laughs Per Author" description="">
        <BarChartWidget
          data={analysisData.laughs}
          dataKey="laugh_count"
          nameKey="author"
          grid={true}
          xaxis={true}
          yaxis={true}
          tooltip={true}
          legend={false}
        />
      </Widget>
    </main>
  );
}
