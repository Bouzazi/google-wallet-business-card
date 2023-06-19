'use client';

import { useQRCode } from 'next-qrcode';
import { useSearchParams } from 'next/navigation';

export default function FrontCard() {
    const { Image } = useQRCode();
    const searchParams = useSearchParams()

    const getValues = (param: string) => {
        return searchParams.get(param);
    }

    return <div className='flex flex-row bg-white w-[540px] h-[280px]'>
        <div className='flex flex-col w-2/4 p-8'>
            <div className='flex flex-col items-start  h-2/6'>
                <div className='text-2xl font-bold'>{getValues("fullname")}</div>
                <div className='text-md'>{getValues("jobposition")}</div>
            </div>
            <div className='flex flex-col items-start justify-end h-4/6'>
                <div className='flex flex-row'>
                    <div className='w-[20px] h-[20px]'>
                        <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <div className='ml-1 text-sm'>{getValues("phonenumber")}</div>
                </div>
                <div className='flex flex-row'>
                    <div className='w-[20px] h-[20px]'>
                        <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <div className='ml-1 text-sm'>{getValues("email")}</div>
                </div>
                <div className='flex flex-row'>
                    <div className='w-[20px] h-[20px]'>
                        <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <div className='ml-1 text-sm'>{getValues("website")}</div>
                </div>
                <div className='flex flex-row'>
                    <div className='w-[20px] h-[20px]'>
                        <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <div className='ml-1 text-sm'>{getValues("address")}</div>
                </div>
            </div>
        </div>
        <div className='flex flex-col w-2/4 p-8'>
            <div className='flex h-1/2 justify-end'>
                <div className='text-xl font-bold px-1 h-fit border border-black'>E</div>
            </div>
            <div className='flex h-1/2 justify-end items-end'>
                <div className='h-[75px] w-[75px]'>
                    <Image
                        text={getValues("website") || ""}
                        options={{
                            type: 'image/jpeg',
                            quality: 0.3,
                            level: 'M',
                            margin: 0,
                            scale: 4,
                            width: 10,
                            color: {
                                dark: '#000',
                                light: '#FFF',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
        {/* */}
    </div>
}
