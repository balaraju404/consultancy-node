const usersMdl = require("../../models/users")

exports.add = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await usersMdl.add(reqParams)
  if (result["status"]) {
   return res.status(SUCCESS_CODE).json({ "status": result["status"], "msg": result["msg"], "data": result["data"] })
  } else {
   return res.status(DUPLICATE_ENTRY_CODE).json({ "status": result["status"], "msg": result["msg"] })
  }
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.update = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await usersMdl.update(reqParams)
  if (result["status"]) {
   return res.status(SUCCESS_CODE).json({ "status": result["status"], "msg": result["msg"], "data": result["data"] })
  } else {
   return res.status(DUPLICATE_ENTRY_CODE).json({ "status": result["status"], "msg": result["msg"] })
  }
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.details = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await usersMdl.details(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}