/**
 * @author Giuseppe Piscopo
**/

const { v4: uuidv4 } = require('uuid');

class OrderService{
   constructor({userRepo, voucherRepo, orderRepo}){
      this.logLabel = "[order-service]";
      this.userRepo = userRepo;
      this.voucherRepo = voucherRepo;
      this.orderRepo = orderRepo;
   }

   async addOrder(idReq, idUser, vouchersSelected){
      const{logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idOrder = null;

         // Validate user
         let userObj = await this.userRepo.getUser(idReq, idUser);
         if(userObj==null)
            throw new Error(`no user found with id ${idUser}`);
         try{
            userObj.validateData();
         }catch(err){
            throw new Error(`no all needed data are filled: ${err.message}`)
         }

         // Validate vouchers
         let vouchersOrdered = [];
         if(vouchersSelected.length==0)
            throw new Error(`no voucher selected`);
         for(const voucher of vouchersSelected){
            let idVoucher = voucher["idVoucher"];
            let price = voucher["price"];
            let voucherObj = await this.voucherRepo.getVoucher(idReq, idVoucher);
            if(voucherObj==null)
               throw new Error(`no voucher found with id ${idVoucher}`);
            if(!(voucherObj.prices.includes(price)))
               throw new Error(`can not order voucher with price ${price}`);
            let generatedCode = uuidv4();
            vouchersOrdered.push({
               "id": idVoucher,
               "price": price,
               "generatedCode": generatedCode
            })
         }

         // Add order
         idOrder = await this.orderRepo.addOrder(
            idReq, idUser, totalPrice
         );
         for(const voucher of vouchersOrdered){
            await this.orderRepo.addVoucherToOrder(
               idReq, idOrder, voucher["id"], 
               voucher["generatedCode"], voucher["price"]
            );
         }
         
         //commit
            
         return idOrder;

      }catch(err){
         console.log(`${logPrefix} - Error to perform order: ${err.message}`);
         throw err;
      }
   }

   async getOrders(filters){
      const {idUser, idReq} = filters;
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let orderObjList = await this.orderRepo.getOrders(idReq, idUser);
         return orderObjList; 

      }catch(err){
         console.log(`${logPrefix} - Error to get order list: ${err.message}`);
         throw err;
      }
   }

   async getOrder(idReq, idOrder){
      const{logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let orderObj = null;
         orderObj = await this.orderRepo.getOrder(idOrder);
         if(orderObj==null)
            throw new Error(`No order found with id ${idOrder}`);

      }catch(err){
         console.log(`${logPrefix} - Error to get order with id ${idOrder}: ${err.message}`);
         throw err;
      }
   }

   
}

module.exports = OrderService