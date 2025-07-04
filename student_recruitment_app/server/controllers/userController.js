const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateJWT = (id, email, login, role) => {
    return jwt.sign({id, email, login, role}, process.env.SECRET_KEY, {expiresIn: "24h"})
}

class UserController {
    async registration(req, res, next) {
        let {email, login, password, role} = req.body;
        if(!email || !login || !password) return next(ApiError.unauthorized("Некоректный email, login или password"));
        role = role || "guest";

        let candidate = await User.findOne({where: {login}});
        if(candidate) return next(ApiError.badRequest("Пользователь с таким login уже существует"));
        candidate = await User.findOne({where: {email}});
        if(candidate) return next(ApiError.badRequest("Пользователь с таким email уже существует"));
        
        const hashPassword = await bcrypt.hash(password, 2);
        const user = await User.create({email, login, password: hashPassword, role});

        const token = generateJWT(user.id, email, login, role);

        return res.json({token});
    }

    async login(req, res, next) {
        const {email, login, password} = req.body;
        let user = await User.findOne({where: {email, login}})
        if(!user) return next(ApiError.internal("Пользователь не найден"));

        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) return next(ApiError.internal("Указан неверный пароль"));

        const token = generateJWT(user.id, user.email, user.login, user.role)

        return res.json({token});
    }

    async getAll(req, res, next) {
        try {
            const users = await User.findAll({});
            return res.json({users});
        } catch (error) {
            console.error(error);
            return next(ApiError.internal("Не получилось передать данные о пользователях"));
        }
    }

    async check(req, res, next) {
        const {email, login, password} = req.body;
        let user = await User.findOne({where: {email, login}})
        if(!user) return next(ApiError.notFound("Пользователь не найден"));

        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) return next(ApiError.unauthorized("Указан неверный пароль"));

        const token = generateJWT(user.id, user.email, user.login, user.role)

        return res.json({token});
    }
}

module.exports = new UserController()