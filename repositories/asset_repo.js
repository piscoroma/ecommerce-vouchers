/**
 * @author Giuseppe Piscopo
**/

class AssetRepo{
   constructor({}){
   }
   
   async addAsset(blob, idVoucher){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idAsset = null;
         return idAsset;
      }catch (err) {
         logger.error(`${logPrefix} - Error on addAsset query: ${err.message}`);
         throw err;
      }
   }

   async getAssets(idVoucher){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let assetObjList = [];
         return assetObjList;
      }catch (err) {
         logger.error(`${logPrefix} - Error on getAssets query: ${err.message}`);
         throw err;
      }
   }

   async deleteAsset(idAsset){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on deleteAsset query: ${err.message}`);
         throw err;
      }
   }

}

module.exports = AssetRepo