const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const userCtrl = require("../../controllers/users")

router.route("/")
 .post([
  check('fname').not().isEmpty().withMessage('First Name is required'),
  check('lname').not().isEmpty().withMessage('Last Name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('mobile').not().isEmpty().withMessage('Mobile Number is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await userCtrl.add(req, res)
   } catch (error) {
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
   }
  }
 ])

 .put([
  check("user_id").not().isEmpty().withMessage('User ID is required'),
  check("user_id").isMongoId().withMessage('Invalid User ID'),
  check('fname').optional().not().isEmpty().withMessage('First Name cannot be empty if provided'),
  check('lname').optional().not().isEmpty().withMessage('Last Name cannot be empty if provided'),
  check('email').optional().isEmail().withMessage('Invalid email format if provided'),
  check('mobile').optional().not().isEmpty().withMessage('Mobile Number cannot be empty if provided'),
  check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await userCtrl.update(req, res)
   } catch (error) {
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
   }
  }
 ]);

router.post("/details", [
 check("user_id").optional().isMongoId().withMessage('Invalid User ID'),
 check("email").optional().isEmail().withMessage('Invalid email format'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await userCtrl.details(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

module.exports = router;
