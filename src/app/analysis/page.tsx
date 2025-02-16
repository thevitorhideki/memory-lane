"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalysisPage() {
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

  // Colors for the pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA336A",
    "#6600CC",
    "#FF6666",
    "#66FF66",
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-green-500 mb-4">
        📊 Análise da Conversa
      </h2>

      {/* Animated Total Messages */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">
          Total de Mensagens:{" "}
          <span className="text-blue-500">{displayedMessages}</span>
        </h3>
      </div>

      {/* Mensagens por Mês */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Mensagens por Mês</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analysisData.messagesPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mensagens por Autor */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Mensagens por Autor</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analysisData.messagesPerAuthor}
              dataKey="count"
              nameKey="author"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {analysisData.messagesPerAuthor.map(
                (entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Activity: Hour of Day and Day of Week */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Atividade por Hora do Dia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisData.activityByHour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">
            Atividade por Dia da Semana
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisData.activityByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Palavras Mais Usadas */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">
          Palavras Mais Usadas (Top 10)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analysisData.frequentWords}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risadas por Autor */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Risadas por Autor</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analysisData.laughs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="author" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="laugh_count" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
