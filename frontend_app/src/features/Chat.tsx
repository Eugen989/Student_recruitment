import React, { useState, useRef, useEffect } from 'react';

// Типы для TypeScript
type Role = 'student' | 'employer' | 'other';
interface Contact {
    name: string;
    role: Role;
    avatarUrl: string;
}
export interface Message {
    id: string;
    text: string;
    isMine: boolean;
    timestamp: Date;
}

interface ChatProps {
    contact: Contact;
    initialMessages?: Message[];
}

export const Chat: React.FC<ChatProps> = ({ contact, initialMessages = [] }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Автопрокрутка к последнему сообщению
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            isMine: true,
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputValue('');
    };

    // Генерация случайного ответа (для демонстрации)
    const generateReply = () => {
        const replies = [
            "Привет! Как дела?",
            "Спасибо за сообщение!",
            "Да, я согласен с вами",
            "Интересный вопрос, дайте подумать...",
            "Хорошо, договорились!"
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    };

    // Автоматический ответ (для демонстрации)
    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].isMine) {
            const timer = setTimeout(() => {
                const reply: Message = {
                    id: Date.now().toString(),
                    text: generateReply(),
                    isMine: false,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, reply]);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
            {/* Шапка чата */}
            <header className="flex items-center p-4 border-b border-gray-200 bg-gray-50">
                <div className="relative">
                    <img
                        src={contact.avatarUrl}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow"
                    />
                    <span className={`absolute bottom-0 right-4 w-3 h-3 rounded-full border-2 border-white ${
                        contact.role === 'student' ? 'bg-green-500' :
                            contact.role === 'employer' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></span>
                </div>
                <div>
                    <h2 className="font-semibold text-lg text-gray-800">{contact.name}</h2>
                    <p className="text-sm text-gray-500 capitalize">
                        {contact.role === 'student' ? 'Студент' :
                            contact.role === 'employer' ? 'Работодатель' : 'Другой'}
                    </p>
                </div>
            </header>

            {/* Окно сообщений */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="space-y-3">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                                    message.isMine
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                                }`}
                            >
                                <p className="break-words">{message.text}</p>
                                <span
                                    className={`text-xs block mt-1 text-right ${
                                        message.isMine ? 'text-blue-200' : 'text-gray-500'
                                    }`}
                                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Поле ввода */}
            <form
                onSubmit={handleSend}
                className="flex p-4 border-t border-gray-200 bg-white"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1 border border-gray-300 rounded-l-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-r-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};