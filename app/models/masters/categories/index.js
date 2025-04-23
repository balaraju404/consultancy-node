const dbHelper = require("../../../utils/db-helper")
const { getObjectId, dateToString } = require("../../../utils/helper")

exports.add = async (reqParams) => {
 try {
  const insertData = {
   "cat_name": reqParams["cat_name"] || "",
   "cat_icon": reqParams["cat_icon"] || "",
   "cat_link": reqParams["cat_link"] || "",
   "status": reqParams["status"] || 1,
   "created_date": new Date(),
   "created_by": reqParams["created_by"] || "System",
  }
  const result = await dbHelper.insertOne(CATEGORIES_COLL, insertData)
  return { "status": true, "msg": "Category created successfully", "data": result }
 } catch (error) {
  throw error
 }
}
exports.update = async (reqParams) => {
 try {
  const updateData = {}
  if (reqParams["cat_name"]) updateData["cat_name"] = reqParams["cat_name"]
  if (reqParams["cat_icon"]) updateData["cat_icon"] = reqParams["cat_icon"]
  if (reqParams["cat_link"]) updateData["cat_link"] = reqParams["cat_link"]
  if (reqParams["status"]) updateData["status"] = reqParams["status"]
  updateData["modified_date"] = new Date()
  updateData["modified_by"] = reqParams["modified_by"] || "System"
  const whr = { "_id": getObjectId(reqParams["cat_id"]) }
  const result = await dbHelper.updateOne(CATEGORIES_COLL, whr, updateData)
  return { "status": true, "msg": "Category details updated", "data": result }
 } catch (error) {
  throw error
 }
}
exports.details = async (reqParams) => {
 try {
  const status = reqParams["status"] || 1
  const whr = { "status": status }
  if (reqParams["cat_id"]) whr["_id"] = getObjectId(reqParams["cat_id"])

  const pipeline = [
   { $match: whr },
   { $addFields: { cat_id: "$_id", "created_date": dateToString("created_date", "%d/%b/%Y %H:%M"), "modified_date": dateToString("modified_date", "%d/%b/%Y %H:%M") } },
   { $project: { _id: 0 } }
  ]
  const result = await dbHelper.getDetails(CATEGORIES_COLL, pipeline)
  return result
 } catch (error) {
  throw error
 }
}

exports.del = async (reqParams) => {
 try {
  const whr = { "_id": getObjectId(reqParams["cat_id"]) }
  const result = await dbHelper.deleteOne(CATEGORIES_COLL, whr)
  return { "status": true, "msg": "Category deleted successfully", "data": result }
 } catch (error) {
  throw error
 }
}