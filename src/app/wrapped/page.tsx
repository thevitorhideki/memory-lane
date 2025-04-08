'use client';

import { useAuth } from '@/context/AuthContext';
import { PlusSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Wrapped() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <main>
      <header className="border-b-2 border-b-zinc-400 p-4">
        <h1 className="text-xl">Suas retrospectivas</h1>
      </header>

      <section className="flex flex-col gap-4 p-4">
        <div className="rounded-xl bg-emerald-900 p-4 text-white shadow-xl">
          <h2 className="text-xl font-bold">Aniversário de namoro</h2>
          <div className="flex items-center justify-between">
            <p>Histórico de 01/25 - 04/25</p>
            <span className="rounded-full bg-white px-2 text-sm font-bold text-zinc-950">
              Free
            </span>
          </div>
        </div>

        <div className="flex justify-between rounded-xl border-2 border-dashed border-zinc-400 p-4">
          <h2>Crie mais memórias em breve</h2>
          <PlusSquare size={24} />
        </div>
      </section>
    </main>
  );
}
