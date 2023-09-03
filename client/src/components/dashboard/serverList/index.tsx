'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/utils/redux/store';
import Image from 'next/image';

export default function ServerList() {
    const { guild_data } = useAppSelector((state) => state.authReducer.value);
    const [isChecked, setIsChecked] = useState(false)
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    } 
    
    return(
        <>
            { guild_data? (
                <section className='flex '>
                    {guild_data.map((i: any) => (
                        <section key={i.guild_name} className='flex w-80 h-20 items-center p-4 border border-gray-300 rounded-lg shadow-md'>
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                                {i.icon ? (
                                    <>
                                        <Image width={50} height={50} src={i.icon} alt={i.name} className="text-2xl rounded-full"/>
                                    </>
                                ) : (
                                    <span className="text-2xl">{i.guild_name.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div className="flex-grow text-xl font-semibold text-gray-800">
                                {i.guild_name}
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id={i.guild_id}
                                    className="sr-only"
                                    checked={i.isAuth}
                                />
                                <label
                                    htmlFor={i.guild_id}
                                    className="block w-10 h-6 bg-gray-400 rounded-full cursor-pointer"
                                >
                                    <div
                                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                        i.isAuth ? 'transform translate-x-full' : ''
                                    }`}
                                    ></div>
                                </label>
                            </div>
                        </section>
                    ))}
                </section>
            ) : (
                    null
                )
            }
        </>
    );
}