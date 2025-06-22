import React, { useState } from 'react';
import { sendMessage } from '../services/api';
import { FaUser, FaRobot, FaMoon, FaSun, FaArrowUp } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import "../assets/chat.css"

export default function Chat() {
  const [userMessage, setUserMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  async function sendMessageHandler() {
    if (!userMessage.trim()) return;

    console.log('👤 User is sending message:', userMessage);
    const newChat = [...chat, { role: 'user', content: userMessage }];
    setChat(newChat);
    setUserMessage('');

    try {
      setLoading(true);
      const answer = await sendMessage(userMessage);
      console.log('🤖 Bot responded with answer:', answer);
      setChat([...newChat, { role: 'assistant', content: answer }]);
    } catch (error) {
      console.error('❌ Error while sending message:', error);
      const errorMsg = error?.response?.status === 429
        ? 'You have exceeded your quota. Please review your OpenAI billing or usage.'
        : 'Error: Could not get a response. Try again later.';
      setChat([...newChat, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={` h-screen flex flex-col ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>

      {/*  Header */}
      <div className={`flex justify-between items-center px-6 pr-10 p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border-b`}>
        <div className="flex items-center space-x-3">
          <SiOpenai className={`text-3xl ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`} />
          <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>ChatGPT</h1>
        </div>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={`text-2xl p-2 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-500'}  hover:scale-125 transform transition`}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun className='text-white' />}
        </button>
      </div>

      {/* 💬 Chat Area (Scroll Only) */}
      <div className={`flex-1 overflow-y-scroll p-3 space-y-3 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>

        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-green-500 text-white' : 'bg-green-600 text-gray-100'}`}><FaRobot /></div>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-2xl shadow ${msg.role === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                : theme === 'light' ? 'bg-gray-100 text-gray-800 rounded-bl-none' : 'bg-gray-600 text-gray-100 rounded-bl-none'
                }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-blue-600 text-gray-100'}`}><FaUser /></div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-green-500 text-white' : 'bg-green-600 text-gray-100'}`}><FaRobot /></div>
            <div className={`max-w-[75%] p-3 rounded-2xl ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-600 text-gray-100'}`} >
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* 👇 Footer */}
      <div className={`flex space-x-3 p-3 pr-10 border-t ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`} >
        <input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className={`flex-1 p-3 rounded-full border focus:outline-none ${theme === 'light'
            ? 'border-gray-300 focus:ring-1 focus:ring-black-500 bg-gray-300 text-gray-800 placeholder:text-gray-600 placeholder:text-justify '
            : 'bg-gray-700 border-gray-600 focus:ring-1 focus:ring-gray-500 text-white'}`}
          placeholder="Say anything..."
        />
        <button
          onClick={sendMessageHandler}
          className={`rounded-full p-3 flex items-center justify-center transform transition hover:scale-105 ring-1
      ${theme === 'light' ? 'bg-gray-300 text-black' : 'bg-gray-600 text-white'}`}
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      </div>


    </div> 
  );
}
