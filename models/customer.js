/**
 * @author  Giuseppe Piscopo
**/

class Customer{
   constructor(id, name=null, surname=null, phone=null, address=null){
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.phone = phone;
      this.address = address;
   }

   validateData(){
      if(this.name==null)
         throw new Error(`Param 'name' can not be null`);
      if(this.surname==null)
         throw new Error(`Param 'surname' can not be null`);
      if(this.phone==null)
         throw new Error(`Param 'phone' can not be null`);
      if(this.address==null)
         throw new Error(`Param 'address' can not be null`);
   }

   toJson(){
      let obj = {
         "id": this.id,
         "name": this.user,
         "surname": this.surname,
         "phone": this.phone,
         "address": this.address,
      };
      return obj;
   }
}

module.exports = Customer