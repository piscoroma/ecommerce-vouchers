/**
 * @author Giuseppe Piscopo
**/

const Voucher = require('../models/voucher');

class VoucherRepo{
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

   async getPrices(idReq, idVoucher){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let prices = [];
         return prices;
      }catch (err) {
         logger.error(`${logPrefix} - Error on getPrices query: ${err.message}`);
         throw err;
      }
   }

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

   _parseVoucher(voucher){
      let voucherObj = new Voucher(
         document['id_voucher'],
         document['name'],
         document['description'],
         document['salt'],
         document['email'],
         document['role'],
         document['creation_date'],
         document['update_date'],
         document['name'],
         document['surname'],
         document['phone'],
         document['address']
      )
      return voucherObj;
   }
}

module.exports = VoucherRepo