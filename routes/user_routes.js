/**
 * @author Giuseppe Piscopo
**/

const router = require('express').Router()
const {container} = require('../di_container');
const userController = container.resolve(`userController`);
const authMw = require('../middlewares/auth_middleware');

router.put('/users/:id', authMw.authenticate, userController.updateUser);
router.get('/users/:id', authMw.authenticate, userController.getUser);
router.get('/users', authMw.authenticate, userController.getUsers);
router.delete('/users/:id', authMw.authenticate, userController.deleteUser);

module.exports = router 