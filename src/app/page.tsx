'use client';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation'

import Cookies from 'js-cookie';

import Button from '@/components/common/button/button';
import Carousel from '@/components/home/carousel';
import Testimonial from '@/components/home/testimonial';

export default function Home() { 
  const pathname = usePathname();
  const searchParams = new URLSearchParams(pathname);
  const token = searchParams.get('token');
  useEffect(() => {
  
    if (token) {
      Cookies.set('token', token);
    } 
    
  }, []);
  
  return (
    <>
    <main className="grow">
      <section className='mt-8 xl:mt-16 text-black relative'>
        <div className='text-center pb-12 md:pb-1'>
          <h1 className='text-5xl font-bold'>Make your server more <br/><span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-400'>Hostile</span></h1>
          <p className=' text-xl'>Inject some sarcasm into your life</p>
        </div>

        <div className='max-w-3xl mx-auto mt-2'>
          <div className='max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center'>
          <Link href='#'>
            <Button text='Get Started'/>
            </Link>
          </div>
        </div>
      </section>

      <div className='mt-8 xl:mt-16'>
        <Carousel/>
      </div>
      
      <section className='text-black mt-8 xl:mt-16'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold text-center'>Explore Hostile</h2>
            <p className='text-xl text-center'>Hostile is a unique discord bot that is installed in {`<`}2,000,000 servers, and adds a sarcastic touch to your server using OpenAI{`'`}s GPT3.5 turbo.</p>
            <div className='mt-2'>
              <Link href='#'>
                < Button text='Add Hostile to your server'/>
              </Link>
              <Link href='/docs'>
                <Button text='Explore the documentation' />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className='mt-8 pb-8 xl:mt-16'>
        <Testimonial/>
      </div>

    </main>
    </>
  )
}
