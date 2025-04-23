const servicesMdl = require("../../../models/masters/services")

exports.add = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await servicesMdl.add(reqParams)
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
  const result = await servicesMdl.update(reqParams)
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
  const result = await servicesMdl.details(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.del = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await servicesMdl.del(reqParams)
  if (result["status"]) {
   return res.status(SUCCESS_CODE).json({ "status": result["status"], "msg": result["msg"], "data": result["data"] })
  } else {
   return res.status(DUPLICATE_ENTRY_CODE).json({ "status": result["status"], "msg": result["msg"] })
  }
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}