'use client';
import Image from 'next/image'
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options'

export default function Home() {
  const { data: session } = useSession();
    
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {!session ? (
          <button onClick={() => signIn()}>Login with Discord</button>
        ) : (
          <div>
            <p>Welcome, {session.user!.name}!</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )}
      </div> 
    </main>
  )
}
