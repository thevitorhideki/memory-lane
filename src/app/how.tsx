'use client';

import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { CheckCheck, ChevronRight, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export function How() {
  const [mobileType, setMobileType] = useState('ios');
  const [step, setStep] = useState(0);

  const handleReset = () => {
    setStep(0);
  };

  const handleNextStep = () => {
    if (step != 3) {
      setStep((prev: number) => prev + 1);
    }
  };

  return (
    <>
      <div className="mt-6 flex gap-8 text-xl">
        <p
          onClick={() => {
            setMobileType('ios');
            handleReset();
          }}
          className={clsx('cursor-pointer', {
            'font-bold underline': mobileType == 'ios',
          })}
        >
          IOS
        </p>
        <p
          className={clsx('cursor-pointer', {
            'font-bold underline': mobileType == 'android',
          })}
          onClick={() => {
            setMobileType('android');
            handleReset();
          }}
        >
          Android
        </p>
      </div>

      {mobileType == 'ios' ? (
        <div className="my-20 flex w-full flex-1 flex-col justify-center gap-8">
          {step == 0 && (
            <>
              <div className="flex flex-1 justify-center">
                <div
                  className="flex h-[70vh] w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <p className="font-bold">WhatsApp</p>
                  <div className="h-8 w-full rounded-full border-2 px-4 py-2 text-sm"></div>
                  <div className="flex w-full items-center gap-3">
                    <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                    <div className="w-full" onClick={handleNextStep}>
                      <div className="flex w-full items-center justify-between">
                        <p>Amor ❤️</p>
                        <p className="text-xs text-zinc-500">Agora</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCheck size={14} />
                        <p className="text-xs">
                          Vou fazer uma surpresa para você ;)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl">
                1. Entre na conversa com o seu{' '}
                <b className="text-red-500">amor</b>
              </h2>
            </>
          )}
          {step == 1 && (
            <>
              <div className="flex flex-1 justify-center">
                <div
                  className="flex h-[70vh] w-80 flex-col justify-between gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div
                    className="flex items-center gap-3"
                    onClick={handleNextStep}
                  >
                    <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                    <p className="font-bold">Amor ❤️</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 self-start">
                <h2 className="text-xl">
                  2. Clique no nome do seu <b className="text-red-500">amor</b>
                </h2>
              </div>
            </>
          )}
          {step == 2 && (
            <>
              <div className="flex flex-1 justify-center">
                <div
                  className="flex h-[70vh] w-80 flex-col justify-end gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div
                    className="rounded-md bg-zinc-50 px-4 py-2"
                    onClick={handleNextStep}
                  >
                    <p className="text-green-500">Exportar conversa</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 self-start">
                <h2 className="text-xl">
                  3. Desça até o final da página e clique em{' '}
                  <b className="text-green-500">Exportar conversa</b>
                </h2>
              </div>
            </>
          )}
          {step == 3 && (
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-3xl">
                Agora coloque sua conversa para começar
              </h1>

              <Input type="file" />
            </div>
          )}
        </div>
      ) : (
        <div className="my-20 flex w-full flex-1 flex-col justify-center gap-8">
          {step == 0 && (
            <>
              <div className="flex flex-1 justify-center">
                <div
                  className="flex h-[70vh] w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <p className="font-bold">WhatsApp</p>
                  <div className="h-8 w-full rounded-full border-2 px-4 py-2 text-sm"></div>
                  <div className="flex w-full items-center gap-3">
                    <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                    <div className="w-full" onClick={handleNextStep}>
                      <div className="flex w-full items-center justify-between">
                        <p>Amor ❤️</p>
                        <p className="text-xs text-zinc-500">Agora</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCheck size={14} />
                        <p className="text-xs">
                          Vou fazer uma surpresa para você ;)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl">
                1. Entre na conversa com o seu{' '}
                <b className="text-red-500">amor</b>
              </h2>
            </>
          )}
          {step == 1 && (
            <>
              <div className="flex flex-1 justify-center">
                <div
                  className="flex h-[70vh] w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div
                    className="flex w-full items-center justify-between"
                    onClick={handleNextStep}
                  >
                    <div className="flex items-center gap-3">
                      <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                      <p className="font-bold">Amor ❤️</p>
                    </div>
                    <MoreVertical size={20} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <h2 className="text-xl">2. Clique no ícone</h2>
                <MoreVertical size={20} />
              </div>
            </>
          )}
          {step == 2 && (
            <>
              <div className="flex flex-1 justify-center">
                <div
                  className="flex h-[70vh] w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div
                    className="relative flex w-full items-center justify-between"
                    onClick={handleNextStep}
                  >
                    <div className="flex items-center gap-3">
                      <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                      <p className="font-bold">Amor ❤️</p>
                    </div>
                    <MoreVertical size={20} />

                    <div className="absolute right-0 -bottom-40 flex h-40 w-24 items-end rounded-xl bg-zinc-50 px-2 py-2 shadow-lg">
                      <div className="flex w-full items-center justify-between">
                        Mais
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 self-start text-xl">
                <h2>3. Clique em Mais</h2>
                <h2>4. Exportar conversa (Sem mídia)</h2>
              </div>
            </>
          )}
          {step == 3 && (
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-3xl">
                Agora coloque sua conversa para começar
              </h1>

              <Input type="file" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
