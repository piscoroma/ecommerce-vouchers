/**
 * @author  Giuseppe Piscopo
**/

class Brand{
   constructor(id, name, creationDate){
      this.id = id;
      this.name = name;
      this.creationDate = creationDate;
   }

   toJson(){
      let obj = {
         "name": this.name
      };
      return obj;
   }
}

module.exports = Brand