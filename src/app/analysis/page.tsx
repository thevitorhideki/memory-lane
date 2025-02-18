"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Widget from "./widgets/widget";
import PieChartWidget from "./widgets/pieChart";
import BarChartWidget from "./widgets/barChart";
import LineChartWidget from "./widgets/lineChart";

import "./page.css";

export default function AnalysisPage() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [displayedMessages, setDisplayedMessages] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("analysisData");
    if (!storedData) {
      router.push("/");
      return;
    }
    setAnalysisData(JSON.parse(storedData));
  }, []);

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-bold">Carregando análise...</p>
      </div>
    );
  }
  return (
    < main className="canvas" style={{
      gridTemplateColumns: "repeat(6, 1fr)",  // 6 columns
      gridTemplateRows: "repeat(6, 1fr)",     // 6 rows
      gap: "25px",                            // 25px gap between widgets

    }}>
      <Widget spanx={6} spany={1} />
      <Widget spanx={2} spany={1} title="Messages Per Author" description="">
        <PieChartWidget data={analysisData.messagesPerAuthor} dataKey={"count"} nameKey={"author"} />
      </Widget>
      <Widget spanx={2} spany={1} title="Messages Per Month" description="">
        <LineChartWidget data={analysisData.messagesPerMonth} dataKey={"count"} nameKey={"month"} grid={false} yaxis={true} xaxis={true} />
      </Widget>
    </main >
  );
}
