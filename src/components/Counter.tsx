import { useCoupleStore } from '@/store/chatStore';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export function Counter() {
  const { startDate } = useCoupleStore();
  const [duration, setDuration] = useState(
    intervalToDuration({ start: startDate, end: new Date() })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(intervalToDuration({ start: startDate, end: new Date() }));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <p>
      {formatDuration(duration, { delimiter: ', ', locale: ptBR }) ||
        '0 segundos'}
    </p>
  );
}
