
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareIcon } from './Icons';
import { GoogleGenAI, Chat } from '@google/genai';

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
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const newChat = ai.chats.create({
                    model: 'gemini-3-flash-preview',
                    config: {
                        systemInstruction: "Você é um assistente virtual amigável e prestativo para a Vale Conecta, uma plataforma que conecta clientes a profissionais de serviços domésticos. Seu objetivo é entender a necessidade do usuário e ajudá-lo a criar uma solicitação de serviço (chamada de 'tarefa'). Seja conciso e guie o usuário. Se você entender o que ele precisa, confirme e pergunte se pode iniciar a criação da tarefa para ele. Responda sempre em português do Brasil.",
                    },
                });
                setChat(newChat);
            } catch (error) {
                console.error("Failed to initialize Gemini chat:", error);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: "Desculpe, não consegui me conectar com a inteligência artificial no momento. Por favor, tente novamente mais tarde.",
                    sender: 'bot'
                }]);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading || !chat) return;
        
        const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInputValue = inputValue;
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: currentInputValue });
            
            if (response.text) {
                 const botResponse: Message = { id: Date.now() + 1, text: response.text, sender: 'bot' };
                 setMessages(prev => [...prev, botResponse]);
            } else {
                throw new Error("Empty response from API.");
            }
           
        } catch(error) {
             console.error("Error sending message to Gemini:", error);
             const errorMessage: Message = { id: Date.now() + 1, text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.', sender: 'bot' };
             setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl flex flex-col h-[500px] overflow-hidden border border-gray-100">
            <div className="bg-[#2A8C82] p-4 text-white flex items-center">
                <MessageSquareIcon className="h-6 w-6 mr-3" />
                <h3 className="font-bold text-lg">Agendamento Inteligente</h3>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-xl ${msg.sender === 'bot' ? 'bg-[#E8F3F1] text-[#333333]' : 'bg-[#2A8C82] text-white'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-sm px-4 py-3 rounded-xl bg-[#E8F3F1] text-[#333333]">
                           <div className="flex items-center justify-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={!chat ? "Conectando IA..." : "Ex: Preciso instalar um chuveiro..."}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2A8C82]"
                        disabled={isLoading || !chat}
                    />
                    <button type="submit" disabled={isLoading || !chat} className="bg-[#2A8C82] text-white rounded-full p-2 hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chatbot;
