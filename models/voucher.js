/**
 * @author  Giuseppe Piscopo
**/

class Voucher{
   constructor(id, name, description, brandObj, prices, 
      assetsObjList=null, creationDate=null, updateDate=null){
      this.id = id;
      this.name = name;
      this.description = description;
      this.brandObj = brandObj;
      this.prices = prices;
      this.assetsObjList = assetsObjList;
      this.creationDate = creationDate;
      this.updateDate = updateDate;
   }

   toJson(){
      let obj = {
         "name": this.name,
         "description": this.description,
         "brand": this.brandObj.toJson(),
         "photos": [],
         "prices": this.prices,
         
      };
      for(const assetObj of this.assetsObjList)
         obj["photos"].push(assetObj.toJson());
      return obj;
   }
}

module.exports = Voucher