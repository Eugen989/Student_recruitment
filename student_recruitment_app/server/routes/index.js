const Router = require("express");
const router = new Router;

const userRouter = require("./userRouter");

router.use("/user", userRouter);

router.use("/", (req, res) => res.json({message: "You connected to server"}))

module.exports = router;