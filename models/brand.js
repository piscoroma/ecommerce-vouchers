/**
 * @author  Giuseppe Piscopo
**/

class Brand{
   constructor(id, name, createdAt=null, updatedAt=null){
      this.id = id;
      this.name = name;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt
   }

   toJson(){
      let obj = {
         "name": this.name
      };
      return obj;
   }
}

module.exports = Brand