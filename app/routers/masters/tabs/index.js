const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const tabsCtrl = require("../../../controllers/masters/tabs")

router.route("/")
 .post([
  check('tab_name').not().isEmpty().withMessage('Tab Name is required'),
  check('tab_icon').not().isEmpty().withMessage('Tab Icon is required'),
  check('tab_link').not().isEmpty().withMessage('Tab Link is required'),
  check("cat_info").isObject().withMessage("Category information must be an object"),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await tabsCtrl.add(req, res)
   } catch (error) {
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
   }
  }
 ])

 .put([
  check("tab_id").not().isEmpty().withMessage('User ID is required'),
  check("tab_id").isMongoId().withMessage('Invalid User ID'),
  check('tab_name').optional().not().isEmpty().withMessage('Tab Name is required'),
  check('tab_icon').optional().not().isEmpty().withMessage('Tab Icon is required'),
  check('tab_link').optional().not().isEmpty().withMessage('Tab Link is required'),
  check("cat_info").optional().isObject().withMessage("Category information must be an object"),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await tabsCtrl.update(req, res)
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
  await tabsCtrl.details(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})
router.post("/delete", [
 check("tab_id").not().isEmpty().withMessage('Tab ID is required'),
 check("tab_id").isMongoId().withMessage('Invalid Tab ID'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await tabsCtrl.del(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

module.exports = router;
