import React, { useState, useRef, useEffect } from 'react';

// Типы для TypeScript
type Role = 'student' | 'employer' | 'other';
interface Contact {
    name: string;
    role: Role;
    avatarUrl: string;
}
interface Message {
    id: string;
    text: string;
    isMine: boolean;
    timestamp: Date;
}

interface ChatProps {
    contact: Contact;
    initialMessages?: Message[];
}

const Chat: React.FC<ChatProps> = ({ contact, initialMessages = [] }) => {
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
            "Хорошо, договорились!",
            "Что вы думаете по этому поводу?",
            "Можете рассказать подробнее?",
            "Отличная идея!",
            "Я передам эту информацию нашему отделу",
            "Когда вам будет удобно встретиться?"
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
        <div
            className="flex flex-col h-full w-full rounded-2xl overflow-hidden"
            style={{
                border: '1px solid var(--color-gray-20)',
                boxShadow: 'var(--shadow-card)',
                backgroundColor: 'var(--color-white-10)'
            }}
        >
            {/* Шапка чата */}
            <header
                className="flex items-center p-5"
                style={{
                    borderBottom: '1px solid var(--color-gray-20)',
                    backgroundColor: 'var(--color-white-30)'
                }}
            >
                <div>
                    <img
                        src={contact.avatarUrl}
                        alt={contact.name}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                        style={{ border: '2px solid var(--color-white-10)' }}
                    />
                </div>
                <div>
                    <h2
                        className="font-bold text-xl"
                        style={{ color: 'var(--color-black-20)' }}
                    >
                        {contact.name}
                    </h2>
                    <p
                        className="text-sm capitalize"
                        style={{ color: 'var(--color-gray-10)' }}
                    >
                        {contact.role === 'student' ? 'Студент' :
                            contact.role === 'employer' ? 'Работодатель' : 'Другой'}
                    </p>
                </div>
            </header>

            {/* Окно сообщений */}
            <div
                className="flex-1 overflow-y-auto p-6"
                style={{
                    background: 'linear-gradient(to bottom, var(--color-white-30), var(--color-white-10))'
                }}
            >
                <div className="space-y-4 max-w-5xl mx-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xl lg:max-w-2xl px-5 py-3 rounded-2xl ${
                                    message.isMine
                                        ? 'rounded-br-none'
                                        : 'rounded-bl-none'
                                }`}
                                style={{
                                    boxShadow: 'var(--shadow-card)',
                                    backgroundColor: message.isMine
                                        ? 'var(--color-blue-10)'
                                        : 'var(--color-white-10)',
                                    color: message.isMine
                                        ? 'var(--color-white-10)'
                                        : 'var(--color-black-20)',
                                    border: message.isMine
                                        ? 'none'
                                        : '1px solid var(--color-gray-20)'
                                }}
                            >
                                <p className="break-words text-base">{message.text}</p>
                                <span
                                    className={`text-xs block mt-1 text-right ${
                                        message.isMine ? 'text-blue-200' : 'text-gray-500'
                                    }`}
                                    style={{
                                        color: message.isMine
                                            ? 'var(--color-purple-20)'
                                            : 'var(--color-gray-10)'
                                    }}
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
                className="flex p-5"
                style={{
                    borderTop: '1px solid var(--color-gray-20)',
                    backgroundColor: 'var(--color-white-10)'
                }}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1 py-4 px-5 rounded-l-xl text-base"
                    style={{
                        border: '1px solid var(--color-gray-20)',
                        borderRight: 'none',
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="font-bold py-4 px-8 rounded-r-xl transition duration-200 text-base"
                    style={{
                        backgroundColor: inputValue.trim()
                            ? 'var(--color-blue-10)'
                            : 'var(--color-gray-20)',
                        color: 'var(--color-white-10)',
                        cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                        opacity: inputValue.trim() ? 1 : 0.5
                    }}
                    onMouseEnter={(e) => {
                        if (inputValue.trim()) {
                            e.currentTarget.style.backgroundColor = 'var(--color-blue-20)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (inputValue.trim()) {
                            e.currentTarget.style.backgroundColor = 'var(--color-blue-10)';
                        }
                    }}
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default Chat;