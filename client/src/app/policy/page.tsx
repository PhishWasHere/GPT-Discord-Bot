'use client';
import Link from 'next/link';
import Card from '@/components/common/card';
import CardButton from '@/components/common/card-button';

export default function Policy () {
    return(
        <main className='text-text-primary min-h-screen py-8 max-w-5xl mx-auto'>
            <h1 className='text-4xl font-semibold mt-4 xl:mt-8 text-center'>Terms & policies of Hostile</h1>
            <section className='grid sm:grid-cols-2 grid-cols-1 justify-center mt-8 xl:mt-16'>
                <div className="flex justify-center">
                    <CardButton title='Terms of Service' desc='Terms for when you use Hostile' url='/policy/tos'></CardButton>
                </div>
                <div className="flex justify-center">
                    <CardButton title='Privacy and Cookie policy' desc='Practices with respect to personal information' url='/policy/privacy'></CardButton>
                </div>
            </section>        
        </main>
    )
}