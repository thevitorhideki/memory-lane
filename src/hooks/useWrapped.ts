import { AnalyzedData } from '@/utils/analyzeWhatsApp';
import useSWR from 'swr';

export function useWrapped(uid: string) {
  const { data, error, mutate } = useSWR<AnalyzedData>(
    `/api/users/${uid}/wrapped`,
    (url: string) => fetch(url).then((res) => res.json()),
  );

  return { data, error, mutate };
}
