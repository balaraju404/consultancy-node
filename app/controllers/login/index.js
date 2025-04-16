const loginMdl = require("../../models/login")

exports.password = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await loginMdl.password(reqParams)
  res.status(result["status_code"]).json({ "status": result["status"], "msg": result["msg"], "data": result["data"] })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.otp = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await loginMdl.otp(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "msg": "User updated successfully", "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}