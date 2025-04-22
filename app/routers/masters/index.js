const router = require("express").Router()
const tabs = require("./tabs")

router.use("/tabs", tabs)

module.exports = router
