"use client";

import JSZip from "jszip";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Form() {
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const zip = await JSZip.loadAsync(file);

      const txtFileName = Object.keys(zip.files).find((name) =>
        name.endsWith(".txt")
      );

      if (!txtFileName) {
        setError("No .txt file found in the uploaded ZIP.");
        return;
      }

      const content = await zip.files[txtFileName].async("text");
      setTextContent(content);
    } catch (err) {
      console.error(err);
      setError("There was an error proccessing the ZIP file.");
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
        accept=".zip"
        className="border-dashed border-zinc-50 border-2"
        onChange={handleFileChange}
      />
      {error && <p className="text-red">{error}</p>}
      <Button
        variant={"outline"}
        disabled={textContent ? false : true}
        className="font-bold border-zinc-50 border-2 rounded-full"
      >
        Continuar
      </Button>
    </div>
  );
}
