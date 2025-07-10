import {Chat, type Message} from "../../features/Chat.tsx";

export const ChatPage = () => {
    const contact = {
        name: "Иван Петров",
        role: 'student',
        avatarUrl: "https://example.com/avatar.jpg",
    };

    const initialMessages: Message[] = [
        {
            id: "1",
            text: "Привет! Как дела?",
            isMine: false,
            timestamp: new Date(Date.now() - 3600000),
        },
        {
            id: "2",
            text: "Привет! Все отлично, спасибо!",
            isMine: true,
            timestamp: new Date(),
        },
    ];
    return (
        <Chat contact={contact} initialMessages={initialMessages}/>
    )
}