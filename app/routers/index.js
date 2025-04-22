const router = require("express").Router()
const user = require("./users")
const login = require("./login")
const masters = require("./masters")

router.use("/user", user)
router.use("/login", login)
router.use("/masters", masters)

router.get("/", (req, res) => {
 res.status(200).json({ message: "Welcome to the API" })
})
router.get("/health-check", (req, res) => {
 res.status(200).json({ status: "ok", message: "Server is up and running" })
})

module.exports = router
