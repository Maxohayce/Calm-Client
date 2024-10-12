import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronRightIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

const socket = io('https://calm-api.vercel.app/');

const Chatbox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [initials, setInitials] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userImage, setUserImage] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleJoinChat = () => {
        if (initials.trim()) {
            setIsJoined(true);
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const msg = { initials, text: message, time: new Date().toLocaleTimeString() };
            socket.emit('chat message', msg);
            setMessage('');
        }
    };

    const getAvatar = (msgInitials) => {
        if (userImage) {
            return <img src={userImage} alt="avatar" className="w-10 h-10 rounded-full" />;
        } else {
            const initialsArr = msgInitials.split(' ');
            const avatarInitials = initialsArr.slice(0, 2).map(word => word[0].toUpperCase()).join('');
            return (
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                    {avatarInitials}
                </div>
            );
        }
    };

    return (
        <div className={`fixed bottom-4 right-4 w-96 bg-white shadow-xl rounded-lg transition-all ease-in-out duration-700 ${isExpanded ? 'h-128' : 'h-32'}`}>
            <div className="flex flex-col justify-between p-4">
                <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold">Chat Room</h5>
                    <button onClick={handleToggle} className="text-gray-500">
                        {isExpanded ? (
                            <ChevronDoubleDownIcon className="h-6 w-6" />
                        ) : (
                            <ChevronDoubleUpIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
                <p className={`transition-opacity ease-in-out duration-700`}>
                    Connect with fellow APRNs anonymously to share experiences and support each other.
                </p>
            </div>
            <hr />
            {isExpanded && !isJoined && (
                <div className="transition-opacity ease-in-out duration-700 opacity-100 p-4">
                    <p className="semi-bold">Enter Your initials to get started</p>
                    <input
                        type="text"
                        placeholder="Enter your initials..."
                        className="w-full mt-2 p-2 border rounded-lg"
                        value={initials}
                        onChange={(e) => setInitials(e.target.value)}
                    />
                    <span className="flex justify-between items-center w-[11.8rem] mt-4">
                        <button
                            className="outline outline-gray-500 rounded-3xl w-36 font-bold p-1 text-gray-500"
                            onClick={handleJoinChat}
                        >
                            Join Chat
                        </button>
                        <button className="outline outline-white p-1 rounded-full">
                            <ChevronRightIcon className="h-8 w-8 rounded-full bg-white" />
                        </button>
                    </span>
                </div>
            )}
            {isJoined && (
                <div className="transition-opacity ease-in-out duration-700 opacity-100 p-4">
                    <div className="overflow-y-auto h-96">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-start mb-4 ${msg.initials === initials ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className="relative">
                                    {getAvatar(msg.initials)}
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>

                                <div className={`ml-2 max-w-xs text-left`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold">{msg.initials}</span>
                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                    </div>
                                    <div className={`p-2 rounded-md ${msg.initials === initials ? 'bg-black text-white' : 'bg-slate-100 text-black'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex mt-4">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-72 p-2 border rounded-lg"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage} className="bg-black p-2 rounded-full text-white ml-3">
                            <PaperAirplaneIcon className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbox;
