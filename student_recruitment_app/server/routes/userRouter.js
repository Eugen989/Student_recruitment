const Router = require("express");
const router = new Router;
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/getAll", userController.getAll);
router.get("/auth", authMiddleware, userController.check);

router.get("/", (req, res) => res.json({message: "You connected to user"}));

module.exports = router;