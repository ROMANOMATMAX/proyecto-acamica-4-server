const express = require('express');
const router = express.Router();
const {verifyTokenMiddleware, isAdmin} = require('../middlewares/authentication');
const {getAllContactChannels} = require('../controllers/contactChannel.controllers');

router.get('/allContactChannels', [verifyTokenMiddleware], getAllContactChannels)


module.exports = router;