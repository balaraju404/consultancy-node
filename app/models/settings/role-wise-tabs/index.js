const dbHelper = require("../../../utils/db-helper")
const { getObjectId, dateToString } = require("../../../utils/helper")

exports.add = async (reqParams) => {
 try {
  const insertData = {
   "role_id": reqParams["role_id"] || "",
   "cat_id": reqParams["cat_id"] || "",
   "tab_ids": reqParams["tab_ids"] || "",
   "status": reqParams["status"] || 1,
   "created_date": new Date(),
   "created_by": reqParams["created_by"] || "System",
  }
  const result = await dbHelper.insertOne(ROLE_WISE_TABS_COLL, insertData)
  return { "status": true, "msg": INSERT_SUCCESS, "data": result }
 } catch (error) {
  throw error
 }
}
exports.update = async (reqParams) => {
 try {
  const updateData = {}
  if (reqParams["role_id"]) updateData["role_id"] = reqParams["role_id"]
  if (reqParams["cat_id"]) updateData["cat_id"] = reqParams["cat_id"]
  if (reqParams["tab_ids"]) updateData["tab_ids"] = reqParams["tab_ids"]
  if (reqParams["status"]) updateData["status"] = reqParams["status"]
  updateData["modified_date"] = new Date()
  updateData["modified_by"] = reqParams["modified_by"] || "System"
  const whr = { "_id": getObjectId(reqParams["_id"]) }
  const result = await dbHelper.updateOne(ROLE_WISE_TABS_COLL, whr, updateData)
  return { "status": true, "msg": UPDATE_SUCCESS, "data": result }
 } catch (error) {
  throw error
 }
}
exports.details = async (reqParams) => {
 try {
  const status = reqParams["status"] || 1
  const whr = { "status": status }
  if (reqParams["_id"]) whr["_id"] = getObjectId(reqParams["_id"])
  if (reqParams["role_id"]) whr["role_id"] = reqParams["role_id"]
  if (reqParams["cat_id"]) whr["cat_id"] = reqParams["cat_id"]

  const pipeline = [
   { $match: whr },
   { $addFields: { "created_date": dateToString("created_date", "%d/%b/%Y %H:%M"), "modified_date": dateToString("modified_date", "%d/%b/%Y %H:%M") } },
   // { $project: {  } }
  ]
  const result = await dbHelper.getDetails(ROLE_WISE_TABS_COLL, pipeline)
  return result
 } catch (error) {
  throw error
 }
}

exports.del = async (reqParams) => {
 try {
  const whr = { "_id": getObjectId(reqParams["_id"]) }
  const result = await dbHelper.deleteOne(ROLE_WISE_TABS_COLL, whr)
  return { "status": true, "msg": DELETE_SUCCESS, "data": result }
 } catch (error) {
  throw error
 }
}