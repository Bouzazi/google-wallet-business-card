'use client';

export default function FirstSection() {
    return (
        <div className="flex flex-row bg-slate-100 p-6 rounded-xl">
            <div className="px-4">
                <div className="text-xl md:text-4xl font-bold">The best free Business Card creator</div>
                <div className="py-2 md:text-xl">Scroll through our great collection of business cards, and use them to give the best first impression! Our pre-made templates will make things easier for you - don’t forget to include all your company’s information with our online editor, and you’re ready to go! </div>
            </div>
            <div className="hidden md:block w-1/3">
                <img className="h-full" src={"/images/grid-business-card.webp"}></img>
            </div>
        </div>
    )
}