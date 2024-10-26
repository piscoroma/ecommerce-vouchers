/**
 * @author  Giuseppe Piscopo
**/

class User{
   constructor(username, password, salt, email,
      role=null, createdAt=null, updatedAt=null, 
      name=null, surname=null, phone=null, address=null){

      this.username = username;
      this.password = password;
      this.salt = salt;
      this.email = email;
      if(role!=null)
         this.role = role;
      if(createdAt!=null)
         this.createdAt = createdAt;
      if(updatedAt!=null)
         this.updatedAt = updatedAt;
      if(name!=null)
         this.name = name;
      if(surname!=null)   
         this.surname = surname;
      if(phone!=null)
         this.phone = phone;
      if(address!=null)
         this.address = address;
   }

   fromObject(obj){
      this.id = obj.id;
      this.username = obj.username;
      this.password = obj.password;
      this.salt = obj.salt;
      this.email = obj.email;
      this.role = obj.role;
      this.createdAt = obj.createdAt;
      this.updatedAt = obj.updatedAt;
      this.name = obj.name;
      this.surname = obj.surname;
      this.phone = obj.phone;
      this.address = obj.address;
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
         "user": this.user,
         "email": this.email,
         "role": this.role,
         "name": this.user,
         "surname": this.surname,
         "phone": this.phone,
         "address": this.address,
         "createdAt": this.createdAt,
         "updatedAt": this.updatedAt
      };
      return obj;
   }
}

module.exports = User