const express = require('express');
const router = express.Router();
const {verifyTokenMiddleware, isAdmin} = require('../middlewares/authentication');
const {addOneContact, modifyOneContact, desactiveContact, activeContact} = require('../controllers/contacts.controllers');

//Endpoints
router.post('/addContact', [verifyTokenMiddleware], addOneContact);
// router.post('/addCountry', [verifyTokenMiddleware], addOneCountry);
// router.post('/addCity', [verifyTokenMiddleware], addOneCity);
router.put('/modifyContact/:contact_id', [verifyTokenMiddleware], modifyOneContact)
// router.put('/modifyCity/:city_id', [verifyTokenMiddleware], modifyCity)
router.delete('/removeContact/:contact_id', [verifyTokenMiddleware], desactiveContact)
// router.delete('/removeCity/:city_id', [verifyTokenMiddleware], desactiveCity)
router.put('/activeContact/:contact_id', [verifyTokenMiddleware], activeContact)
// router.put('/activeCity/:city_id', [verifyTokenMiddleware], activeCity)

module.exports = router;