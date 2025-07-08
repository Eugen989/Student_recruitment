const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Portfolio, Teg, Project, PortfolioTeg } = require("../models");
const { where, Op } = require("sequelize");

class PortfolioController {
    async createPortfolio(req, res, next) {
        const { userId, salary, tegs, description } = req.body;
        if (!userId || !salary || !tegs || !description) {
            return next(ApiError.badRequest("Не все поля заполнены (userId, salary, tegs (массив тегов), description)"));
        }

        let portfolio;
        try {
            portfolio = await Portfolio.create({ userId, salary, tegs_id: tegs, description });

            let portfolioTeg;
            for (const teg_id of tegs) {
                portfolioTeg = await PortfolioTeg.create({ portfolioId: portfolio.id, tegId: teg_id });
            }

            return res.json({ portfolio });
        } catch (error) {
            console.error("Ошибка при создании портфолио:", error);
            return next(ApiError.internal("Не удалось создать портфолио"));
        }
    }

    async updatePortfolio(req, res, next) {

    }

    async getAllPortfolio(req, res, next) {
        const { min_salary, max_salary, tegs } = req.body;
        let { limit, page } = req.body;

        limit = limit || 9;
        page = page || 1;
        const offset = (page - 1) * limit;

        let whereConditions = {};

        if (min_salary) whereConditions.salary = { [Op.gte]: min_salary };

        if (max_salary) whereConditions.salary = { ...whereConditions.salary, [Op.lte]: max_salary };

        if (tegs && tegs.length > 0) whereConditions.tegs_id = { [Op.overlap]: tegs };

        console.log("Условия запроса:", whereConditions);

        try {
            const portfolios = await Portfolio.findAll({ where: whereConditions, limit, offset });
            return res.json(portfolios);
        } catch (error) {
            console.error("Ошибка при получении портфолио:", error);
            return next(ApiError.internal("Не удалось получить портфолио"));
        }
    }


    async createTeg(req, res, next) {
        const {name} = req.body;
        if(!name) return ApiError.badRequest("Укажите название тега");
        const teg = await Teg.create({name});
        
        console.log("all worked in addTeg");

        return res.json({teg});
    }

    async getAllTegs(req, res, next) {
        const tegs = await Teg.findAll();

        return res.json({tegs});
    }


    async createProject(req, res, next) {
        const {name, description, images, link} = req.body;
        if(!name) return ApiError.badRequest("Не все поля заполнены");
        const teg = await Project.create({name, description, images, link});

        return res.json({teg});
    }


    async updateProject(req, res, next) {
        
    }

    async getAllProjects(req, res, next) {
        
    }
}

module.exports = new PortfolioController()