"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve analysis data from local storage
    const storedData = localStorage.getItem("analysisData");
    if (storedData) {
      setAnalysisData(JSON.parse(storedData));
    } else {
      // Redirect back to the form page if no data is found
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-green-500 mb-4">📊 Análise da Conversa</h2>
      
      {/* Total Messages with Animation */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-blue-500">
          Total de Mensagens: <span className="text-green-500">{analysisData.totalMessages}</span>
        </h3>
      </div>

      {/* Messages per Month */}
      <h3 className="text-xl font-bold mt-6">📅 Mensagens por Mês</h3>
      <ul className="list-disc list-inside">
        {analysisData.messagesPerMonth.map((item: any, index: number) => (
          <li key={index}>
            <b>{item.month}:</b> {item.count} mensagens
          </li>
        ))}
      </ul>

      {/* Messages per Author */}
      <h3 className="text-xl font-bold mt-6">👤 Mensagens por Autor</h3>
      <ul className="list-disc list-inside">
        {analysisData.messagesPerAuthor.map((item: any, index: number) => (
          <li key={index}>
            <b>{item.author}:</b> {item.count} mensagens
          </li>
        ))}
      </ul>

      {/* Activity by Hour */}
      <h3 className="text-xl font-bold mt-6">⏰ Atividade por Hora do Dia</h3>
      <ul className="list-disc list-inside">
        {analysisData.activityByHour.map((item: any, index: number) => (
          <li key={index}>
            <b>{item.hour}h:</b> {item.count} mensagens
          </li>
        ))}
      </ul>

      {/* Frequent Words */}
      <h3 className="text-xl font-bold mt-6">📝 Palavras Mais Usadas</h3>
      <ul className="list-disc list-inside">
        {analysisData.frequentWords.map((item: any, index: number) => (
          <li key={index}>
            <b>{item.word}:</b> {item.count} vezes
          </li>
        ))}
      </ul>

      {/* Laughs per Author */}
      <h3 className="text-xl font-bold mt-6">😂 Risadas por Autor</h3>
      <ul className="list-disc list-inside">
        {analysisData.laughs.map((item: any, index: number) => (
          <li key={index}>
            <b>{item.author}:</b> {item.laugh_count} risadas
          </li>
        ))}
      </ul>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        🔙 Voltar
      </button>
    </div>
  );
}
