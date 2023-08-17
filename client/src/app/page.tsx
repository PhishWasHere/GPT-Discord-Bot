import Image from 'next/image'
import Link from 'next/link';
import NavBar from '@/components/nav';

export default function Home() { 
  
  return (
    <main className="flex min-h-screen">
      <NavBar />
        <Link href="/test"> login </Link>
        <Link href="/dashboard"> dash </Link>

    </main>
  )
}
