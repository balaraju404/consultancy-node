const dbHelper = require("../../../utils/db-helper")
const { getObjectId, dateToString } = require("../../../utils/helper")

exports.add = async (reqParams) => {
 try {
  const insertData = {
   "tab_name": reqParams["tab_name"] || "",
   "tab_icon": reqParams["tab_icon"] || "",
   "tab_link": reqParams["tab_link"] || "",
   "cat_id": getObjectId(reqParams["cat_id"]) || "",
   "status": reqParams["status"] || 1,
   "created_date": new Date(),
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
  if (reqParams["cat_id"]) updateData["cat_id"] = getObjectId(reqParams["cat_id"])
  if (reqParams["status"]) updateData["status"] = reqParams["status"]
  updateData["modified_date"] = new Date()
  updateData["modified_by"] = reqParams["modified_by"] || "System"
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
  if (reqParams["cat_id"]) whr["cat_id"] = getObjectId(reqParams["cat_id"])

  const pipeline = [
   { $match: whr },
   { $lookup: { from: CATEGORIES_COLL, localField: "cat_id", foreignField: "_id", as: "cat_info" } },
   {
    $addFields: {
     "tab_id": "$_id",
     "cat_info": { $arrayElemAt: ["$cat_info", 0] },
     "cat_info.cat_id": "$cat_info.cat_id",
     "created_date": dateToString("created_date", "%d/%b/%Y %H:%M"),
     "modified_date": dateToString("modified_date", "%d/%b/%Y %H:%M")
    }
   },
   {
    $project: {
     "_id": 0,
     "cat_info._id": 0,
     "cat_info.created_date": 0,
     "cat_info.created_by": 0,
     "cat_info.modified_date": 0,
     "cat_info.modified_by": 0,
    }
   }
  ]
  const result = await dbHelper.getDetails(TABS_COLL, pipeline)
  return result
 } catch (error) {
  throw error
 }
}

exports.del = async (reqParams) => {
 try {
  const whr = { "_id": getObjectId(reqParams["tab_id"]) }
  const result = await dbHelper.deleteOne(TABS_COLL, whr)
  return { "status": true, "msg": "Tab deleted successfully", "data": result }
 } catch (error) {
  throw error
 }
}