/**
 * @author Giuseppe Piscopo
**/

const router = require('express').Router()
const {container} = require('../di_container');
const orderController = container.resolve(`orderController`);
const authMw = require('../middlewares/auth_middleware');

router.post('/orders', orderController.addOrder);
router.get('/orders/:id', orderController.getOrder);
router.get('/orders', orderController.getOrders);


module.exports = router