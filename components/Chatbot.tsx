
import React, { useState } from 'react';
import { MessageSquareIcon } from './Icons';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Olá! 👋 Sou a assistente virtual da Vale Conecta. Como posso te ajudar hoje?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        
        const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        setTimeout(() => {
            const botResponse: Message = { id: Date.now() + 1, text: 'Entendido! Buscando os melhores profissionais para você. Só um momento...', sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl flex flex-col h-[500px] overflow-hidden border border-gray-100">
            <div className="bg-[#2A8C82] p-4 text-white flex items-center">
                <MessageSquareIcon className="h-6 w-6 mr-3" />
                <h3 className="font-bold text-lg">Agendamento Inteligente</h3>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-xl ${msg.sender === 'bot' ? 'bg-[#E8F3F1] text-[#333333]' : 'bg-[#2A8C82] text-white'}`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ex: Preciso instalar um chuveiro..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2A8C82]"
                    />
                    <button type="submit" className="bg-[#2A8C82] text-white rounded-full p-2 hover:bg-opacity-90 transition-transform transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chatbot;
