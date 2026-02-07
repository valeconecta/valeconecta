
import React, { useState, useRef, useEffect } from 'react';
import { DetailedTask, TaskStatus } from '../../data/taskDetailMockData';
import { PaperclipIcon } from '../Icons';

interface ChatWorkspaceProps {
    task: DetailedTask;
    client: { id: number, name: string, photoUrl: string };
    professional: { id: number, name: string, photoUrl: string };
    currentUserRole: 'client' | 'professional';
    onStatusChange: (newStatus: TaskStatus) => void;
    onSendMessage: (message: string) => void;
}

const ChatWorkspace: React.FC<ChatWorkspaceProps> = ({ task, client, professional, currentUserRole, onStatusChange, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [task.chatHistory]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };
    
    const renderActionButton = () => {
        const { status } = task;

        if (currentUserRole === 'professional') {
            if (status === 'Agendado') {
                return <button onClick={() => onStatusChange('Em Andamento')} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Iniciar Serviço</button>;
            }
            if (status === 'Em Andamento') {
                return <button onClick={() => onStatusChange('Concluído')} className="w-full bg-[#2A8C82] text-white font-bold py-3 rounded-lg hover:bg-opacity-90">Finalizar Serviço</button>;
            }
        }

        if (currentUserRole === 'client') {
            if (status === 'Concluído') {
                return <button onClick={() => onStatusChange('Confirmado Pelo Cliente')} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Confirmar Conclusão</button>;
            }
            if (status === 'Confirmado Pelo Cliente') {
                 return <button onClick={() => onStatusChange('Confirmado Pelo Cliente')} className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg">Avaliar Profissional</button>;
            }
        }

        return null;
    };


    return (
        <div className="flex-1 flex flex-col min-h-[60vh]">
            <div ref={chatContainerRef} className="flex-1 space-y-4 p-4 overflow-y-auto bg-gray-50 rounded-md">
                {task.chatHistory.map((msg, index) => {
                    const isCurrentUser = msg.senderId === (currentUserRole === 'client' ? client.id : professional.id);
                    const sender = msg.senderId === client.id ? client : professional;
                    return (
                        <div key={index} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            {!isCurrentUser && <img src={sender.photoUrl} alt={sender.name} className="w-8 h-8 rounded-full"/>}
                            <div className={`max-w-md p-3 rounded-xl ${isCurrentUser ? 'bg-[#2A8C82] text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 pt-4 border-t">
                {renderActionButton()}
                <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-2">
                    <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                        <PaperclipIcon className="h-5 w-5" />
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2A8C82]"
                    />
                    <button type="submit" className="bg-[#2A8C82] text-white rounded-full p-2 hover:bg-opacity-90 transition-transform transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWorkspace;
