import { db } from '@/server/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  const { uid } = await params;

  const docRef = doc(db, 'users', uid);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    return NextResponse.json(
      { error: 'User does not exists' },
      { status: 404 },
    );
  }

  return NextResponse.json(snap.data()?.wrapped);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { uid: string } },
) {
  const { uid } = params;

  const body = await req.json();
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, { wrapped: body }, { merge: true });

  return NextResponse.json({ success: true });
}
