import React, { useState } from "react";
import { ChevronRightIcon, Bars4Icon, XMarkIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="hidden justify-between items-center bg-white px-4 md:px-8 h-16 rounded font-semibold fixed top-0 left-0 z-20 shadow-md w-full mt-4 md:left-[11.5rem] md:w-[72rem]">
            <h5 className="text-lg font-bold">CALM</h5>

            {/* Hamburger icon for small screens */}
            <button className="md:hidden" onClick={toggleMenu}>
                {isMenuOpen ? (
                    <XMarkIcon className="h-8 w-8 text-black" />
                ) : (
                    <Bars4Icon className="h-8 w-8 text-black" />
                )}
            </button>

            {/* Navbar links for larger screens */}
            <ul className="hidden md:flex justify-between items-center w-3/5">
                <li className="hover:text-[#87A330] cursor-pointer">Resources</li>
                <li className="hover:text-[#87A330] cursor-pointer">Chatroom</li>
                <li className="hover:text-[#87A330] cursor-pointer">Contact Us</li>
                <li>
                    <span className="flex justify-between items-center text-white w-[11.8rem]">
                        <button className="outline outline-black bg-black rounded-3xl w-36 text-bold p-1">
                            Start Assessment
                        </button>
                        <button className="outline outline-black p-1 rounded-full">
                            <ChevronRightIcon className="h-8 w-8 rounded-full bg-[#87A330]" />
                        </button>
                    </span>
                </li>
            </ul>

            {/* Dropdown menu for mobile screens */}
            {isMenuOpen && (
                <ul className="absolute top-20 left-0 w-full bg-white flex flex-col items-start p-4 shadow-md md:hidden z-10">
                    <li className="py-2 w-full text-left hover:bg-gray-200 cursor-pointer">Resources</li>
                    <li className="py-2 w-full text-left hover:bg-gray-200 cursor-pointer">Chatroom</li>
                    <li className="py-2 w-full text-left hover:bg-gray-200 cursor-pointer">Contact Us</li>
                    <li className="py-2 w-full flex justify-between items-center">
                        <button className="outline outline-black text-white bg-black rounded-3xl w-36 text-bold p-1">
                            Start Assessment
                        </button>
                        <button className="outline outline-black p-1 rounded-full">
                            <ChevronRightIcon className="h-8 w-8 rounded-full bg-[#87A330]" />
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
