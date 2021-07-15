const express = require('express');
const router = express.Router();
const {verifyTokenMiddleware, isAdmin} = require('../middlewares/authentication');
const {addOneContact, modifyOneContact, desactiveContact, activeContact, getAllContacts, getFilteredContact, addContactChannel, deleteAllContactChannels} = require('../controllers/contacts.controllers');
const { getAllContactChannels } = require('../controllers/contactChannel.controllers');

//Endpoints
router.post('/addContact', [verifyTokenMiddleware], addOneContact);
//Add new contact channel to user
router.post('/addChannelToContact', [verifyTokenMiddleware], addContactChannel);
// router.post('/addCountry', [verifyTokenMiddleware], addOneCountry);
router.delete('/removeAllContactChannels/:contact_id', [verifyTokenMiddleware], deleteAllContactChannels)
// router.post('/addCity', [verifyTokenMiddleware], addOneCity);
router.put('/modifyContact/:contact_id', [verifyTokenMiddleware], modifyOneContact)
// router.put('/modifyCity/:city_id', [verifyTokenMiddleware], modifyCity)
router.delete('/removeContact/:contact_id', [verifyTokenMiddleware], desactiveContact)
// router.delete('/removeCity/:city_id', [verifyTokenMiddleware], desactiveCity)
router.put('/activeContact/:contact_id', [verifyTokenMiddleware], activeContact)
// router.put('/activeCity/:city_id', [verifyTokenMiddleware], activeCity)
router.get('/allContacts', [verifyTokenMiddleware], getAllContacts)
//Traer los contactos buscados por el filtro aplicado
router.get('/filterContact', [verifyTokenMiddleware], getFilteredContact) 
//Traer todos los channels de un contacto
router.get('/allContactChannels/:contact_id', [verifyTokenMiddleware], getAllContactChannels)

module.exports = router;