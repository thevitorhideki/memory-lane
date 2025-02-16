"use client";

import clsx from "clsx";
import {
  ArrowDownCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpCircle,
  CheckCheck,
  MoreVertical,
  Search,
} from "lucide-react";
import { useState } from "react";

export function How() {
  const [mobileType, setMobileType] = useState("ios");
  const [step, setStep] = useState(0);

  const handlePreviousStep = () => {
    if (step != 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (step != 3) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <section
      id="how"
      className="flex flex-col items-center w-full h-screen relative"
    >
      <h1 className="text-4xl mt-10">Como baixar o histórico da conversa</h1>
      <div className="flex gap-8 text-xl mt-6">
        <p
          onClick={() => setMobileType("ios")}
          className={clsx("cursor-pointer", {
            "font-bold underline": mobileType == "ios",
          })}
        >
          IOS
        </p>
        <p
          className={clsx("cursor-pointer", {
            "font-bold underline": mobileType == "android",
          })}
          onClick={() => setMobileType("android")}
        >
          Android
        </p>
      </div>

      {mobileType == "ios" ? (
        <h1></h1>
      ) : (
        <div className="flex flex-1 w-full justify-center gap-8 my-20">
          {step == 0 && (
            <>
              <div className="flex-1 flex justify-end">
                <div className="border-zinc-50 border-2 h-full w-80 p-6 rounded-3xl flex flex-col gap-4">
                  <p className="font-bold">WhatsApp</p>
                  <div className="bg-zinc-800 w-full py-2 px-4 rounded-full text-sm h-8"></div>
                  <div className="flex items-center gap-3 w-full">
                    <div className="rounded-full bg-zinc-500 min-w-8 min-h-8"></div>
                    <div className="w-full">
                      <div className="flex w-full justify-between items-center">
                        <p>Amor ❤️</p>
                        <p className="text-zinc-500 text-xs">Agora</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <CheckCheck size={14} />
                        <p className="text-xs">
                          Vou fazer uma surpresa para você ;)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center self-start flex-1">
                <ArrowLeft />
                <h2 className="text-xl">
                  Entre na conversa com o seu{" "}
                  <b className="text-red-500">amor</b>
                </h2>
              </div>
            </>
          )}
          {step == 1 && (
            <>
              <div className="flex-1 flex justify-end">
                <div className="border-zinc-50 border-2 h-full w-80 p-6 rounded-3xl flex flex-col gap-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-zinc-500 min-w-8 min-h-8"></div>
                      <p className="font-bold">Amor ❤️</p>
                    </div>
                    <MoreVertical size={20} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 self-start flex-1">
                <div className="flex gap-2 items-center">
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
              <div className="flex-1 flex justify-end">
                <div className="border-zinc-50 border-2 h-full w-80 p-6 rounded-3xl flex flex-col gap-4">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="font-bold">Enviar para...</h2>
                    <Search size={20} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 self-start flex-1">
                <div className="flex gap-2 items-center">
                  <ArrowLeft />
                  <h2 className="text-xl flex items-center gap-2">
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
            <div className="flex flex-1 justify-center items-center">
              <h1 className="text-4xl w-3/5 text-center">
                Agora basta entrar no seu{" "}
                <b className="text-green-500">WhatsApp</b> pelo computador e
                baixar o arquivo que você enviou
              </h1>
            </div>
          )}
        </div>
      )}

      <div className="absolute right-10 top-1/2 -translate-y-1/2 gap-3 flex flex-col">
        <ArrowUpCircle
          size={28}
          onClick={handlePreviousStep}
          color={step == 0 ? "transparent" : "white"}
        />
        <ArrowDownCircle
          size={28}
          onClick={handleNextStep}
          color={step == 3 ? "transparent" : "white"}
        />
      </div>
    </section>
  );
}
