const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Portfolio, Teg, Project } = require("../models");
const { where, Op } = require("sequelize");

class PortfolioController {
    async create(req, res, next) {
        const {user_id, salary, tegs, description} = req.body;
        if(!user_id) return next(ApiError.badRequest("Не указан id пользователя"));
        if(!salary || !tegs || !description) return next(ApiError.badRequest("Не все поля заполнены (salary, tegs (массив тегов), description)"));

        const user = await User.findOne({where: {id: user_id}});
        if(!user) return next(ApiError.badRequest("Пользователь с таким id не существует"));

        const portfolio = await Portfolio.create({userId: user_id, salary, tegs, description});

        return res.json({portfolio});
    }

    async update(req, res, next) {
        
    }

    async getAllPortfolio(req, res, next) {
        const {min_salary, max_salary, tegs} = req.body;
        let {limit, page} = req.body;

        limit = limit || 9;
        page = page || 1;
        const offset = page * limit - limit;

        let whereConditions = {};

        if(min_salary && max_salary) whereConditions.salary = {[Op.overlap]: tegs};
        if(tegs && tegs.length > 0) whereConditions.tegs = {[Op.overlap]: tegs};

        const portfolios = await Portfolio.findAll({ where: whereConditions }, limit, offset);

        return res.json(portfolios);
    }

    async addTeg(req, res, next) {
        const {name} = req.body;
        if(!name) return ApiError.badRequest("Укажите название тега");
        const teg = await Teg.create({name});

        return res.json({teg});
    }

    async addProject(req, res, next) {
        const {name, description, images, link} = req.body;
        if(!name) return ApiError.badRequest("Не все поля заполнены");
        const teg = await Project.create({name, description, images, link});

        return res.json({teg});
    }

    
}

module.exports = new PortfolioController()