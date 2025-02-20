'use client';

import JSZip from 'jszip';
import React, { useState } from 'react';
import { AnalyzeWhatsApp } from '../utils/analyzeWhatsApp'; // adjust the path as needed
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Form() {
  const [error, setError] = useState('');
  const [messageCount, setMessageCount] = useState(0);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');

    if (file.type === 'text/plain') {
      readTextFile(file);
    } else if (file.type === 'application/zip') {
      readZipFile(file);
    } else {
      setError(
        'Formato de arquivo inválido. Envie um .txt ou .zip contendo um arquivo .txt.'
      );
    }
  };

  const readTextFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const textContent = e.target?.result as string;

      try {
        const analyzer = new AnalyzeWhatsApp(textContent);

        const totalMessages = analyzer.messagesCount();

        setMessageCount(0);

        const incrementSpeed = Math.max(10, Math.floor(totalMessages / 350));
        const interval = setInterval(() => {
          setMessageCount((prev) => {
            if (prev + incrementSpeed >= totalMessages) {
              clearInterval(interval);
              return totalMessages;
            }
            return prev + incrementSpeed;
          });
        }, 5);
      } catch {
        setError('Error processing file.');
      }
    };
    reader.readAsText(file);
  };

  const readZipFile = async (file: File) => {
    try {
      const zip = await JSZip.loadAsync(file);
      const txtFileName = Object.keys(zip.files).find((name) =>
        name.endsWith('.txt')
      );

      if (!txtFileName) {
        setError('Nenhum arquivo .txt encontrado no ZIP.');
        return;
      }

      const textContent = await zip.files[txtFileName].async('text');
      const analyzer = new AnalyzeWhatsApp(textContent);

      const totalMessages = analyzer.messagesCount();

      setMessageCount(0);

      const incrementSpeed = Math.max(10, Math.floor(totalMessages / 350));
      const interval = setInterval(() => {
        setMessageCount((prev) => {
          if (prev + incrementSpeed >= totalMessages) {
            clearInterval(interval);
            return totalMessages;
          }
          return prev + incrementSpeed;
        });
      }, 5);
    } catch {
      setError('Error processing file.');
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
        <a href="#why" className="hover:underline">
          Por que?
        </a>
        <a href="#how" className="hover:underline">
          Como?
        </a>
      </div>
      <Input
        type="file"
        accept=".zip,.txt"
        className="border-dashed border-2"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      {messageCount != 0 && (
        <div>
          <span className="font-bold text-2xl mt-4">
            {messageCount} Mensagens analisadas
          </span>
        </div>
      )}
      <Button
        variant="outline"
        disabled={messageCount === null}
        className="border-2 p-4 rounded-3xl"
      >
        Continuar
      </Button>
    </div>
  );
}
