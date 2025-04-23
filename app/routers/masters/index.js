const router = require("express").Router()
const categories = require("./categories")
const tabs = require("./tabs")

router.use("/categories", categories)
router.use("/tabs", tabs)

module.exports = router
