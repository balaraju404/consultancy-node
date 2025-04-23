const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const catCtrl = require("../../../controllers/masters/categories")

router.route("/")
 .post([
  check('cat_name').not().isEmpty().withMessage('Category Name is required'),
  check('cat_icon').not().isEmpty().withMessage('Category Icon is required'),
  check('cat_link').not().isEmpty().withMessage('Category Link is required'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await catCtrl.add(req, res)
   } catch (error) {
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
   }
  }
 ])

 .put([
  check("cat_id").not().isEmpty().withMessage('Category ID is required'),
  check("cat_id").isMongoId().withMessage('Invalid Category ID'),
  check('cat_name').optional().not().isEmpty().withMessage('Category Name is required'),
  check('cat_icon').optional().not().isEmpty().withMessage('Category Icon is required'),
  check('cat_link').optional().not().isEmpty().withMessage('Category Link is required'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await catCtrl.update(req, res)
   } catch (error) {
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
   }
  }
 ]);

router.post("/details", [
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await catCtrl.details(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/delete", [
 check("cat_id").not().isEmpty().withMessage('Category ID is required'),
 check("cat_id").isMongoId().withMessage('Invalid Category ID'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await catCtrl.del(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

module.exports = router;
