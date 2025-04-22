const { details } = require("../users")
const dbHelper = require("../../utils/db-helper")
const { checkPassword, getObjectId } = require("../../utils/helper")

exports.password = async (reqParams) => {
 try {
  const userParams = { "email": reqParams["email"], "is_password": 1 }
  const userData = await details(userParams) || []
  if (userData.length == 0) {
   return { "status": false, "msg": "User not found", "status_code": NOT_FOUND_CODE }
  }
  const userPwd = userData[0]["hash_password"]
  const checkPwdStatus = await checkPassword(reqParams["password"], userPwd)
  if (checkPwdStatus == false) {
   return { "status": false, "msg": "Invalid password", "status_code": AUTH_ERROR_CODE }
  } else {
   delete userData[0]["hash_password"]
   return { "status": true, "msg": "Login successfull!", "status_code": SUCCESS_CODE, "data": userData[0] }
  }
 } catch (error) {
  throw error
 }
}
exports.otp = async (reqParams) => {
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
  updateData["modified_date"] = new Date()
  updateData["modified_by"] = reqParams["modified_by"] || "System"
  const whr = { "_id": getObjectId(reqParams["user_id"]) }
  const result = await dbHelper.updateOne(USERS_COLL, whr, updateData)
  return result
 } catch (error) {
  throw error
 }
}