const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const rwtCtrl = require("../../../controllers/settings/role-wise-tabs")

router.route("/")
 .post([
  check('role_id').not().isEmpty().withMessage('Role ID is required'),
  check("role_id").isInt({ gt: 0 }).withMessage('Invalid Role ID'),
  check('cat_id').not().isEmpty().withMessage('Category ID is required'),
  check("cat_id").isInt({ gt: 0 }).withMessage('Invalid Category ID'),
  check("tab_ids").not().isEmpty().withMessage('Tab IDs is required'),
  check("tab_ids").isArray({ min: 1 }).withMessage('Tab IDs must be an array with at least one element'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await rwtCtrl.add(req, res)
   } catch (error) {
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
   }
  }
 ])

 .put([
  check("_id").not().isEmpty().withMessage('_id is required'),
  check("_id").isMongoId().withMessage('Invalid _id'),
  check('role_id').optional().not().isEmpty().withMessage('Role ID is required'),
  check("role_id").optional().isInt({ gt: 0 }).withMessage('Invalid Role ID'),
  check('cat_id').not().isEmpty().withMessage('Category ID is required'),
  check("cat_id").optional().isInt({ gt: 0 }).withMessage('Invalid Category ID'),
  check("tab_ids").optional().not().isEmpty().withMessage('Tab IDs is required'),
  check("tab_ids").optional().isArray({ min: 1 }).withMessage('Tab IDs must be an array with at least one element'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await rwtCtrl.update(req, res)
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
  await rwtCtrl.details(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})
router.post("/delete", [
 check("_id").not().isEmpty().withMessage('_id is required'),
 check("_id").isMongoId().withMessage('Invalid _id'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await rwtCtrl.del(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

module.exports = router;
