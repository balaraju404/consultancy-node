const dbHelper = require("../../../utils/db-helper")
const { getObjectId } = require("../../../utils/helper")

exports.add = async (reqParams) => {
 try {
  const insertData = {
   "tab_name": reqParams["tab_name"] || "",
   "tab_icon": reqParams["tab_icon"] || "",
   "tab_link": reqParams["tab_link"] || "",
   "cat_info": reqParams["cat_info"] || "",
   "status": reqParams["status"] || 1,
   "created_at": new Date(),
   "created_by": reqParams["created_by"] || "System",
  }
  const result = await dbHelper.insertOne(TABS_COLL, insertData)
  return { "status": true, "msg": "Tab created successfully", "data": result }
 } catch (error) {
  throw error
 }
}
exports.update = async (reqParams) => {
 try {
  const updateData = {}
  if (reqParams["tab_name"]) updateData["tab_name"] = reqParams["tab_name"]
  if (reqParams["tab_icon"]) updateData["tab_icon"] = reqParams["tab_icon"]
  if (reqParams["tab_link"]) updateData["tab_link"] = reqParams["tab_link"]
  if (reqParams["cat_info"]) updateData["cat_info"] = reqParams["cat_info"]
  if (reqParams["status"]) updateData["status"] = reqParams["status"]
  updateData["updated_date"] = new Date()
  updateData["updated_by"] = reqParams["updated_by"] || "System"
  const whr = { "_id": getObjectId(reqParams["tab_id"]) }
  const result = await dbHelper.updateOne(TABS_COLL, whr, updateData)
  return { "status": true, "msg": "Tab details updated", "data": result }
 } catch (error) {
  throw error
 }
}
exports.details = async (reqParams) => {
 try {
  const status = reqParams["status"] || 1
  const whr = { "status": status }
  if (reqParams["tab_id"]) whr["_id"] = getObjectId(reqParams["tab_id"])
  if (reqParams["cat_id"]) whr["cat_info.cat_id"] = reqParams["cat_id"]

  const pipeline = [
   { $match: whr },
   { $addFields: { tab_id: "$_id" } },
   { $project: { _id: 0 } }
  ]
  const result = await dbHelper.getDetails(TABS_COLL, pipeline)
  return result
 } catch (error) {
  throw error
 }
}