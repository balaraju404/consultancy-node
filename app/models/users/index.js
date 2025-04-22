const dbHelper = require("../../utils/db-helper")
const { hashPassword, getObjectId } = require("../../utils/helper")

exports.add = async (reqParams) => {
 try {
  let { email, mobile } = reqParams
  const existsRec = await checkUser(email, mobile)
  if (existsRec.length > 0) {
   const emailStatus = existsRec.filter(m => m.email == email)
   const mobileStatus = existsRec.filter(m => m.mobile == mobile)
   if (emailStatus.length > 0) return { status: false, msg: "Email already exists" }
   if (mobileStatus.length > 0) return { status: false, msg: "Mobile already exists" }
  }

  const hashedPassword = await hashPassword(reqParams["password"] || "")
  const insertData = {
   "fname": reqParams["fname"] || "",
   "lname": reqParams["lname"] || "",
   "email": reqParams["email"] || "",
   "mobile": reqParams["mobile"] || "",
   "password": hashedPassword,
   "role_id": reqParams["role_id"] || 2,
   "status": reqParams["status"] || 1,
   "created_date": new Date(),
   "created_by": reqParams["created_by"] || "System",
  }
  const result = await dbHelper.insertOne(USERS_COLL, insertData)
  return { "status": true, "msg": "User created successfully", "data": result }
 } catch (error) {
  throw error
 }
}
exports.update = async (reqParams) => {
 try {
  let { email, mobile, user_id } = reqParams
  const existsRec = await checkUser(email, mobile, user_id)
  if (existsRec.length > 0) {
   const emailStatus = existsRec.filter(m => m.email == email)
   const mobileStatus = existsRec.filter(m => m.mobile == mobile)
   if (emailStatus.length > 0) return { "status": false, "msg": "Email already exists" }
   if (mobileStatus.length > 0) return { "status": false, "msg": "Mobile already exists" }
  }

  const hashedPassword = await hashPassword(reqParams["password"] || "")
  const updateData = {}
  if (reqParams["password"]) updateData["password"] = hashedPassword
  if (reqParams["fname"]) updateData["fname"] = reqParams["fname"]
  if (reqParams["lname"]) updateData["lname"] = reqParams["lname"]
  if (reqParams["email"]) updateData["email"] = reqParams["email"]
  if (reqParams["mobile"]) updateData["mobile"] = reqParams["mobile"]
  if (reqParams["role_id"]) updateData["role_id"] = reqParams["role_id"]
  if (reqParams["status"]) updateData["status"] = reqParams["status"]
  updateData["modified_date"] = new Date()
  updateData["modified_by"] = reqParams["modified_by"] || "System"
  const whr = { "_id": getObjectId(reqParams["user_id"]) }
  const result = await dbHelper.updateOne(USERS_COLL, whr, updateData)
  return { "status": true, "msg": "User updated successfully", "data": result }
 } catch (error) {
  throw error
 }
}
exports.details = async (reqParams) => {
 try {
  const isNeedPwd = reqParams["is_password"] || 0
  const whr = {}
  if (reqParams["user_id"]) whr["_id"] = getObjectId(reqParams["user_id"])
  if (reqParams["fname"]) whr["fname"] = reqParams["fname"]
  if (reqParams["lname"]) whr["lname"] = reqParams["lname"]
  if (reqParams["email"]) whr["email"] = reqParams["email"]
  if (reqParams["mobile"]) whr["mobile"] = reqParams["mobile"]
  if (reqParams["role_id"]) whr["role_id"] = reqParams["role_id"]
  if (reqParams["status"]) whr["status"] = reqParams["status"]

  const pipeline = [
   { $match: whr },
   { $addFields: { user_id: "$_id", ...(isNeedPwd == 1 ? { hash_password: "$password" } : {}) } },
   { $project: { _id: 0, password: 0 } }
  ]
  const result = await dbHelper.getDetails(USERS_COLL, pipeline)
  return result
 } catch (error) {
  throw error
 }
}

const checkUser = async (email, mobile, user_id = null) => {
 try {
  const whr = { "$or": [{ "email": email }, { "mobile": mobile }] }
  if (user_id) whr["_id"] = { "$ne": getObjectId(user_id) }
  const result = await dbHelper.getDetails(USERS_COLL, [{ "$match": whr }])
  return result
 } catch (error) {
  throw error
 }
}