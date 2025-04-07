'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password);
      router.push('/checkout');
    } catch {
      setError('Erro ao criar conta. Tente outro email ou senha mais forte.');
    }
  };

  return (
    <main className="mx-auto max-w-md p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold">Criar Conta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border p-2"
        />
        <button type="submit" className="rounded bg-green-600 p-2 text-white">
          Criar Conta
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
