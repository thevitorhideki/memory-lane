"use client";

import { useRouter } from "next/navigation"; // Next.js router for navigation
import JSZip from "jszip";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AnalyzeWhatsapp } from "../lib/analyzeWhatsapp"; // adjust the path as needed

export function Form() {
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [displayedMessages, setDisplayedMessages] = useState(0);
  const router = useRouter();
  const handleContinue = () => {
    if (analysis) {
      localStorage.setItem("analysisData", JSON.stringify(analysis)); // Save to local storage
      router.push("/analysis"); // Navigate to the analysis page
    }
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");

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
        const totalMessages = analyzer.messagesCount();
        // You can also call other methods here.
        setAnalysis({
          totalMessages,
          messagesPerMonth: analyzer.messageCountPerMonth(),
          messagesPerAuthor: analyzer.messageCountPerAuthor(),
          activityByHour: analyzer.activityTimeOfDay(),
          activityByDay: analyzer.activityDayOfWeek(),
          frequentWords: analyzer.mostFreqWords().slice(0, 10), // top 10 words
          laughs: analyzer.laughsPerAuthor(),
        });
        setDisplayedMessages(0);
        const incrementSpeed = Math.max(10, Math.floor(totalMessages / 350)); // Adjust speed based on message count
        const interval = setInterval(() => {
          setDisplayedMessages((prev) => {
            if (prev + incrementSpeed >= totalMessages) {
              clearInterval(interval);
              return totalMessages;
            }
            return prev + incrementSpeed;
          });
        }, 10); // Increase every 10ms for fast animation
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

      const textContent = await zip.files[txtFileName].async("text");
      const analyzer = new AnalyzeWhatsapp(textContent);
      // For example, get message counts per month.
      const totalMessages = analyzer.messagesCount();
      // You can also call other methods here.
      setAnalysis({
        totalMessages,
        messagesPerMonth: analyzer.messageCountPerMonth(),
        messagesPerAuthor: analyzer.messageCountPerAuthor(),
        activityByHour: analyzer.activityTimeOfDay(),
        activityByDay: analyzer.activityDayOfWeek(),
        frequentWords: analyzer.mostFreqWords().slice(0, 10), // top 10 words
        laughs: analyzer.laughsPerAuthor(),
      });
      setDisplayedMessages(0);
      const incrementSpeed = Math.max(1, Math.floor(totalMessages / 350)); // Adjust speed based on message count
      const interval = setInterval(() => {
        setDisplayedMessages((prev) => {
          if (prev + incrementSpeed >= totalMessages) {
            clearInterval(interval);
            return totalMessages;
          }
          return prev + incrementSpeed;
        });
      }, 10); // Increase every 10ms for fast animation
    } catch (err) {
      setError("Error processing file.");
    }
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
        disabled={analysis === null}
        className="border-green-500 border-2 p-4 rounded-3xl"
        // go to Analysis page sending the analysis object
        onClick={handleContinue}
      >
        Continuar
      </Button>

      {analysis && (
        <div>
          <span className="font-bold text-2xl mt-4">{displayedMessages} Mensagens analisadas</span>
        </div>
      )}
    </div>
  );
}
