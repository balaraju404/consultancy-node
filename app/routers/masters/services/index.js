const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const servicesCtrl = require("../../../controllers/masters/services")

router.route("/")
 .post([
  check('service_name').not().isEmpty().withMessage('Service Name is required'),
  check('service_icon').not().isEmpty().withMessage('Service Icon is required'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await servicesCtrl.add(req, res)
   } catch (error) {
    res.status(SERVER_ERROR_CODE).json({ message: error.message });
   }
  }
 ])

 .put([
  check("service_id").not().isEmpty().withMessage('Service ID is required'),
  check("service_id").isMongoId().withMessage('Invalid Service ID'),
  check('service_name').optional().not().isEmpty().withMessage('Service Name is required'),
  check('service_icon').optional().not().isEmpty().withMessage('Service Icon is required'),

  async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
    }
    await servicesCtrl.update(req, res)
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
  await servicesCtrl.details(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/delete", [
 check("service_id").not().isEmpty().withMessage('Service ID is required'),
 check("service_id").isMongoId().withMessage('Invalid Service ID'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await servicesCtrl.del(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

module.exports = router;
