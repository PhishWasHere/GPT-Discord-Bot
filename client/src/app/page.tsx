import Image from 'next/image'
import Link from 'next/link';

import Button from '@/components/common/button';
import Card from '@/components/common/card';
import Carousel from '@/components/carousel';

export default function Home() { 
  
  const testimonials = [
    {
      key: 1,
      title: 'So u learn to code, to not find a job with it but to make a chat bot?',
      // img: 'https://cdn.discordapp.com/emojis/1118760274640510986.webp?size=96&quality=lossless',
      // alt: 'PepeLaugh',
      desc: '~Jun'
    },
    {
      key: 1,
      title: 'So u learn to code, to not find a job with it but to make a chat bot?',
      // img: 'https://cdn.discordapp.com/emojis/1118760274640510986.webp?size=96&quality=lossless',
      // alt: 'PepeLaugh',
      desc: '~Jun'
    },
    {
      key: 1,
      title: 'So u learn to code, to not find a job with it but to make a chat bot?',
      // img: 'https://cdn.discordapp.com/emojis/1118760274640510986.webp?size=96&quality=lossless',
      // alt: 'PepeLaugh',
      desc: '~Jun'
    },
  ]

  return (
    <>
    <main className="grow">
      <section className='pt-8 text-black relative'>
        <div className='text-center pb-12 md:pb-1'>
          <h1 className='text-5xl font-bold'>Make your server more <br/><span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-400'>Hostile</span></h1>
          <p className=' text-xl'>Inject some sarcasm into your life</p>
        </div>

        <div className='max-w-3xl mx-auto mt-2'>
          <div className='max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center'>
            <Button text='Get Started' url='/'/>
          </div>
        </div>
      </section>

      <div className='mt-4'>
        <Carousel/>
      </div>
      
      <section className='text-black mt-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold text-center'>Explore Hostile GPT</h2>
            <p className='text-xl text-center'>Hostile is a discord bot that adds a sarcastic touch to your server.</p>
            <div className='mt-2'>
              <Button text='Explore the documentation' url='/'/>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-4'>
        <h2 className='text-3xl font-bold text-center text-black'>What our users are saying</h2>
        <div className='mt-2'>
          {testimonials.map((i) => (
            <Card key={i.key} title={i.title} desc={i.desc}/>
          ))}
        </div>
      </section>
    </main>
    </>
  )
}
