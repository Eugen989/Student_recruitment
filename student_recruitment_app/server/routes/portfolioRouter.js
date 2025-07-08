const Router = require("express");
const router = new Router;
const protfolioController = require("../controllers/portfolioController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/createPortfolio", protfolioController.createPortfolio);
router.post("/updatePortfolio", checkRoleMiddleware("student"), protfolioController.updatePortfolio);
router.get("/pages", protfolioController.getAllPortfolio);

router.post("/createTeg", protfolioController.createTeg);
router.get("/getAllTegs", protfolioController.getAllTegs);

router.post("/createProject", protfolioController.createProject);
router.post("/updateProject", protfolioController.updateProject);
router.post("/getAllProjects", protfolioController.getAllProjects);

router.get("/", (req, res) => res.json({message: "You connected to portfolio"}));

module.exports = router;