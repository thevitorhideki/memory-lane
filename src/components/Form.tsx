'use client';

import { cn } from '@/lib/utils';
import { useCoupleStore } from '@/store/chatStore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import JSZip from 'jszip';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AnalyzeWhatsApp } from '../utils/analyzeWhatsApp'; // adjust the path as needed
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function Form() {
  const [error, setError] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [chatText, setChatText] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [firstNickname, setFirstNickname] = useState('');
  const [secondNickname, setSecondNickname] = useState('');
  const { setChatData, setNicknames, setStartDate } = useCoupleStore();
  const router = useRouter();

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
        name.endsWith('.txt')
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

  const handleSubmitChat = () => {
    setChatData(chatText);
    setNicknames([firstNickname, secondNickname]);
    setStartDate(date);

    router.push('/wrapped');
  };

  return (
    <div className="flex flex-col gap-2 w-1/3">
      <h2 className="text-3xl text-center">
        Coloque a sua conversa do
        <br />
        <b className="text-green-500">WhatsApp</b> para continuar
      </h2>
      <div className="flex gap-6 self-center">
        <a href="#why" className="hover:underline">
          Por que?
        </a>
        <a href="#how" className="hover:underline">
          Como?
        </a>
      </div>
      <Label htmlFor="chat" className="font-bold">
        Sua conversa
      </Label>
      <Input
        id="chat"
        type="file"
        accept=".zip,.txt"
        className="border-dashed border-2"
        onChange={handleFileChange}
      />
      <Label htmlFor="yourNickname" className="font-bold">
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

      <Label htmlFor="theirNickname" className="font-bold">
        Que dia começou o amor?
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date ? (
              format(date, "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500">{error}</p>}
      {messageCount != 0 && (
        <div className="text-center w-full">
          <span className="font-bold text-2xl mt-4">
            {messageCount} Mensagens analisadas
          </span>
        </div>
      )}
      <Button
        variant="outline"
        disabled={!messageCount || !firstNickname || !secondNickname || !date}
        className="border-2 p-4 rounded-3xl cursor-pointer"
        onClick={handleSubmitChat}
      >
        Continuar
      </Button>
    </div>
  );
}
