"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Widget from "./widget";
import PieChartWidget from "./widgets/pieChart";
import BarChartWidget from "./widgets/barChart";


import "./page.css";

export default function AnalysisPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".element");

    elements.forEach((el) => {
      const element = el as HTMLElement;
      const randomWidth = Math.floor(Math.random() * 600) + 200; // 200px to 800px
      const randomHeight = Math.floor(Math.random() * 600) + 200;
      const randomTop = Math.floor(Math.random() * (window.innerHeight - randomHeight));
      const randomLeft = Math.floor(Math.random() * (window.innerWidth - randomWidth));

      element.style.width = `${randomWidth}px`;
      element.style.height = `${randomHeight}px`;
      element.style.top = `${randomTop}px`;
      element.style.left = `${randomLeft}px`;
    });
  }, []); // Runs only once when the component mounts
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [displayedMessages, setDisplayedMessages] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("analysisData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAnalysisData(parsedData);

      // Animate the total messages counter
      let totalMessages = parsedData.totalMessages;
      let current = 0;
      const increment = Math.max(1, Math.floor(totalMessages / 100));
      const interval = setInterval(() => {
        current += increment;
        if (current >= totalMessages) {
          current = totalMessages;
          clearInterval(interval);
        }
        setDisplayedMessages(current);
      }, 20);
    } else {
      // If no analysis data exists, redirect to the homepage
      router.push("/");
    }
  }, [router]);

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
        <PieChartWidget data={analysisData.messagesPerAuthor} dataKey={"count"} nameKey={"pessoa"} />
      </Widget>
      <Widget spanx={2} spany={1} title="Messages Per Month" description="">
        <BarChartWidget data={analysisData.messagesPerMonth} dataKey={"count"} nameKey={"pessoa"} grid={false} yaxis={true} xaxis={true} />
      </Widget>

    </main >

  );
}
