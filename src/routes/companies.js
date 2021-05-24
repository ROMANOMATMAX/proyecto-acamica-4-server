const express = require('express');
const router = express.Router();
const {verifyTokenMiddleware, isAdmin} = require('../middlewares/authentication');
const {addOneCompany, modifyOneCompany, desactiveCompany, activeCompany, getAllCompanies} = require('../controllers/companies.controllers');

//Endpoints
router.post('/addCompany', [verifyTokenMiddleware], addOneCompany);
// router.post('/addCountry', [verifyTokenMiddleware], addOneCountry);
// router.post('/addCity', [verifyTokenMiddleware], addOneCity);
router.put('/modifyCompany/:company_id', [verifyTokenMiddleware], modifyOneCompany)
// router.put('/modifyCity/:city_id', [verifyTokenMiddleware], modifyCity)
router.delete('/removeCompany/:company_id', [verifyTokenMiddleware], desactiveCompany)
// router.delete('/removeCity/:city_id', [verifyTokenMiddleware], desactiveCity)
router.put('/activeCompany/:company_id', [verifyTokenMiddleware], activeCompany)
// router.put('/activeCity/:city_id', [verifyTokenMiddleware], activeCity)
router.get('/allCompanies', [verifyTokenMiddleware], getAllCompanies)


module.exports = router;