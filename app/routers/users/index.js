const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const userCtrl = require("../../controllers/users")

router.route("/")
 .post([
  check('fname').not().isEmpty().withMessage('First Name is required'),
  check('lname').not().isEmpty().withMessage('Last Name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('mobile').not().isEmpty().withMessage('Mobile Number is required'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
    }
    await userCtrl.add(req, res)
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
  }
 ])

 .put([
  check('fname').optional().not().isEmpty().withMessage('First Name cannot be empty if provided'),
  check('lname').optional().not().isEmpty().withMessage('Last Name cannot be empty if provided'),
  check('email').optional().isEmail().withMessage('Invalid email format if provided'),
  check('mobile').optional().not().isEmpty().withMessage('Mobile Number cannot be empty if provided'),
  check('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
    }
    await userCtrl.update(req, res)
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
  }
 ]);

module.exports = router;
