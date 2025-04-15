const usersMdl = require("../../models/users")

exports.add = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await usersMdl.add(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "msg": "User created successfully", "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.update = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await usersMdl.update(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "msg": "User updated successfully", "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}