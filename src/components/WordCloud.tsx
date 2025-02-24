import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface Word {
  text: string;
  count: number;
}

interface WordCloudProps {
  words: Word[];
}

export function WordCloud({ words }: WordCloudProps) {
  // Se não houver palavras, retorne null ou uma mensagem
  if (words.length === 0) return null;

  // Ordena as palavras de forma decrescente (maior frequência primeiro)
  const sortedWords = [...words].sort((a, b) => b.count - a.count);
  const n = sortedWords.length;
  const orderedWords: Word[] = new Array(n);
  const mid = Math.floor(n / 2);

  // Reorganiza: o maior vai para o centro e os demais são distribuídos alternadamente
  sortedWords.forEach((word, i) => {
    const offset = i % 2 === 0 ? i / 2 : -Math.ceil(i / 2);
    const index = mid + offset;
    orderedWords[index] = word;
  });

  // Define a menor e a maior frequência para calcular os tamanhos
  const frequencies = words.map((word) => word.count);
  const maxcount = Math.max(...frequencies);
  const mincount = Math.min(...frequencies);

  // Função para mapear a frequência em um tamanho de fonte (em rem)
  const getFontSize = (count: number) => {
    // Exemplo: tamanho mínimo 1rem e máximo 3rem
    if (maxcount === mincount) return 2; // evita divisão por zero
    return 1 + ((count - mincount) / (maxcount - mincount)) * 2;
  };

  const getRandomColor = () => {
    const colors = [
      'text-red-500',
      'text-orange-500',
      'text-lime-500',
      'text-green-500',
      'text-yellow-500',
      'text-sky-500',
      'text-indigo-500',
      'text-violet-500',
      'text-pink-500',
      'text-rose-500',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center h-full items-center">
      {orderedWords.map((word) => (
        <TooltipProvider key={word.text}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <span
                className={`font-bold ${getRandomColor()}`}
                style={{
                  fontSize: `${getFontSize(word.count)}rem`,
                }}
              >
                {word.text}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{word.count} vezes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
