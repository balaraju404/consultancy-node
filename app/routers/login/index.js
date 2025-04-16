const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const loginCtrl = require("../../controllers/login")

router.post("/password", [
 check("email").isEmail().withMessage('Invalid email format'),
 check("password").isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await loginCtrl.password(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})
// router.post("/otp", [
//  check("email").isEmail().withMessage('Invalid email format'),
//  check("otp").isLength({ min: 6 }).withMessage('OTP must be at least 6 characters long'),
// ], async (req, res, next) => {
//  try {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//    return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
//   }
//   await loginCtrl.otp(req, res)
//  } catch (error) {
//   res.status(SERVER_ERROR_CODE).json({ message: error.message });
//  }
// })


module.exports = router;
