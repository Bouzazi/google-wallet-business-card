'use client';

import { createPassClass, createPassObject, getCardScreenshot, shortenLink } from '@/app/actions';
// only import what you want to use
import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { InfinitySpin } from 'react-loader-spinner'
import { useQRCode } from 'next-qrcode';


export type FormInputs = {
    fullname: string
    jobposition: string
    phonenumber: string
    email: string
    address: string
    website: string
}

enum generationStates {
    Initial = "initial",
    Loading = "loading",
    Completed = "completed"
}

export default function MainForm() {
    const { Image } = useQRCode();

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<FormInputs>()

    const [generationState, setGenerationState] = useState<`${generationStates}`>(generationStates.Initial)
    const [googleSaveUrl, setGoogleSaveUrl] = useState("")
    const [cardFrontImage, setCardFrontImage] = useState("")
    const [cardBackImage, setCardBackImage] = useState("")
    const [googleScanUrl, setGoogleScanUrl] = useState("")

    const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
        setGenerationState("loading")

        // Retrieve Google Wallet URL
        await createPassClass()
        const passObjectResult = await createPassObject(data)
        setGoogleSaveUrl(passObjectResult)

        // Retrieve card both sides as Base64 images
        const cardFrontBase64 = await getCardScreenshot(data, "front")
        const cardBackBase64 = await getCardScreenshot(data, "back")
        setCardFrontImage(cardFrontBase64)
        setCardBackImage(cardBackBase64)

        // Retrieve Google Wallet Shortened URL
        const shortenedUrl = await shortenLink(passObjectResult)
        setGoogleScanUrl(shortenedUrl)

        setGenerationState("completed")
    }

    const initiateGeneration = () => {
        setGenerationState("initial")
    }

    return (
        <div className=''>
            {generationState == "initial" && <div>
                <div className="text-xl">Fill the following form with required data</div>
                <div className="flex justify-center mt-8">
                    <form className="flex flex-col md:w-3/6 gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-row space-x-4">
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="fullname"
                                        value="Full name"
                                    />
                                </div>
                                <TextInput
                                    {...register("fullname")}
                                    id="fullname"
                                    required
                                    type="text"
                                />
                            </div>
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="jobposition"
                                        value="Your Job Position"
                                    />
                                </div>
                                <TextInput
                                    {...register("jobposition")}
                                    id="jobposition"
                                    placeholder="Ex. CEO, Developer, Assistant..."
                                    required
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="phonenumber"
                                        value="Your phone number"
                                    />
                                </div>
                                <TextInput
                                    {...register("phonenumber")}
                                    id="phonenumber"
                                    required
                                    type="text"
                                />
                            </div>
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Your Email"
                                    />
                                </div>
                                <TextInput
                                    {...register("email")}
                                    id="email"
                                    placeholder="username@email.com"
                                    required
                                    type="email"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="address"
                                        value="Your Address"
                                    />
                                </div>
                                <TextInput
                                    {...register("address")}
                                    id="address"
                                    required
                                    type="text"
                                />
                            </div>
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="website"
                                        value="Your Website URL"
                                    />
                                </div>
                                <TextInput
                                    {...register("website")}
                                    id="website"
                                    placeholder="https://example.org"
                                    required
                                    type="text"
                                />
                            </div>
                        </div>
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>}
            {generationState == "completed" &&
                <div className='flex flex-col items-center'>
                    <div className='text-lg font-bold mb-6'>Your generated card is ready for exportation!</div>

                    {cardFrontImage && <div><img src={`data:image/jpeg;base64, ${cardFrontImage}`} alt='front card'></img></div>}
                    {cardBackImage && <div className='mt-6'><img src={`data:image/jpeg;base64, ${cardBackImage}`} alt='back card'></img></div>}

                    <div className='mt-12 space-x-2 flex flex-row'>
                        {cardFrontImage && <a className='bg-blue-600 text-white text-sm p-2 rounded-lg' download="card-front.jpg" href={`data:image/png;base64, ${cardFrontImage}`}>Export Front Side as Image</a>}
                        {cardBackImage && <a className='bg-blue-600 text-white text-sm p-2 rounded-lg' download="card-back.jpg" href={`data:image/png;base64, ${cardBackImage}`}>Export Front Side as Image</a>}
                    </div>

                    {googleSaveUrl && <div>
                        <div className='text-sm my-6'>- OR -</div>
                        <div className='mt-2 flex flex-row space-x-2 justify-center'>
                            <a href={`${googleSaveUrl}`}><img height={"100px"} width={"220px"} src='/images/wallet-button.png'></img></a>
                        </div>
                        <div className='text-sm my-6'>- You can also scan QR Code -</div>
                        <div className='flex justify-center'>
                            <Image
                                text={googleScanUrl}
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
                    </div>}

                    <div className=''>
                        <div className='text-sm my-6'>- OR -</div>
                        <Button onClick={() => initiateGeneration()}>
                            Regenerate a new card
                        </Button>
                    </div>
                </div>
            }
            {generationState == "loading" &&
                <div className='flex justify-center'>
                    <InfinitySpin
                        width='200'
                        color="#0e7490"
                    />
                </div>
            }
        </div>

    )
}