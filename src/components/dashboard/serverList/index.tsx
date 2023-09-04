'use client';
import { useState } from 'react';
import { useAppSelector } from '@/utils/redux/store';
import Image from 'next/image';
import { toggleGuildPersistence } from '@/utils/auth';

export default function ServerList() {
    const { guild_data } = useAppSelector((state) => state.authReducer.value);

    const initState = guild_data ? guild_data.map((guild) => ({ guild_id: guild.guild_id, eula: guild.eula })) : [];
    
    const [isChecked, setIsChecked] = useState(initState);
    
    const getEulaStatus = (guild_id: string) => {
        if(guild_data) {
            const guild = guild_data.find((guild) => guild.guild_id === guild_id);
            return guild?.eula || false;
        }
        return false;
    };

    const handleCheckboxChange = (guild_id: string) => {
        toggleGuildPersistence({guild_id});
        setIsChecked((prevState) =>
            prevState.map((guild) =>
                guild.guild_id === guild_id ? { ...guild, eula: !guild.eula } : guild
            )
        );
    }

    return(
        <>
            { guild_data? (
                <section className='flex justify-center'>
                    <div className='bg-white rounded-xl shadow-xl p-3'>
                        <div className='text-center mb-2 text-2xl font-semibold tracking-tight'>
                            Persistence settings
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-screen-xl'>
                            {guild_data.map((i: any) => (
                                <section key={i.guild_name} className='flex m-0.5 min-w-[20rem] h-20 items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white'>
                                    <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                                        {i.icon ? (
                                            <Image width={100} height={100} src={i.icon} alt={i.name} className="text-2xl rounded-full relative"/>
                                        ) : (
                                            <span className="text-2xl">{i.guild_name.charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>

                                    <div className="flex-grow text-xl font-semibold text-gray-800">
                                        {i.guild_name}
                                    </div>

                                    <div id='toggle 'className="relative">
                                        <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                                            <input
                                            type='checkbox'
                                            name='autoSaver'
                                            className='sr-only'
                                            checked={isChecked.find((guild) => guild.guild_id === i.guild_id)?.eula || false}
                                            onChange={() => handleCheckboxChange(i.guild_id)}
                                            />
                                            <span
                                                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                                                    getEulaStatus(i.guild_id) ? 'bg-primary' : 'bg-[#CCCCCE]'
                                                }`}
                                                >
                                                <span
                                                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                                        getEulaStatus(i.guild_id) ? 'translate-x-6' : ''
                                                    }`}
                                                ></span>
                                            </span>
                                        </label>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                null
            )
            }
        </>
    );
}