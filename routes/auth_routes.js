/**
 * @author Giuseppe Piscopo
**/

const router = require('express').Router()
const {container} = require('../di_container');
const authController = container.resolve(`authController`);
const authMw = require('../middlewares/auth_middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMw.authenticate, authController.logout);

module.exports = router