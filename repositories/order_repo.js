/**
 * @author Giuseppe Piscopo
**/

class OrderRepo{
   constructor({}){
   }
   
   async addVoucher(idReq, name, description, idBrand){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idVoucher = null;
         return idVoucher;
      }catch (err) {
         logger.error(`${logPrefix} - Error on addVoucher query: ${err.message}`);
         throw err;
      }
   }

   async assignPrice(idReq, idVoucher, price){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on assignPrice query: ${err.message}`);
         throw err;
      }
   }

   async deletePrice(idReq, idVoucher, price){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on deletePrice query: ${err.message}`);
         throw err;
      }
   }

   async _getPrices(idReq, idVoucher){}

   async updateVoucher(idReq, idVoucher, voucherObj){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on updateVoucher query: ${err.message}`);
         throw err;
      }
   }

   async getVouchers(idReq, brandName=null){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let voucherObjList = [];
         return voucherObjList;
      }catch (err) {
         logger.error(`${logPrefix} - Error on getVouchers query: ${err.message}`);
         throw err;
      }
   }

   async getVoucher(idReq, idVoucher){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let voucherObj = null;
         return voucherObj;
      }catch (err) {
         logger.error(`${logPrefix} - Error on getVoucher query: ${err.message}`);
         throw err;
      }
   }

   async deleteVoucher(idReq, idVoucher){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on deleteVoucher query: ${err.message}`);
         throw err;
      }
   }
}

module.exports = OrderRepo