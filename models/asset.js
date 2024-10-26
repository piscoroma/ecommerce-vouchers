/**
 * @author  Giuseppe Piscopo
**/

class Asset{
   constructor(id, blob, creationDate){
      this.id = id;
      this.blob = blob;
      this.creationDate = creationDate;
   }

   toJson(){
      let obj = {
         "blob": this.blob
      };
      return obj;
   }
}

module.exports = Asset