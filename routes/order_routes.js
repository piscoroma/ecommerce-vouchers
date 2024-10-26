/**
 * @author Giuseppe Piscopo
**/

const router = require('express').Router()
const {container} = require('../di_container');
const orderController = container.resolve(`orderController`);
const authMw = require('../middlewares/auth_middleware');

router.post('/orders', authMw.authenticate, orderController.addOrder);
router.get('/orders/:id', authMw.authenticate, orderController.getOrder);
router.get('/orders', authMw.authenticate, orderController.getOrders);


module.exports = router