/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const { computeHash, computeSaltedHash } = require('../utils/hasher');


class UserService{
   constructor({userRepo}){
      this.logLabel = "[user-service]";
      this.userRepo = userRepo;
   }

   async updateUser(idUser, newPassword=null, newName=null, 
      newSurname=null, newPhone=null, newAddress=null){
         const{logLabel} = this;
         try{
            let userObj = await this.userRepo.findById(idUser);
            if(userObj==null)
               throw new Error(`no user found with id ${idUser}`);
            let isChanged = false;
            if(newPassword!=null){
               let saltStored = userObj.salt;
               let hashedPassStored = userObj.password;
               let newPasswordHashed = computeHash(newPassword, saltStored);
               if(newPasswordHashed!=hashedPassStored){
                  const {hash, salt} = computeSaltedHash(newPassword);
                  userObj.password = hash;
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
            if(isChanged)
               await this.userRepo.update(userObj);
            else
               logger.info(`No updated needed, all fields provided are the same`);
            
         }catch(err){
            logger.error(`${logLabel} - Error to update user with id: ${err.message}`);
            throw err;
         }
   }

   async getUsers(filters){
      const{logLabel} = this;
      try{
         let userObjList = await this.userRepo.findAll(filters);
         return userObjList;

      }catch(err){
         logger.error(`${logLabel} - Error to get users list: ${err.message}`);
         throw err;
      }
   }

   async getUser(idUser){
      const{logLabel} = this;
      try{
         let userObj = await this.userRepo.findById(idUser);
         if(userObj==null)
            logger.info(`No user found with id ${idUser}`);
         return userObj;
      }catch(err){
         logger.error(`${logLabel} - Error to get user with id ${idUser}: ${err.message}`);
         throw err;
      }
   }

   async deleteUser(idUser){
      const{logLabel} = this;
      try{
         let userObj = await this.userRepo.findById(idUser);
         if(userObj==null)
            throw new Error(`no user found with id ${idUser}`);
         await this.userRepo.delete(idUser);
      }catch(err){
         logger.error(`${logLabel} - Error to delete user with id ${idUser}: ${err.message}`);
         throw err;
      }
   }
}

module.exports = UserService