/**
 * @author Giuseppe Piscopo
**/

const { computeHash, computeSaltedHash } = require('../utils/hasher');


class UserService{
   constructor({userRepo}){
      this.logLabel = "[user-service]";
      this.userRepo = userRepo;
   }
   
   /*async createUser(username, password, email){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idUser = null;
         let userObj = await this.userRepo.getUser(idReq, username);
         if(userObj!=null)
            throw new Error(`User "${username}" already exists`);
         const {hash, salt} = computeSaltedHash(password);
         idUser = await this.userRepo.createUser(
            idReq, username, hash, salt, email
         );
         return idUser;
      }catch(err){
         console.log(`${logPrefix} - Error to create user '${username}': ${err.message}`);
         throw err;
      }
   }*/

   async updateUser(idUser, newUsername=null, newPassword=null, 
      newName=null, newSurname=null, newPhone=null, newAddress=null){
         const{logger, logLabel} = this;
         const logPrefix = `${logLabel} - ${idReq}`;
         try{
            let userObj = await this.userRepo.getUserById(idReq, idUser);
            if(userObj==null)
               throw new Error(`No user found with id ${idUser}`);
            let isChanged = false;
            if(newUsername!=null && newUsername!=userObj.username){
               userObj.username = newUsername;
               isChanged = true;
            }
            if(newCredential!=null){
               let saltStored = userObj.salt;
               let hashedPassStored = userObj.credential;
               let newPasswordHashed = computeHash(newPassword, saltStored);
               if(newPasswordHashed!=hashedPassStored){
                  const {hash, salt} = computeSaltedHash(newCredential);
                  userObj.credential = hash;
                  userObj.salt = salt;
                  isChanged = true;
               }
            }
            if(newName!=null && (newName!=userObj.name || userObj.name==null)){
               userObj.name = newName;
               isChanged = true;
            }
            if(newSurname!=null && (newSurname!=userObj.surname || userObj.surname==null)){
               userObj.surname = newSurname;
               isChanged = true;
            }
            if(newPhone!=null && (newPhone!=userObj.phone || userObj.phone==null)){
               userObj.phone = newPhone;
               isChanged = true;
            }
            if(newAddress!=null && (newAddress!=userObj.address || userObj.address==null)){
               userObj.address = newAddress;
               isChanged = true;
            }
            if(isChanged){
               await this.userRepo.updateUser(idReq, idUser, userObj);
            }
         }catch(err){
            console.log(`${logPrefix} - Error to update user with id: ${err.message}`);
            throw err;
         }
   }

   async getUsers(role=null){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let userObjList = await this.userRepo.getUsers(idReq, role);
         return userObjList; 

      }catch(err){
         console.log(`${logPrefix} - Error to get users list: ${err.message}`);
         throw err;
      }
   }

   async getUser(idUser=null, user=null, email=null){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let userObj = await this.userRepo.getUser(
            idReq, idUser, user, email
         );
         if(userObj==null)
            throw new Error(`No user found`);
         return userObj;

      }catch(err){
         console.log(`${logPrefix} - Error to get user: ${err.message}`);
         throw err;
      }
   }

   async deleteUser(idUser){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let userObj = await this.userRepo.getUser(idReq, idUser);
         if(userObj==null)
            throw new Error(`No user found with id ${idUser}`);
         await this.userRepo.deleteUser(idReq, idUser);
      }catch(err){
         console.log(`${logPrefix} - Error to delete user with id ${idUser}: ${err.message}`);
         throw err;
      }
   }
}

module.exports = UserService