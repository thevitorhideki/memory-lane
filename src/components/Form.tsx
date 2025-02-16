"use client";

import JSZip from "jszip";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AnalyzeWhatsapp } from "../lib/analyzeWhatsapp"; // adjust the path as needed

interface ChatMessage {
  date: string;
  time: string;
  sender: string;
  message: string;
}

export function Form() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setMessages([]);

    if (file.type === "text/plain") {
      readTextFile(file);
    } else if (file.type === "application/zip") {
      readZipFile(file);
    } else {
      setError("Formato de arquivo inválido. Envie um .txt ou .zip contendo um arquivo .txt.");
    }
  };

  const readTextFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const textContent = e.target?.result as string;
      try {
        // Instantiate our analyzer with the file content.
        const analyzer = new AnalyzeWhatsapp(textContent);
        // For example, get message counts per month.
        const messagesPerMonth = analyzer.messageCountPerMonth().slice(0, 5);
        // You can also call other methods here.
        setAnalysis({
          totalMessages: analyzer.messagesCount(),
          messagesPerMonth,
          messagesPerAuthor: analyzer.messageCountPerAuthor(),
          activityByHour: analyzer.activityTimeOfDay(),
          activityByDay: analyzer.activityDayOfWeek(),
          frequentWords: analyzer.mostFreqWords().slice(0, 10), // top 10 words
          laughs: analyzer.laughsPerAuthor(),
        });
      } catch (err) {
        setError("Error processing file.");
      }
    };
    reader.readAsText(file);
  };

  const readZipFile = async (file: File) => {
    try {
      const zip = await JSZip.loadAsync(file);
      const txtFileName = Object.keys(zip.files).find((name) => name.endsWith(".txt"));

      if (!txtFileName) {
        setError("Nenhum arquivo .txt encontrado no ZIP.");
        return;
      }

      const content = await zip.files[txtFileName].async("text");
      const parsedMessages = parseWhatsAppChat(content);
      setMessages(parsedMessages);
    } catch (err) {
      console.error(err);
      setError("Erro ao processar o arquivo ZIP.");
    }
  };

  const parseWhatsAppChat = (textContent: string): ChatMessage[] => {
    const messages: ChatMessage[] = [];
    const lines = textContent.split("\n");

    for (const line of lines) {
      const match = line.match(/^(\d{1,2}\/\d{1,2}\/\d{2,4}), (\d{1,2}:\d{2}) - (.+?): (.+)$/);
      if (match) {
        const [, date, time, sender, message] = match;
        messages.push({ date, time, sender, message });
      }
    }

    return messages;
  };

  return (
    <div className="flex flex-col items-center gap-2 w-1/3">
      <h2 className="text-3xl text-center">
        Coloque a sua conversa do
        <br />
        <b className="text-green-500">WhatsApp</b> para continuar
      </h2>
      <div className="flex gap-6">
        <a href="#why" className="hover:underline">Por que?</a>
        <a href="#how" className="hover:underline">Como?</a>
      </div>
      <Input
        type="file"
        accept=".zip,.txt"
        className="border-dashed border-zinc-50 border-2"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        variant="outline"
        disabled={messages.length === 0}
        className="font-bold border-zinc-50 border-2 rounded-full"
      >
        Continuar
      </Button>

      {!!messages.length && (
        <div className="border-zinc-50 border-2 p-4 rounded-3xl w-full">
          <h2 className="font-bold">Preview</h2>
          <div className="overflow-y-scroll max-h-60">
            {messages.slice(0, 10).map((msg, index) => (
              <p key={index}>
                <b>{msg.date} {msg.time} - {msg.sender}:</b> {msg.message}
              </p>
            ))}
          </div>
          <p className="text-sm mt-2">{messages.length} mensagens processadas.</p>
        </div>
      )}
      {analysis && (
        <div>
          <h3>Total Messages: {analysis.totalMessages}</h3>
          <h4>Messages Per Month</h4>
          <pre>{JSON.stringify(analysis.messagesPerMonth, null, 2)}</pre>
          {/* Render additional analysis as needed */}
        </div>
      )}
    </div>
  );
}
