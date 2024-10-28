/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const OrderVoucher = require("../models/order_voucher");
const Order = require("../models/order");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { v4: uuidv4 } = require('uuid');

class OrderService{
   constructor({userRepo, voucherRepo, orderRepo}){
      this.logLabel = "[order-service]";
      this.userRepo = userRepo;
      this.voucherRepo = voucherRepo;
      this.orderRepo = orderRepo;
      this.isStripeEnabled = ((process.env.STRIPE_ENABLED === 'true') ? true : false);
   }

   async addOrder(idUser, vouchersSelected){
      const{logLabel} = this;
      try{
         let respData = null;

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
         let lineItems = [];
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

            if(this.isStripeEnabled){
               // create line_items
               lineItems.push({
                  "price_data": {
                     "currency": "eur",
                     "product_data": {
                        "name": voucherObj.name,
                        "description": voucherObj.description,
                     },
                     "unit_amount": price * 100,
               },
               "quantity": qty,
               });
            }

            for(let i=0; i<qty; i++){
               let codeGenerated = uuidv4();
               let orderVoucherObj = new OrderVoucher(
                  null, null, idVoucher, price, codeGenerated
               );
               orderVoucherObjList.push(orderVoucherObj);
               totalPrice += price;
            }
         }
         
         let session = null;
         if(this.isStripeEnabled){
               session = await stripe.checkout.sessions.create({
               mode: 'payment',
               line_items: lineItems,
               customer_email: userObj.email,
               success_url: `https://example.com/success`,
               cancel_url: `https://example.com/error`,
            });
            //res.redirect(303, session.url);
         }

         // Save order to database
         let orderObj = new Order(
            null, null, totalPrice,
            userObj, orderVoucherObjList
         );
         let idOrder = await this.orderRepo.create(orderObj);
         
         logger.info(`Order created`);

         respData = {
            "idOrder": idOrder
         }
         if(this.isStripeEnabled)
            respData["urlSession"] = session.url;
         
         return respData;

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