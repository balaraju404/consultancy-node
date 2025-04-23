const dbHelper = require("../../../utils/db-helper")
const { getObjectId, dateToString } = require("../../../utils/helper")

exports.add = async (reqParams) => {
 try {
  const insertData = {
   "service_name": reqParams["service_name"] || "",
   "service_icon": reqParams["service_icon"] || "",
   "status": reqParams["status"] || 1,
   "created_date": new Date(),
   "created_by": reqParams["created_by"] || "System",
  }
  const result = await dbHelper.insertOne(SERVICES_COLL, insertData)
  return { "status": true, "msg": "Service created successfully", "data": result }
 } catch (error) {
  throw error
 }
}
exports.update = async (reqParams) => {
 try {
  const updateData = {}
  if (reqParams["service_name"]) updateData["service_name"] = reqParams["service_name"]
  if (reqParams["service_icon"]) updateData["service_icon"] = reqParams["service_icon"]
  if (reqParams["status"]) updateData["status"] = reqParams["status"]
  updateData["modified_date"] = new Date()
  updateData["modified_by"] = reqParams["modified_by"] || "System"
  const whr = { "_id": getObjectId(reqParams["service_id"]) }
  const result = await dbHelper.updateOne(SERVICES_COLL, whr, updateData)
  return { "status": true, "msg": "Service details updated", "data": result }
 } catch (error) {
  throw error
 }
}
exports.details = async (reqParams) => {
 try {
  const status = reqParams["status"] || 1
  const whr = { "status": status }
  if (reqParams["service_id"]) whr["_id"] = getObjectId(reqParams["service_id"])

  const pipeline = [
   { $match: whr },
   { $addFields: { "service_id": "$_id", "created_date": dateToString("created_date", "%d/%b/%Y %H:%M"), "modified_date": dateToString("modified_date", "%d/%b/%Y %H:%M") } },
   { $project: { _id: 0 } }
  ]
  const result = await dbHelper.getDetails(SERVICES_COLL, pipeline)
  return result
 } catch (error) {
  throw error
 }
}

exports.del = async (reqParams) => {
 try {
  const whr = { "_id": getObjectId(reqParams["service_id"]) }
  const result = await dbHelper.deleteOne(SERVICES_COLL, whr)
  return { "status": true, "msg": "Service deleted successfully", "data": result }
 } catch (error) {
  throw error
 }
}