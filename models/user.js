/**
 * @author  Giuseppe Piscopo
**/

class User{
   constructor(id, username, password, salt, email,
      role=null, createdAt=null, updatedAt=null, 
      name=null, surname=null, phone=null, address=null){

      this.id = id;
      this.username = username;
      this.password = password;
      this.salt = salt;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.name = name;
      this.surname = surname;
      this.phone = phone;
      this.address = address;
   }

   checkPersonalData(){
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
         "username": this.username,
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