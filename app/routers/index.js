const router = require("express").Router()
const user = require("./users")
const login = require("./login")

router.use("/user", user)
router.use("/login", login)

router.get("/health-check", (req, res) => {
 res.status(200).json({ status: "ok", message: "Server is up and running" })
})

module.exports = router
