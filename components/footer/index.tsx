'use client';

import { Footer } from 'flowbite-react';
import { BsGithub } from 'react-icons/bs';

export default function DefaultFooter() {
    return (
        <footer>
            <Footer bgDark>
                <div className="w-full">
                    <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright
                            by="Flowbite™"
                            href="#"
                            year={2022}
                        />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">

                            <Footer.Icon
                                href="#"
                                icon={BsGithub}
                            />
                        </div>
                    </div>
                </div>
            </Footer>
        </footer>
    )
}