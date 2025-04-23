const router = require("express").Router()
const rwt = require("./role-wise-tabs")

router.use("/rwt", rwt)

module.exports = router
