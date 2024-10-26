/**
 * @author Giuseppe Piscopo
**/

const { createContainer, asClass, asFunction, aliasTo } = require('awilix');
const awilix = require('awilix');

const AuthController = require('./controllers/auth_controller');
const OrderController = require('./controllers/order_controller');
const UserController = require('./controllers/user_controller');
const VoucherController = require('./controllers/voucher_controller');

const AuthService = require('./services/auth_service');
const OrderService = require('./services/order_service');
const UserService = require('./services/user_service');
const VoucherService = require('./services/voucher_service');

const AssetRepo = require('./repositories/asset_repo');
const BrandRepo = require('./repositories/brand_repo');
const OrderRepo = require('./repositories/order_repo');
const UserRepo = require('./repositories/user_repo');
const VoucherRepo = require('./repositories/voucher_repo');


const container = createContainer({
   injectionMode: awilix.InjectionMode.PROXY
});


container.register({

   assetRepo: asClass(AssetRepo).singleton(),
   brandRepo: asClass(BrandRepo).singleton(),
   orderRepo: asClass(OrderRepo).singleton(),
   userRepo: asClass(UserRepo).singleton(),
   voucherRepo: asClass(VoucherRepo).singleton(),

   authService: asClass(AuthService).singleton(),
   orderService: asClass(OrderService).singleton(),
   userService: asClass(UserService).singleton(),
   voucherService: asClass(VoucherService).singleton(),

   authController: asClass(AuthController).singleton(),
   orderController: asClass(OrderController).singleton(),
   userController: asClass(UserController).singleton(),
   voucherController: asClass(VoucherController).singleton()

});

module.exports.container = container