/**
 * @author Giuseppe Piscopo
**/

class BrandRepo{
   constructor({}){
   }
   
   async addBrand(name){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idBrand = null;
         return idBrand;
      }catch (err) {
         logger.error(`${logPrefix} - Error on addBrand query: ${err.message}`);
         throw err;
      }
   }

   async getBrandById(idBrand){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let brandObj = null;
         return brandObj;
      }catch (err) {
         logger.error(`${logPrefix} - Error on getIdBrandByName query: ${err.message}`);
         throw err;
      }
   }

   async getIdBrandByName(name){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idBrand = null;
         return idBrand;
      }catch (err) {
         logger.error(`${logPrefix} - Error on getIdBrandByName query: ${err.message}`);
         throw err;
      }
   }

   async updateBrand(idBrand, newName){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on updateBrand query: ${err.message}`);
         throw err;
      }
   }

   async deleteBrand(idBrand){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on deleteBrand query: ${err.message}`);
         throw err;
      }
   }

}

module.exports = BrandRepo