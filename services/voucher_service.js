/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const Voucher = require("../models/voucher");
const Brand = require('../models/brand');

class VoucherService{
   constructor({voucherRepo, assetRepo, brandRepo}){
      this.logLabel = "[voucher-service]";
      this.voucherRepo = voucherRepo;
      this.assetRepo = assetRepo;
      this.brandRepo = brandRepo;
   }
   
   async addVoucher(name, brandName, description=null, prices=null, assets=null){
      const{logLabel} = this;
      try{
         let idVoucher = null;
         
         let brandObj = await this.brandRepo.findByName(brandName);
         if(brandObj==null){
            brandObj = new Brand(null, brandName);
            let idBrand = await this.brandRepo.create(brandObj);
            brandObj.id = idBrand;
         }
         
         let voucherObj = new Voucher(
            null, name, description, brandObj, prices, assets
         );
         idVoucher = await this.voucherRepo.create(voucherObj);
         
         return idVoucher;

      }catch(err){
         logger.error(`${logLabel} - Error to add voucher: ${err.message}`);
         throw err;
      }
   }

   async updateVoucher(idVoucher, newName=null, newDescription=null, 
      prices=null, assets=null){
      const{logLabel} = this;
      try{
         let voucherObj = await this.voucherRepo.findById(idVoucher);
         if(voucherObj==null)
            throw new Error(`no voucher found with id: ${idVoucher}`);
         let isChanged = false;
         if(newName!=null && newName!=voucherObj.name){
            voucherObj.name = newName;
            isChanged = true;
         }
         if(newDescription!=null && newDescription!=voucherObj.description){
            voucherObj.description = newDescription;
            isChanged = true;
         }
         if(prices!=null){
            voucherObj.prices = prices;
            isChanged = true;
         }
         if(assets!=null){
            voucherObj.assets = assets;
            isChanged = true;
         }
         if(isChanged)
            await this.voucherRepo.update(voucherObj);
         else
            logger.info(`No updated needed, all fields provided are the same`);

      }catch(err){
         logger.error(`${logLabel} - Error to update voucher with id ${idVoucher}: ${err.message}`);
         throw err;
      }
   }

   async getVouchers(filters){
      const{logLabel} = this;
      try{
         let userObjList = await this.voucherRepo.findAll(filters);
         return userObjList;

      }catch(err){
         logger.error(`${logLabel} - Error to get vouchers list: ${err.message}`);
         throw err;
      }
   }

   async getVoucher(idVoucher){
      const{logLabel} = this;
      try{
         let voucherObj = await this.voucherRepo.findById(idVoucher);
         if(voucherObj==null)
            logger.info(`No voucher found with id: ${idVoucher}`);
         return voucherObj;
      }catch(err){
         logger.error(`${logLabel} - Error to get voucher with id ${idVoucher}: ${err.message}`);
         throw err;
      }
   }

   async deleteVoucher(idVoucher){
      const{logLabel} = this;
      try{
         let voucherObj = await this.voucherRepo.findById(idVoucher);
         if(voucherObj==null)
            throw new Error(`no voucher found with id ${idVoucher}`);
         await this.voucherRepo.delete(idVoucher);
      }catch(err){
         logger.error(`${logLabel} - Error to delete voucher with id ${idVoucher}: ${err.message}`);
         throw err;
      }
   }
}

module.exports = VoucherService