import React, { useState, useEffect, useRef } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Pusher from 'pusher-js';
import Spinner from './Spinner';

const pusher = new Pusher('7cf21568de4332a92a43', {
    cluster: 'EU',
    forceTLS: true,
});

const Chatbox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [initials, setInitials] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false); // State to handle disclaimer
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const channel = pusher.subscribe('chat');
        channel.bind('chat-message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            channel.unbind('chat-message');
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleJoinChat = () => {
        if (initials.trim() && initials.length === 2) {
            setIsJoined(true);
        } else {
            alert('Please enter exactly two initials.');
        }
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            const msg = { initials, text: message, time: new Date().toLocaleTimeString() };
            setIsSending(true);

            try {
                const response = await fetch('https://calm-api.vercel.app/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(msg),
                });

                if (!response.ok) {
                    console.error("Failed to send message:", response.statusText);
                } else {
                    console.log("Message sent successfully");
                }

                setMessage('');
            } catch (error) {
                console.error("Error sending message:", error);
            } finally {
                setIsSending(false);
            }
        }
    };

    const getAvatar = (msgInitials) => {
        const avatarInitials = msgInitials.toUpperCase();
        return (
            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                {avatarInitials}
            </div>
        );
    };

    return (
        <div className={`fixed top-0 left-0 w-screen h-full bg-white shadow-xl rounded-lg transition-all duration-700 ease-in-out 
            ${isExpanded ? 'max-h-[40rem]' : 'max-h-32'} overflow-hidden z-50`}>
            <div className="flex flex-col justify-between p-4 w-full">
                <div className="flex justify-between items-center mb-2 w-full">
                    <h5 className="font-bold">Chat Room</h5>
                    <button onClick={handleToggle} className="text-gray-500">
                        {isExpanded ? (
                            <ChevronDoubleDownIcon className="h-6 w-6" />
                        ) : (
                            <ChevronDoubleUpIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
                <p className={`transition-opacity ease-in-out duration-500 `}>
                    Connect with fellow APRNs anonymously to share experiences and support each other.
                </p>
            </div>
            <hr />
            {isExpanded && !isDisclaimerAccepted && (
                <div className="transition-opacity ease-in-out duration-700 opacity-100 p-4 flex flex-col w-full justify-between h-full">
                    <div className="overflow-y-auto no-scrollbar h-[26rem] w-full">
                        <div className={`flex items-start justify-between mb-4`}>
                            <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-sm border">
                                CALM
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>

                            <div className={`pr-3 w-4/5 text-left`}>
                                <div className="flex justify-start items-center mb-1">
                                    <span className="font-bold">Disclaimer</span>
                                </div>
                                <div className="p-2 w-full rounded-md bg-slate-100 text-black">
                                    Welcome to our chat room. This is just a platform to vent and decompress after a work day. Please be advised of the following essential points: <br /><br />
                                    <b>1. No Monitoring: </b> This chat room is not actively monitored. Participants are responsible for their interactions and content shared within this space. <br /><br />
                                    <b>2. No Medical Advice: </b> The discussions and content in this chat room do not constitute medical advice. Participants must consult a qualified healthcare professional for medical concerns, diagnoses, or treatments. <br /> <br />
                                    <b>3. Personal Responsibility: </b>Your participation in this chat room comes with the empowerment to take full responsibility for your contributions and interactions. Please exercise caution and respect when sharing personal information or advice. <br /><br />
                                    <b>4. Community Guidelines: </b> We encourage a respectful and supportive environment. However, due to the unmonitored nature of this chat room, we cannot guarantee all participants' adherence to these guidelines. <br /><br />
                                    <b>5. Limitation of Liability:</b> The administrators of this chat room are not liable for any content shared by participants or any actions taken based on discussions within this space.
                                    <br /><br />
                                    You acknowledge and accept this disclaimer by continuing to use this chat room.
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-end pb-2 pr-4">
                            <button
                                className="outline bg-[#0B4350] rounded-3xl w-36 font-bold p-1 text-white"
                                onClick={() => setIsDisclaimerAccepted(true)}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isExpanded && isDisclaimerAccepted && !isJoined && (
                <div className="transition-opacity ease-in-out duration-700 opacity-100 p-4">
                    <p className="semi-bold">Enter Your initials to get started</p>
                    <input
                        type="text"
                        placeholder="example 'IJ'"
                        className="w-full mt-2 p-2 border rounded-lg"
                        value={initials}
                        onChange={(e) => setInitials(e.target.value.toUpperCase())}
                        maxLength={2}
                    />
                    <span className="flex justify-between items-center w-[11.8rem] mt-4">
                        <button
                            className="outline outline-gray-500 rounded-3xl w-36 font-bold p-1 text-gray-500"
                            onClick={handleJoinChat}
                        >
                            Join Chat
                        </button>
                    </span>
                </div>
            )}
            {isJoined && (
                <div className="transition-opacity ease-in-out duration-700 opacity-100 p-4 w-full">
                    <div className="overflow-y-auto no-scrollbar h-[26rem] w-full">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-start justify-between mb-4 ${msg.initials === initials ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className="relative">
                                    {getAvatar(msg.initials)}
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>

                                <div className={`pr-3 w-4/5 text-left`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold">{msg.initials}</span>
                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                    </div>
                                    <div className={`p-2 w-full rounded-md ${msg.initials === initials ? 'bg-[#0B4350] text-white' : 'bg-slate-100 text-black'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex mt-4 w-full">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-lg"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isSending}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-[#0B4350] p-2 rounded-full text-white ml-3"
                            disabled={isSending}
                        >
                            {isSending ? (
                                <Spinner />
                            ) : (
                                <PaperAirplaneIcon className="h-8 w-8" />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbox;