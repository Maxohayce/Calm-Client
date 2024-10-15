import React from "react";
import { PencilIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import background from "../assets/background.jpg";
import sidePic from "../assets/carousel-one.jpg";
import Chatbox from "../components/chatbox";

const Home = () => {
    return (
        <div className="relative flex flex-col items-center w-full">
            <img className="absolute inset-0 w-full h-[28rem] md:h-[34rem] object-cover z-0" src={background} alt="Background" />
            <section className="relative z-10 w-full lg:w-[72rem] h-[24rem] md:h-[30rem] items-start py-8 mt-16 px-4 lg:px-0">
                <div className="flex flex-col justify-between w-full md:w-1/3 p-2 h-full">
                    <h1 className="text-3xl md:text-5xl text-white font-bold">CALM: Caring APRNs Learning and Managing Burnout</h1>
                    <p className="w-full md:w-[85%] text-white">Supporting Advanced Practice Registered Nurses in identifying, managing, and preventing burnout worldwide.</p>
                    <span className="flex justify-between items-center w-[11.6rem]">
                        <button className="outline outline-white text-white rounded-3xl text-bold p-2">Start your journey</button>
                        <button className="outline outline-white p-1 rounded-full">
                            <ChevronRightIcon className="h-8 w-8 rounded-full bg-white" />
                        </button>
                    </span>
                </div>
            </section>
            <section className="w-full lg:w-[72rem] mt-14 items-start pb-14 px-4 lg:px-0">
                <div className="h-64 lg:h-[14rem] flex flex-col justify-between w-full lg:w-[32rem] p-2 mb-12">
                    <h6 className="text-md font-bold text-[#87A330]">ABOUT CALM</h6>
                    <h2 className="text-2xl md:text-3xl font-bold">What is CALM about?</h2>
                    <p className="text-[#87A330] ">
                        At CALM we understand the unique challenges faced by APRNs across all specialties. Our mission is to provide resources and support to help you manage and prevent burnout, ensuring you can continue to provide the best care for your patients and yourself.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="flex justify-between items-start w-full lg:w-[32rem] p-2">
                        <PencilIcon className="w-8 h-8 bg-gray-200 p-1 mt-2 rounded-md" />
                        <div className="flex flex-col justify-between h-56 lg:h-[14rem] w-5/6">
                            <h5 className="font-bold text-lg">Burnout Assessment Survey</h5>
                            <p className="w-full lg:w-11/12 text-[#87A330]">
                                Feeling stressed as an APRN? Take our quick, anonymous Burnout Assessment Survey to identify burnout factors and get personalized resources. It only takes 5-10 minutes!
                            </p>
                            <span className="flex justify-between items-center w-[11.8rem]">
                                <button className="outline outline-black rounded-3xl w-36 text-bold p-1">
                                    Start your journey
                                </button>
                                <button className="outline outline-black p-1 rounded-full">
                                    <ChevronRightIcon className="h-8 w-8 rounded-full text-white bg-black" />
                                </button>
                            </span>
                        </div>
                    </div>
                    <img className="w-full lg:w-[32rem] h-auto lg:h-[14rem] mt-4 lg:mt-0" src={sidePic} alt="sidePic" />
                </div>
            </section>
            <Chatbox />
        </div>
    );
};

export default Home;
