const express = require('express');
const router = express.Router();
const {checkUserProvided, addNewUser, modifyRole, getOneUser, getAllUsers ,modifyOneUser, desactiveOneUser, activeOneUser} = require('../controllers/users.controllers');
const {verifyTokenMiddleware, isAdmin} = require('../middlewares/authentication');

//Endpoints
router.post('/signin', checkUserProvided);
router.post('/addUser', [verifyTokenMiddleware, isAdmin], addNewUser)
router.put('/roleManager', [verifyTokenMiddleware, isAdmin], modifyRole)
router.get('/getUser/:user_id', [verifyTokenMiddleware, isAdmin], getOneUser)
router.get('/getUsers', [verifyTokenMiddleware, isAdmin], getAllUsers)
router.put('/modifyUser/:user_id', [verifyTokenMiddleware, isAdmin], modifyOneUser)
router.delete('/desactiveUser/:user_id', [verifyTokenMiddleware, isAdmin], desactiveOneUser);
router.put('/activeUser/:user_id', [verifyTokenMiddleware, isAdmin], activeOneUser)
module.exports = router;