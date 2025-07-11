import React, { useState } from 'react';
import ChatList, {type ChatContact} from "../../features/chat/components/ChatList.tsx";
import Chat from "../../features/chat/components/Chat.tsx";


const ChatPage: React.FC = () => {
    const [activeChat, setActiveChat] = useState<ChatContact | null>(null);

    const chats: ChatContact[] = [
        {
            id: '1',
            name: 'Анна Иванова',
            role: 'student',
            avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
            lastMessage: 'Привет! Когда сможем встретиться?',
            lastMessageTime: new Date(Date.now() - 3600000), // 1 час назад
            unreadCount: 2
        },
        {
            id: '2',
            name: 'ООО Технологии Будущего',
            role: 'employer',
            avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            lastMessage: 'Мы рассмотрели ваше резюме!',
            lastMessageTime: new Date(Date.now() - 86400000), // 1 день назад
        },
        {
            id: '3',
            name: 'Иван Петров',
            role: 'student',
            avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
            lastMessage: 'Спасибо за помощь с проектом!',
            lastMessageTime: new Date(Date.now() - 172800000), // 2 дня назад
            unreadCount: 5
        },
        {
            id: '4',
            name: 'IT Компания "Решение"',
            role: 'employer',
            avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            lastMessage: 'Приглашаем вас на собеседование',
            lastMessageTime: new Date(Date.now() - 259200000), // 3 дня назад
        },
    ];

    const handleSelectChat = (chatId: string) => {
        const chat = chats.find(c => c.id === chatId) || null;
        setActiveChat(chat);
    };

    return (
        <div
            className="flex h-screen"
            style={{ backgroundColor: 'var(--color-white-30)' }}
        >
            <ChatList
                chats={chats}
                onSelectChat={handleSelectChat}
                activeChatId={activeChat?.id}
            />

            <div className="flex-1 flex flex-col p-5">
                {activeChat ? (
                    <div className="h-full">
                        <Chat
                            contact={{
                                name: activeChat.name,
                                role: activeChat.role,
                                avatarUrl: activeChat.avatarUrl
                            }}
                            initialMessages={[]}
                        />
                    </div>
                ) : (
                    <div
                        className="flex items-center justify-center h-full rounded-2xl"
                        style={{
                            backgroundColor: 'var(--color-white-10)',
                            boxShadow: 'var(--shadow-card)'
                        }}
                    >
                        <div className="text-center p-8 max-w-lg">
                            <div
                                className="border-2 border-dashed rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                                style={{
                                    borderColor: 'var(--color-gray-20)',
                                    backgroundColor: 'var(--color-white-30)'
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ color: 'var(--color-gray-10)' }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <h2
                                className="text-2xl font-bold mb-3"
                                style={{ color: 'var(--color-black-20)' }}
                            >
                                Выберите чат
                            </h2>
                            <p
                                className="mb-6"
                                style={{ color: 'var(--color-gray-10)' }}
                            >
                                Выберите чат из списка слева, чтобы начать общение или просмотреть историю переписки
                            </p>
                            <button
                                className="font-bold py-3 px-6 rounded-xl transition duration-200"
                                style={{
                                    backgroundColor: 'var(--color-blue-10)',
                                    color: 'var(--color-white-10)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-blue-20)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-blue-10)';
                                }}
                                onClick={() => handleSelectChat(chats[0].id)}
                            >
                                Начать общение
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;