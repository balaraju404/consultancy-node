const router = require("express").Router()
const user = require("./users")

router.use("/user", user)

router.get("/health-check", (req, res) => {
 res.status(200).json({ status: "ok", message: "Server is up and running" })
})

module.exports = router
