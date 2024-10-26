/**
 * @author Giuseppe Piscopo
**/

const express = require("express");
const router = express.Router();

const authRoutes = require('./auth_routes');
const mgmtRoutes = require('./mgmt_routes');
const orderRoutes = require('./order_routes');
const userRoutes = require('./user_routes');
const voucherRoutes = require('./voucher_routes');

const basePrefix = "/api";
router.use(basePrefix, authRoutes);
router.use(basePrefix, orderRoutes);
router.use(basePrefix, userRoutes);
router.use(basePrefix, voucherRoutes);
router.use("/", mgmtRoutes);

module.exports = router;
