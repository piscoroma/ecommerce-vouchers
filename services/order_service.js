/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const OrderVoucher = require("../models/order_voucher");
const Order = require("../models/order");

const { v4: uuidv4 } = require('uuid');

class OrderService{
   constructor({userRepo, voucherRepo, orderRepo}){
      this.logLabel = "[order-service]";
      this.userRepo = userRepo;
      this.voucherRepo = voucherRepo;
      this.orderRepo = orderRepo;
   }

   async addOrder(idUser, vouchersSelected){
      const{logLabel} = this;
      try{
         let idOrder = null;

         // Validate user
         let userObj = await this.userRepo.findById(idUser);
         if(userObj==null)
            throw new Error(`no user found with id ${idUser}`);
         try{
            userObj.checkPersonalData();
         }catch(err){
            throw new Error(`not all personal user data are filled: ${err.message}`)
         }

         // Validate vouchers
         let orderVoucherObjList = [];
         let totalPrice = 0;
         for(const voucher of vouchersSelected){
            let idVoucher = voucher["id"];
            let voucherObj = await this.voucherRepo.findById(idVoucher);
            if(voucherObj==null)
               throw new Error(`no voucher found with id ${idVoucher}`);

            let price = voucher["price"];
            if(!(voucherObj.prices.includes(price)))
               throw new Error(`price ${price} is not available for the voucher with id ${idVoucher}`);

            let qty = Number(voucher["qty"]);

            for(let i=0; i<qty; i++){
               let codeGenerated = uuidv4();
               let orderVoucherObj = new OrderVoucher(
                  null, null, idVoucher, price, codeGenerated
               );
               orderVoucherObjList.push(orderVoucherObj);
               totalPrice += price;
            }
         }
         
         // Add order
         let orderObj = new Order(
            null, null, totalPrice,
            userObj, orderVoucherObjList
         );
         idOrder = await this.orderRepo.create(orderObj);

         return idOrder;

      }catch(err){
         console.log(`${logLabel} - Error to perform order: ${err.message}`);
         throw err;
      }
   }

   async getOrders(filters=null){
      const{logLabel} = this;
      try{
         let orderObjList = await this.orderRepo.findAll(filters);
         return orderObjList;

      }catch(err){
         logger.error(`${logLabel} - Error to get order list: ${err.message}`);
         throw err;
      }
   }

   async getOrder(idOrder, idUser=null){
      const{logLabel} = this;
      try{
         let orderObj = null;
         if(idUser==null)
            orderObj = await this.orderRepo.findById(idOrder);
         else
            orderObj = await this.orderRepo.find(idOrder, idUser);
         if(orderObj==null)
            logger.info(`No order found with id ${idOrder}`);
         return orderObj;
      }catch(err){
         logger.error(`${logLabel} - Error to get order with id ${idOrder}: ${err.message}`);
         throw err;
      }
   }

   
}

module.exports = OrderService