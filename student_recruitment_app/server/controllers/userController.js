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
        if(!email || !login || !password) return next(ApiError.badRequest("Некоректный email, login или password"));
        role = role || "guest";

        const candidate = await User.findOne({where: {email}});
        if(candidate) return next(ApiError.badRequest("Пользователь с таким email уже существует"));
        
        const hashPassword = await bcrypt.hash(password, 2);
        const user = await User.create({email, login, password: hashPassword, role});

        const token = generateJWT(user.id, email, login, password, role);

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

    async check(req, res, next) {
        // const {id} = req.query;
        res.json({ message: "all ok" });
    }
}

module.exports = new UserController()