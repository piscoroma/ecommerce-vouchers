/**
 * @author Giuseppe Piscopo
**/

const router = require('express').Router()
const {container} = require('../di_container');
const voucherController = container.resolve(`voucherController`);
const authMw = require('../middlewares/auth_middleware');

router.post('/vouchers', authMw.authenticate, voucherController.addVoucher);
router.put('/vouchers/:id', authMw.authenticate, voucherController.updateVoucher);
router.get('/vouchers/:id', authMw.authenticate, voucherController.getVoucher);
router.get('/vouchers', authMw.authenticate, voucherController.getVouchers);
router.delete('/vouchers/:id', authMw.authenticate, voucherController.deleteVoucher);

module.exports = router 