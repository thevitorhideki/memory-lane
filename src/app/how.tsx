'use client';

import clsx from 'clsx';
import {
  ArrowDownCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpCircle,
  CheckCheck,
  MoreVertical,
  Search,
} from 'lucide-react';
import { useState } from 'react';

export function How() {
  const [mobileType, setMobileType] = useState('ios');
  const [step, setStep] = useState(0);

  const handlePreviousStep = () => {
    if (step != 0) {
      setStep((prev: number) => prev - 1);
    }
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
          onClick={() => setMobileType('ios')}
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
          onClick={() => setMobileType('android')}
        >
          Android
        </p>
      </div>

      {mobileType == 'ios' ? (
        <div className="my-20 flex w-full flex-1 justify-center gap-8">
          {step == 0 && (
            <>
              <div className="flex flex-1 justify-end">
                <div
                  className="flex h-full w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <p className="font-bold">WhatsApp</p>
                  <div className="h-8 w-full rounded-full border-2 px-4 py-2 text-sm"></div>
                  <div className="flex w-full items-center gap-3">
                    <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                    <div className="w-full">
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

              <div className="flex flex-1 items-center gap-2 self-start">
                <ArrowLeft />
                <h2 className="text-xl">
                  Entre na conversa com o seu{' '}
                  <b className="text-red-500">amor</b>
                </h2>
              </div>
            </>
          )}
          {step == 1 && (
            <>
              <div className="flex flex-1 justify-end">
                <div
                  className="flex h-full w-80 flex-col justify-between gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                    <p className="font-bold">Amor ❤️</p>
                  </div>

                  <div className="rounded-md bg-zinc-50 px-4 py-2">
                    <p className="text-green-500">Exportar conversa</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 self-start">
                <div className="flex items-center gap-2">
                  <ArrowLeft />
                  <h2 className="text-xl">
                    Clique no nome do seu <b className="text-red-500">amor</b>
                  </h2>
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Desça até o final da página</h2>
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Exportar conversa</h2>
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Sem mídia</h2>
                </div>
              </div>
            </>
          )}
          {step == 2 && (
            <>
              <div className="flex flex-1 justify-end">
                <div
                  className="flex h-full w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <h2 className="font-bold">Enviar para...</h2>
                    <Search size={20} />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 self-start">
                <div className="flex items-center gap-2">
                  <ArrowLeft />
                  <h2 className="flex items-center gap-2 text-xl">
                    Clique na
                    <Search size={20} />e pesquise por: <b>você</b>
                  </h2>
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Envie</h2>
                </div>
              </div>
            </>
          )}
          {step == 3 && (
            <div className="flex flex-1 items-center justify-center">
              <h1 className="w-3/5 text-center text-4xl">
                Agora basta entrar no seu{' '}
                <b className="text-green-500">WhatsApp</b> pelo computador e
                baixar o arquivo que você enviou
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="my-20 flex w-full flex-1 justify-center gap-8">
          {step == 0 && (
            <>
              <div className="flex flex-1 justify-end">
                <div
                  className="flex h-full w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <p className="font-bold">WhatsApp</p>
                  <div className="h-8 w-full rounded-full border-2 px-4 py-2 text-sm"></div>
                  <div className="flex w-full items-center gap-3">
                    <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                    <div className="w-full">
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

              <div className="flex flex-1 items-center gap-2 self-start">
                <ArrowLeft />
                <h2 className="text-xl">
                  Entre na conversa com o seu{' '}
                  <b className="text-red-500">amor</b>
                </h2>
              </div>
            </>
          )}
          {step == 1 && (
            <>
              <div className="flex flex-1 justify-end">
                <div
                  className="flex h-full w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="min-h-8 min-w-8 rounded-full bg-zinc-500"></div>
                      <p className="font-bold">Amor ❤️</p>
                    </div>
                    <MoreVertical size={20} />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 self-start">
                <div className="flex items-center gap-2">
                  <ArrowLeft />
                  <h2 className="text-xl">Clique no ícone</h2>
                  <MoreVertical size={20} />
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Mais (última opção)</h2>
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Exportar conversa</h2>
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Sem mídia</h2>
                </div>
              </div>
            </>
          )}
          {step == 2 && (
            <>
              <div className="flex flex-1 justify-end">
                <div
                  className="flex h-full w-80 flex-col gap-4 rounded-3xl border-2 bg-zinc-100 p-6"
                  style={{
                    boxShadow: 'rgba(139, 139, 139, 0.35) 0px 0px 5px',
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <h2 className="font-bold">Enviar para...</h2>
                    <Search size={20} />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 self-start">
                <div className="flex items-center gap-2">
                  <ArrowLeft />
                  <h2 className="flex items-center gap-2 text-xl">
                    Clique na
                    <Search size={20} />e pesquise por: <b>você</b>
                  </h2>
                </div>

                <div className="flex gap-2">
                  <ArrowRight />
                  <h2 className="text-xl">Envie</h2>
                </div>
              </div>
            </>
          )}
          {step == 3 && (
            <div className="flex flex-1 items-center justify-center">
              <h1 className="w-3/5 text-center text-4xl">
                Agora basta entrar no seu{' '}
                <b className="text-green-500">WhatsApp</b> pelo computador e
                baixar o arquivo que você enviou
              </h1>
            </div>
          )}
        </div>
      )}

      <div className="absolute top-1/2 right-10 flex -translate-y-1/2 flex-col gap-3">
        <ArrowUpCircle
          size={28}
          onClick={handlePreviousStep}
          color={step == 0 ? 'transparent' : 'black'}
        />
        <ArrowDownCircle
          size={28}
          onClick={handleNextStep}
          color={step == 3 ? 'transparent' : 'black'}
        />
      </div>
    </>
  );
}
