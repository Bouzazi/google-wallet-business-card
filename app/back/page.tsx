'use client';

import { useSearchParams } from 'next/navigation';

export default function FrontCard() {
    const searchParams = useSearchParams()

    const getValues = (param: string) => {
        return searchParams.get(param);
    }

    return <div className='flex flex-col justify-center text-center bg-white w-[540px] h-[280px] mt-6'>
        <div className='text-4xl'>{getValues("fullname")}</div>
        <div className='text-xl'>{getValues("jobposition")}</div>
    </div>
}
