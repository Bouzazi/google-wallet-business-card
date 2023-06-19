'use client'

import { Button, Navbar } from 'flowbite-react';
import { BsGithub } from 'react-icons/bs';


export default function DefaultNavbar() {
    return (
        <Navbar
            fluid
            rounded
            className='bg-[#f1f5f9]'
        >
            <Navbar.Brand href="#">
                <div className='font-bold'>Business Card Generator</div>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button>
                    View On Github<BsGithub className='ml-2' />
                </Button>
            </div>
        </Navbar>
    )
}