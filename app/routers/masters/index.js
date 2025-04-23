const router = require("express").Router()
const categories = require("./categories")
const tabs = require("./tabs")
const services = require("./services")

router.use("/categories", categories)
router.use("/tabs", tabs)
router.use("/services", services)

module.exports = router
