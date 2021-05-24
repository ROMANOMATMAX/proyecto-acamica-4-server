const express = require('express');
const router = express.Router();
const {verifyTokenMiddleware, isAdmin} = require('../middlewares/authentication');
const {addOneRegion, addOneCountry, addOneCity, modifyCountry, desactiveCountry, modifyCity, desactiveCity, activeCountry, activeCity, getAllRegions, getCountriesByRegion, getCitiesByCountry, getAllInformation} = require('../controllers/regions.controllers');

//Endpoints
router.post('/addRegion', [verifyTokenMiddleware], addOneRegion);
router.post('/addCountry', [verifyTokenMiddleware], addOneCountry);
router.post('/addCity', [verifyTokenMiddleware], addOneCity);
router.put('/modifyCountry/:country_id', [verifyTokenMiddleware], modifyCountry)
router.put('/modifyCity/:city_id', [verifyTokenMiddleware], modifyCity)
router.delete('/removeCountry/:country_id', [verifyTokenMiddleware], desactiveCountry)
router.delete('/removeCity/:city_id', [verifyTokenMiddleware], desactiveCity)
router.put('/activeCountry/:country_id', [verifyTokenMiddleware], activeCountry)
router.put('/activeCity/:city_id', [verifyTokenMiddleware], activeCity)
router.get('/allRegions', [verifyTokenMiddleware], getAllRegions)
router.get('/countriesByRegion/:region_id', [verifyTokenMiddleware], getCountriesByRegion)
router.get('/citiesByCountry/:country_id', [verifyTokenMiddleware], getCitiesByCountry)
router.get('/allRegionInformation', [verifyTokenMiddleware], getAllInformation)

module.exports = router;