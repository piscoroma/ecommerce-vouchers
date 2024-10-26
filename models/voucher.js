/**
 * @author  Giuseppe Piscopo
**/

class Voucher{
   constructor(id, name, description, brandObj, prices, 
      assetObjList=null, createdAd=null, updatedAt=null){
      this.id = id;
      this.name = name;
      this.description = description;
      this.brandObj = brandObj;
      this.prices = prices;
      this.assetObjList = assetObjList;
      this.createdAd = createdAd;
      this.updatedAt = updatedAt;
   }

   toJson(){
      let obj = {
         "name": this.name,
         "description": this.description,
         "brand": this.brandObj.toJson(),
         "prices": this.prices,
         "photos": [],
      };
      if(this.assetObjList!=null){
         for(const assetObj of this.assetObjList)
            obj["photos"].push(assetObj.toJson());
      }
      return obj;
   }
}

module.exports = Voucher