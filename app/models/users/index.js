const dbHelper = require("../../utils/db-helper")
const { hashPassword, getObjectId } = require("../../utils/helper")

exports.add = async (reqParams) => {
 try {
  const hashedPassword = await hashPassword(reqParams["password"] || "")
  const insertData = {
   "fname": reqParams["fname"] || "",
   "lname": reqParams["lname"] || "",
   "email": reqParams["email"] || "",
   "mobile": reqParams["mobile"] || "",
   "password": hashedPassword,
   "role": reqParams["role_id"] || 2,
   "status": reqParams["status"] || 1,
   "created_at": new Date(),
   "created_by": reqParams["created_by"] || "System",
  }
  const result = await dbHelper.insertOne(USERS_COLL, insertData)
  return result
 } catch (error) {
  throw error
 }
}
exports.update = async (reqParams) => {
 try {
  const hashedPassword = await hashPassword(reqParams["password"] || "")
  const updateData = {}
  if (reqParams["password"]) updateData["password"] = hashedPassword
  if (reqParams["fname"]) updateData["fname"] = reqParams["fname"]
  if (reqParams["lname"]) updateData["lname"] = reqParams["lname"]
  if (reqParams["email"]) updateData["email"] = reqParams["email"]
  if (reqParams["mobile"]) updateData["mobile"] = reqParams["mobile"]
  if (reqParams["role_id"]) updateData["role"] = reqParams["role_id"]
  if (reqParams["status"]) updateData["status"] = reqParams["status"]
  updateData["updated_date"] = new Date()
  updateData["updated_by"] = reqParams["updated_by"] || "System"
  const whr = { "_id": getObjectId(reqParams["user_id"]) }
  const result = await dbHelper.updateOne(USERS_COLL, whr, updateData)
  return result
 } catch (error) {
  throw error
 }
}