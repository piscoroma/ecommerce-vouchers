/**
 * @author Giuseppe Piscopo
**/

const router = require('express').Router()
const {container} = require('../di_container');
const voucherController = container.resolve(`voucherController`);

router.post('/vouchers', voucherController.addVoucher);
router.put('/vouchers/:id', voucherController.updateVoucher);
router.get('/vouchers/:id', voucherController.getVoucher);
router.get('/vouchers', voucherController.getVouchers);
router.delete('/vouchers/:id', voucherController.deleteVoucher);

module.exports = router 