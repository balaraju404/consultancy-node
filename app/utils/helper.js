const { hashPassword, checkPassword } = require("@cs7player/scrap-node-lib").pbkdf
const { getObjectId, mongoHelper } = require("../mongoose")

exports.hashPassword = async (password) => {
 try {
  const hashedPassword = await hashPassword(password)
  return hashedPassword
 } catch (error) {
  throw error
 }
}

exports.checkPassword = async (password, hashedPassword) => {
 try {
  const isValid = await checkPassword(password, hashedPassword)
  return isValid
 } catch (error) {
  throw error
 }
}

exports.getObjectId = (id) => {
 try {
  const objectId = getObjectId(id)
  return objectId
 } catch (error) {
  throw error
 }
}

exports.dateToString = (key, format, timezone = TIMEZONE) => {
 return mongoHelper.dateToString(key, format, timezone)
}