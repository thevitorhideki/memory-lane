'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { fetcher } from '@/lib/fetcher';
import { PlusSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Wrapped() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading]);

  const {
    data: wrappedList,
    error,
    isLoading,
  } = useSWR(user ? `/api/users/${user.uid}/wrapped` : null, fetcher);

  if (loading || !user || isLoading) return null;
  if (error)
    return <p className="p-4 text-red-500">Erro ao carregar retrospectivas.</p>;

  return (
    <main>
      <header className="flex items-center justify-between border-b-2 border-b-zinc-400 p-4">
        <h1 className="text-xl">Suas retrospectivas</h1>
        <Button onClick={handleLogout}>Sair</Button>
      </header>

      <section className="flex flex-col gap-4 p-4">
        {wrappedList && wrappedList.length > 0 ? (
          wrappedList.map((item: any) => (
            <div
              key={item.id}
              className="rounded-xl bg-emerald-900 p-4 text-white shadow-xl"
            >
              <h2 className="text-xl font-bold">{item.title || item.id}</h2>
              <div className="flex items-center justify-between">
                <p>
                  Histórico de {item.periodo.inicio} - {item.periodo.fim}
                </p>
                <span className="rounded-full bg-white px-2 text-sm font-bold text-zinc-950 capitalize">
                  {item.tipo}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-between rounded-xl border-2 border-dashed border-zinc-400 p-4">
            <h2>Crie mais memórias em breve</h2>
            <PlusSquare size={24} />
          </div>
        )}
      </section>
    </main>
  );
}
