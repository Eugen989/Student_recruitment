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
            portfolio = await Portfolio.create({userId, salary, tegs_id: tegs, description});

            let portfolioTeg;
            for (const teg_id of tegs) {
                portfolioTeg = await PortfolioTeg.create({portfolioId: portfolio.id, tegId: teg_id});
            }

            return res.json({ portfolio });
        } catch (error) {
            console.error("Ошибка при создании портфолио:", error);
            return next(ApiError.internal("Не удалось создать портфолио"));
        }
    }

    async updatePortfolio(req, res, next) {
        const { id, userId, salary, tegs, description } = req.body;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID портфолио для обновления"));
        }

        try {
            const portfolio = await Portfolio.findByPk(id);
            if (!portfolio) {
                return next(ApiError.notFound("Портфолио не найдено"));
            }

            const updatedPortfolio = await Portfolio.update(
                {userId, salary, tegs_id: tegs, description},
                {where: {id}}
            );

            return res.json({ updatedPortfolio });
        } catch (error) {
            console.error("Ошибка при обновлении портфолио:", error);
            return next(ApiError.internal("Не удалось обновить портфолио"));
        }
    }

    async deletePortfolio(req, res, next) {
        const {id} = req.params;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID портфолио для удаления"));
        }

        try {
            const portfolio = await Portfolio.findByPk(id);
            if (!portfolio) {
                return next(ApiError.notFound("Портфолио не найдено"));
            }

            await Portfolio.destroy({ where: { id } });
            return res.json({ message: "Портфолио успешно удалено" });
        } catch (error) {
            console.error("Ошибка при удалении портфолио:", error);
            return next(ApiError.internal("Не удалось удалить портфолио"));
        }
    }

    async getAllPortfolio(req, res, next) {
        const { min_salary, max_salary, tegs } = req.body;
        let { limit, page } = req.body;

        limit = limit || 9;
        page = page || 1;
        const offset = (page - 1) * limit;

        let whereConditions = {};

        if (min_salary) whereConditions.salary = {[Op.gte]: min_salary};

        if (max_salary) whereConditions.salary = {...whereConditions.salary, [Op.lte]: max_salary};

        if (tegs && tegs.length > 0) whereConditions.tegs_id = {[Op.overlap]: tegs};

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

    async updateTeg(req, res, next) {
        const { id, name } = req.body;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID тега для обновления"));
        }

        try {
            const teg = await Teg.findByPk(id);
            if (!teg) {
                return next(ApiError.notFound("Тег не найден"));
            }

            const updatedTeg = await Teg.update(
                {name},
                {where: {id}}
            );

            return res.json({ updatedTeg });
        } catch (error) {
            console.error("Ошибка при обновлении тега:", error);
            return next(ApiError.internal("Не удалось обновить тег"));
        }
    }

    async deleteTeg(req, res, next) {
        const {id} = req.params;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID тега для удаления"));
        }

        try {
            const teg = await Teg.findByPk(id);
            if (!teg) {
                return next(ApiError.notFound("Тег не найден"));
            }

            await Teg.destroy({ where: {id} });
            return res.json({ message: "Тег успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении тега:", error);
            return next(ApiError.internal("Не удалось удалить тег"));
        }
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
        const {id, name, description, images, link} = req.body;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID проекта для обновления"));
        }

        try {
            const project = await Project.findByPk(id);
            if (!project) {
                return next(ApiError.notFound("Проект не найден"));
            }

            const updatedProject = await Project.update(
                { name, description, images, link },
                { where: { id } }
            );

            return res.json({ updatedProject });
        } catch (error) {
            console.error("Ошибка при обновлении проекта:", error);
            return next(ApiError.internal("Не удалось обновить проект"));
        }
    }

    async deleteProject(req, res, next) {
        const {id} = req.params;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID проекта для удаления"));
        }

        try {
            const project = await Project.findByPk(id);
            if (!project) {
                return next(ApiError.notFound("Проект не найден"));
            }

            await Project.destroy({ where: {id} });
            return res.json({ message: "Проект успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении проекта:", error);
            return next(ApiError.internal("Не удалось удалить проект"));
        }
    }


    async getAllProjects(req, res, next) {
        let {limit, page} = req.body;

        limit = limit || 4;
        page = page || 1;
        const offset = (page - 1) * limit;

        try {
            const projects = await Project.findAll({ limit, offset });
            return res.json(projects);
        } catch (error) {
            console.error("Ошибка при получении проектов:", error);
            return next(ApiError.internal("Не удалось получить проекты"));
        }
    }

}

module.exports = new PortfolioController()