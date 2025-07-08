const ApiError = require("../error/ApiError");
const { User, websiteMail, Chat, ChatMessage } = require("../models");
const { Op } = require("sequelize");

class ChatController {
    async createWebsiteMail(req, res, next) {
        const {firstUserId, secondUserId, title, message} = req.body;

        if (!firstUserId || !secondUserId || !title || !message) {
            return next(ApiError.badRequest("Не все поля заполнены (firstUserId, secondUserId, title, message)"));
        }

        try {
            const mail = await websiteMail.create({firstUserId, secondUserId, title, message});
            return res.json({ mail });
        } catch (error) {
            console.error("Ошибка при создании websiteMail-письма:", error);
            return next(ApiError.internal("Не удалось создать email-письмо"));
        }
    }

    async updateWebsiteMail(req, res, next) {
        const {id, title, message, viewed} = req.body;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID websiteMail-письма для обновления"));
        }

        try {
            const mail = await websiteMail.findByPk(id);
            if (!mail) return next(ApiError.notFound("WebsiteMail-письмо не найдено"));

            await websiteMail.update({title, message, viewed}, {where: {id}});
            return res.json({message: "Email-письмо обновлено"});
        } catch (error) {
            console.error("Ошибка при обновлении email-письма:", error);
            return next(ApiError.internal("Не удалось обновить websiteMail-письмо"));
        }
    }

    async getAllWebsiteMails(req, res, next) {
        try {
            const mails = await websiteMail.findAll();
            return res.json({mails});
        } catch (error) {
            console.error("Ошибка при получении email-писем:", error);
            return next(ApiError.internal("Не удалось получить websiteMail-письма"));
        }
    }


    async createChat(req, res, next) {
        const { usersID } = req.body;

        if (!usersID || usersID.length === 0) {
            return next(ApiError.badRequest("Не указаны пользователи для создания чата"));
        }

        try {
            const chat = await Chat.create({usersID});
            return res.json({chat});
        } catch (error) {
            console.error("Ошибка при создании чата:", error);
            return next(ApiError.internal("Не удалось создать чат"));
        }
    }

    async updateChat(req, res, next) {
        const {id, usersID} = req.body;

        if (!id) return next(ApiError.badRequest("Не указан ID чата для обновления"));

        try {
            const chat = await Chat.findByPk(id);
            if (!chat) return next(ApiError.notFound("Чат не найден"));

            await Chat.update({usersID}, {where: {id}});
            return res.json({message: "Чат обновлен"});
        } catch (error) {
            console.error("Ошибка при обновлении чата:", error);
            return next(ApiError.internal("Не удалось обновить чат"));
        }
    }

    async getAllChats(req, res, next) {
        try {
            const chats = await Chat.findAll();
            return res.json({chats});
        } catch (error) {
            console.error("Ошибка при получении чатов:", error);
            return next(ApiError.internal("Не удалось получить чаты"));
        }
    }
    

    async createChatMessage(req, res, next) {
        const {chatId, userId, message} = req.body;

        if (!chatId || !userId || !message) {
            return next(ApiError.badRequest("Не все поля заполнены (chatId, userId, message)"));
        }

        try {
            const chatMessage = await ChatMessage.create({chatId, userId, message});

            const chat = await Chat.findByPk(chatId);
            if (!chat) {
                return next(ApiError.notFound("Чат не найден"));
            }

            const updatedChatMessagesId = [...chat.chatMessagesId, chatMessage.id];

            await Chat.update({chatMessagesId: updatedChatMessagesId }, { where: { id: chatId }});

            return res.json({chatMessage});
        } catch (error) {
            console.error("Ошибка при создании сообщения в чате:", error);
            return next(ApiError.internal("Не удалось создать сообщение в чате"));
        }
    }


    async updateChatMessage(req, res, next) {
        const {id, message, viewed} = req.body;

        if (!id) return next(ApiError.badRequest("Не указан ID сообщения для обновления"));

        try {
            const messageObj = await ChatMessage.findByPk(id);
            if (!messageObj) {
                return next(ApiError.notFound("Сообщение не найдено"));
            }

            await ChatMessage.update({message, viewed}, {where: {id}});
            return res.json({message: "Сообщение обновлено"});
        } catch (error) {
            console.error("Ошибка при обновлении сообщения в чате:", error);
            return next(ApiError.internal("Не удалось обновить сообщение в чате"));
        }
    }

    async getAllChatMessages(req, res, next) {
        const {chatId} = req.query;

        if (!chatId) {
            return next(ApiError.badRequest("Не указан chatId"));
        }

        try {
            const chat = await Chat.findByPk(chatId);
            if (!chat) return next(ApiError.notFound("Чат не найден"));

            const chatMessagesId = chat.chatMessagesId;

            if (!chatMessagesId || chatMessagesId.length === 0) return res.json({ messages: [] });

            const messages = await ChatMessage.findAll({where: {id: {[Op.in]: chatMessagesId}}});

            return res.json({messages});
        } catch (error) {
            console.error("Ошибка при получении сообщений чата:", error);
            return next(ApiError.internal("Не удалось получить сообщения чата"));
        }
    }

}

module.exports = new ChatController();
