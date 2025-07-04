const Router = require("express");
const router = new Router;
const protfolioController = require("../controllers/portfolioController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRoleMiddleware("student"), protfolioController.create);
router.post("/update", checkRoleMiddleware("student"), protfolioController.update);
router.get("/pages", protfolioController.getAllPortfolio);
router.post("/addTeg", protfolioController.addTeg);
router.post("/addProject", protfolioController.addProject);

router.get("/", (req, res) => res.json({message: "You connected to portfolio"}));

module.exports = router;