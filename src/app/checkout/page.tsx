'use client';

import { useAuth } from '@/context/AuthContext';
import useMercadoPago from '@/hooks/useMercadoPago';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Checkout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { createMercadoPagoCheckout } = useMercadoPago();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() =>
          createMercadoPagoCheckout({
            testeId: '123',
            userEmail: 'memorylanetest@gmail.com',
          })
        }
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Comprar
      </button>
    </div>
  );
}
