'use client';

import React, { useState, useEffect } from 'react';

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    const slides: any = [
        {
            key: 1,
            url: 'https://cdn.discordapp.com/attachments/401722560737312778/1142776933478830150/gpt_2.png'
        },
        {
            key: 2,
            url: 'https://cdn.discordapp.com/attachments/401722560737312778/1142776932996501525/gpt_3.png'
        },
        {
            key: 3,
            url: 'https://cdn.discordapp.com/attachments/401722560737312778/1142776933759852585/gpt_1.png'
        }
    ]

    const prevSlide = () => {
        const isFirstSlide = current === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : current - 1;
        setCurrent(newIndex);
    }

    const nextSlide = () => {
        const isLastSlide = current === slides.length - 1;
        const newIndex = isLastSlide ? 0 : current + 1;
        setCurrent(newIndex);
    };

    const goToSlide = (slideIndex: any) => {
        setCurrent(slideIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 7000); 
    
        return () => clearInterval(interval);
    }, [current]);

    return(
        <div className='max-w-[1200px] h-[300px] w-full m-auto py-10 px-2 relative group bg-white rounded-xl shadow-lg border'>
            <div
            style={{ backgroundImage: `url(${slides[current].url})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
            className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
            ></div>

            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 hover:text-blue-600 text-white cursor-pointer'>
                <button onClick={() =>prevSlide()}> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pt-2 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>
            
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 hover:text-blue-600 text-white cursor-pointer '>
                <button onClick={() =>nextSlide()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pt-2 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            <div className='flex top-4 justify-center py-2'>
            {slides.map((slide: any, slideIndex: string) => (
                <div
                key={slide.key}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer'
                >
                </div>
            ))}
            </div>
        </div>
    )
}