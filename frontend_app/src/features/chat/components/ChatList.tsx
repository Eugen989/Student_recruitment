import React from 'react';

type Role = 'student' | 'employer' | 'other';

export interface ChatContact {
    id: string;
    name: string;
    role: Role;
    avatarUrl: string;
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount?: number;
}

interface ChatListProps {
    chats: ChatContact[];
    onSelectChat: (chatId: string) => void;
    activeChatId?: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, activeChatId }) => {
    return (
        <div
            className="w-80 h-full flex flex-col"
            style={{
                borderRight: '1px solid var(--color-gray-20)',
                backgroundColor: 'var(--color-white-10)',
                boxShadow: 'var(--shadow-search)'
            }}
        >
            {/* Заголовок */}
            <div
                className="p-5"
                style={{
                    borderBottom: '1px solid var(--color-gray-20)',
                    background: 'linear-gradient(to right, var(--color-white-20), var(--color-white-30))'
                }}
            >
                <h1
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-black-20)' }}
                >
                    Чаты
                </h1>
            </div>

            {/* Список чатов */}
            <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`flex items-center p-4 cursor-pointer transition-all duration-200 ${
                            activeChatId === chat.id
                                ? 'border-l-4'
                                : 'hover:bg-[var(--color-white-30)]'
                        }`}
                        style={{
                            borderBottom: '1px solid var(--color-gray-20)',
                            borderLeftColor: activeChatId === chat.id
                                ? 'var(--color-blue-10)'
                                : 'transparent',
                            backgroundColor: activeChatId === chat.id
                                ? 'var(--color-white-30)'
                                : 'transparent'
                        }}
                    >
                        {/* Аватарка с индикатором роли */}
                        <div className="relative flex-shrink-0 mr-4">
                            <img
                                src={chat.avatarUrl}
                                alt={chat.name}
                                className="w-12 h-12 rounded-full object-cover"
                                style={{ border: '2px solid var(--color-white-10)' }}
                            />
                        </div>

                        {/* Информация о чате */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                                <h3
                                    className="font-semibold truncate"
                                    style={{ color: 'var(--color-black-20)' }}
                                >
                                    {chat.name}
                                </h3>
                                <span
                                    className="text-xs ml-2"
                                    style={{ color: 'var(--color-gray-10)' }}
                                >
                  {formatTime(chat.lastMessageTime)}
                </span>
                            </div>

                            <div className="flex items-center mt-1">
                <span
                    className="text-xs px-1.5 py-0.5 rounded capitalize mr-2"
                    style={{
                        backgroundColor: 'var(--color-gray-30)',
                        color: 'var(--color-gray-10)'
                    }}
                >
                  {chat.role === 'student' ? 'студент' :
                      chat.role === 'employer' ? 'работодатель' : 'другой'}
                </span>
                                <p
                                    className="text-sm truncate"
                                    style={{ color: 'var(--color-gray-10)' }}
                                >
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>

                        {/* Индикатор непрочитанных сообщений */}
                        {chat.unreadCount && chat.unreadCount > 0 && (
                            <span
                                className="flex-shrink-0 ml-3 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                                style={{
                                    backgroundColor: 'var(--color-blue-10)',
                                    color: 'var(--color-white-10)'
                                }}
                            >
                {chat.unreadCount}
              </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Функция форматирования времени
function formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин назад`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} ч назад`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'вчера';
    if (diffDays < 7) return `${diffDays} дн назад`;

    return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
}

export default ChatList;