/**
 * @author Giuseppe Piscopo
**/

const Voucher = require("../models/voucher");


class VoucherService{
   constructor({voucherRepo, assetRepo, brandRepo}){
      this.logLabel = "[voucher-service]";
      this.voucherRepo = voucherRepo;
      this.assetRepo = assetRepo;
      this.brandRepo = brandRepo;
   }
   
   async addVoucher(idReq, name, description, brandName, prices=null, assets=null){
      const{logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idVoucher = null;
         
         let idBrand = await this.brandRepo.getIdBrandByName(brandName);
         if(idBrand==null)
            idBrand = await this.brandRepo.addBrand(brandName);
         
         // Session start

         // Create Voucher
         idVoucher = await this.voucherRepo.addVoucher(name, description, idBrand);

         // Assign prices to voucher
         for(const price of prices)
            await this.voucherRepo.assignPrice(idVoucher, price);

         // Assign assets to voucher
         for(const asset of assets){
            let blob = asset.blob;
            await this.assetRepo.addAsset(blob, idVoucher);
         }

         // Commit
         
         return idVoucher;

      }catch(err){
         console.log(`${logPrefix} - Error to create voucher with name '${name}': ${err.message}`);
         throw err;
      }
   }

   async updateVoucher(idReq, idVoucher, newName=null, newDescription=null, 
      prices=null, assets=null){
      const{logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let voucherObj = await this.voucherRepo.getVoucher(idVoucher);
         if(idVoucher==null)
            throw new Error(`No voucher found with id: ${idVoucher}`);
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
            await this.voucherRepo.updateVoucher(idVoucher, voucherObj);

      }catch(err){
         console.log(`${logPrefix} - Error to update voucher with id ${idVoucher}: ${err.message}`);
         throw err;
      }
   }

   async getVouchers(idReq, brandName=null){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let voucherDictList = await this.voucherRepo.getVouchers(idReq, brandName);
         for(const voucherObj of voucherDictList){
            let assetsObjList = await this.assetRepo.getAssets(voucherObj.id)
            voucherObj.assets = assetsObjList;
         }
         return voucherObjList;

      }catch(err){
         console.log(`${logPrefix} - Error to get vouchers list: ${err.message}`);
         throw err;
      }
   }

   async getVoucher(idReq, idVoucher){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let voucherObj = null;
         let voucherDict = await this.voucherRepo.getVoucher(idReq, idVoucher);
         if(voucherDict==null)
            throw new Error(`No voucher found with id ${idVoucher}`);
         let idBrand = voucherDict["id_brand"];
         let brandObj = await this.brandRepo.getBrandById(idReq, idBrand);
         let prices = await this.voucherRepo.getPrices(idReq, idVoucher);
         let assetsObjList = await this.assetRepo.getAssets(idReq, idVoucher);
         voucherObj = new Voucher(
            voucherDict["id"],
            voucherDict["name"],
            voucherDict["description"],
            brandObj,
            prices,
            assetsObjList,
            voucherDict["creation_date"],
            voucherDict["update_date"]
         )
         return voucherObj;

      }catch(err){
         console.log(`${logPrefix} - Error to get voucher with id ${idVoucher}: ${err.message}`);
         throw err;
      }
   }

   async deleteVoucher(idReq, idVoucher){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let voucherObj = await this.voucherRepo.getVoucher(idReq, idVoucher);
         if(voucherObj==null)
            throw new Error(`No voucher found with id ${idVoucher}`);
         await this.voucherRepo.deleteVoucher(idReq, idVoucher);
      }catch(err){
         console.log(`${logPrefix} - Error to delete voucher with id ${idVoucher}: ${err.message}`);
         throw err;
      }
   }
}

module.exports = VoucherService