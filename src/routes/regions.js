const express = require('express');
const router = express.Router();
const {verifyTokenMiddleware, isAdmin} = require('../middlewares/authentication');
const {addOneRegion, addOneCountry, addOneCity, modifyCountry, desactiveCountry, modifyCity, desactiveCity, activeCountry, activeCity, getAllRegions, getCountriesByRegion, getCitiesByCountry, getAllInformation, getOneCountryById, getOneCityById, modifyRegion, getOneRegionById} = require('../controllers/regions.controllers');

//Endpoints
router.post('/addRegion', [verifyTokenMiddleware], addOneRegion);
router.post('/addCountry', [verifyTokenMiddleware], addOneCountry);
router.post('/addCity', [verifyTokenMiddleware], addOneCity);
router.put('/modifyCountry/:country_id', [verifyTokenMiddleware], modifyCountry)
router.put('/modifyCity/:city_id', [verifyTokenMiddleware], modifyCity)
router.put('/modifyRegion/:region_id', [verifyTokenMiddleware], modifyRegion)
router.delete('/removeCountry/:country_id', [verifyTokenMiddleware], desactiveCountry)
router.delete('/removeCity/:city_id', [verifyTokenMiddleware], desactiveCity)
router.put('/activeCountry/:country_id', [verifyTokenMiddleware], activeCountry)
router.put('/activeCity/:city_id', [verifyTokenMiddleware], activeCity)
router.get('/allRegions', [verifyTokenMiddleware], getAllRegions)
router.get('/countriesByRegion/:region_id', [verifyTokenMiddleware], getCountriesByRegion)
router.get('/citiesByCountry/:country_id', [verifyTokenMiddleware], getCitiesByCountry)
router.get('/allRegionInformation', [verifyTokenMiddleware], getAllInformation)
router.get('/oneCountryById/:country_id', [verifyTokenMiddleware], getOneCountryById )
router.get('/oneCityById/:city_id', [verifyTokenMiddleware], getOneCityById )
router.get('/oneRegionById/:region_id', [verifyTokenMiddleware], getOneRegionById )

module.exports = router;