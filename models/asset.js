/**
 * @author  Giuseppe Piscopo
**/

class Asset{
   constructor(id, imageName, imagePath, createdAt=null){
      this.id = id;
      this.imageName = imageName;
      this.imagePath = imagePath;
      this.createdAt = createdAt;
   }

   toJson(){
      let obj = {
         "imageName": this.imageName,
         "imagePath": this.imagePath
      };
      return obj;
   }
}

module.exports = Asset