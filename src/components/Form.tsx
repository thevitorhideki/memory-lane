'use client';

import { useAuth } from '@/context/AuthContext';
import { useCoupleStore } from '@/store/chatStore';
import JSZip from 'jszip';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AnalyzeWhatsApp } from '../utils/analyzeWhatsApp';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Form() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [chatText, setChatText] = useState('');
  // const [dateValue, setDateValue] = useState('');
  // const [dateObject, setDateObject] = useState<Date | null>(null);
  // const [isDateValid, setIsDateValid] = useState(true);
  // const [firstNickname, setFirstNickname] = useState('');
  // const [secondNickname, setSecondNickname] = useState('');
  const { setChatData } = useCoupleStore();
  const router = useRouter();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
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
        'Formato de arquivo inválido. Envie um .txt ou .zip contendo um arquivo .txt.',
      );
    }
  };

  const readTextFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const textContent = e.target?.result as string;
      setChatText(textContent);

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
        name.endsWith('.txt'),
      );

      if (!txtFileName) {
        setError('Nenhum arquivo .txt encontrado no ZIP.');
        return;
      }

      const textContent = await zip.files[txtFileName].async('text');
      setChatText(textContent);

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

  // const handleDateChange = (
  //   value: string,
  //   dateObj: Date | null,
  //   isValid: boolean,
  // ) => {
  //   setDateValue(value);
  //   setDateObject(dateObj);
  //   setIsDateValid(isValid);
  // };

  const handleSubmitChat = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      // isDateValid &&
      // firstNickname &&
      // secondNickname &&
      // dateObject &&
      chatText
    ) {
      setChatData(chatText);
      // setNicknames([firstNickname, secondNickname]);
      // setStartDate(dateObject);

      router.push('/sign-up');
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 px-4 lg:w-1/3">
      {!user && (
        <>
          <h2 className="text-center text-3xl">
            Coloque a sua conversa do <b className="text-green-500">WhatsApp</b>{' '}
            para continuar
          </h2>
          <div className="flex gap-6 self-center">
            <a href="#why" className="hover:underline">
              Por que?
            </a>
            <a href="#how" className="hover:underline">
              Como?
            </a>
          </div>

          <form onSubmit={handleSubmitChat} className="flex flex-col gap-2">
            <Label htmlFor="chat" className="font-bold">
              Sua conversa
            </Label>
            <Input
              id="chat"
              type="file"
              accept=".zip,.txt"
              className="border-2 border-dashed"
              onChange={handleFileChange}
            />

            {/* <Label htmlFor="yourNickname" className="font-bold">
          Seu apelido
        </Label>
        <Input
          id="yourNickname"
          placeholder="Escreva seu apelido carinhoso"
          value={firstNickname}
          onChange={(e) => setFirstNickname(e.target.value)}
        />
        
        <Label htmlFor="theirNickname" className="font-bold">
          Apelido do seu amor
        </Label>
        <Input
          id="theirNickname"
          value={secondNickname}
          onChange={(e) => setSecondNickname(e.target.value)}
          placeholder="Escreva o apelido carinhoso do seu amor"
        />

        <Label htmlFor="date" className="font-bold">
          Que dia começou o amor?
        </Label>
        <DatePicker value={dateValue} onChange={handleDateChange} /> */}

            {error && <p className="text-red-500">{error}</p>}
            {messageCount != 0 && (
              <div className="w-full text-center">
                <span className="mt-4 text-2xl font-bold">
                  {messageCount} Mensagens analisadas
                </span>
              </div>
            )}
            <Button
              variant="outline"
              disabled={
                !messageCount
                // || !firstNickname || !secondNickname || !isDateValid
              }
              className="cursor-pointer rounded-3xl border-2 p-4"
            >
              Continuar
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
