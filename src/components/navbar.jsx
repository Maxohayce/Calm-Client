import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-white px-8 h-16 rounded font-semibold fixed top-0 left-[11.5rem] z-20 shadow-md w-[72rem] mt-4">
            <h5>CALM</h5>
            <ul className="flex justify-between items-center w-3/5">
                <li>Resources</li>
                <li>Chatroom</li>
                <li>Contact Us</li>
                <li>
                    <span className="flex justify-between items-center text-white w-[11.8rem]">
                        <button className="outline outline-black bg-black rounded-3xl w-36 text-bold p-1">
                            Start Assessment
                        </button>
                        <button className="outline outline-black p-1 rounded-full">
                            <ChevronRightIcon className="h-8 w-8 rounded-full bg-green-300" />
                        </button>
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
