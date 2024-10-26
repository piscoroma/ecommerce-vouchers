/**
 * @author Giuseppe Piscopo
**/

const { computeHash, computeSaltedHash } = require('../utils/hasher');
const logger = require('../logger');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

class AuthService{
   constructor({userRepo, authRepo}){
      this.logLabel = "[auth-service]";
      this.userRepo = userRepo;
      this.authRepo = authRepo;
   }
   
   async register(username, password, email){
      const{logLabel} = this;
      try{
         let idUser = null;
         let userDO = await this.userRepo.findByUsername(username);
         if(userDO!=null)
            throw new Error(`User "${username}" already exists`);
         let userObj = User
         const {hash, salt} = computeSaltedHash(password);
         userObj = new User(null, username, hash, salt, email);
         idUser = await this.userRepo.create(userObj);
         return idUser;
      }catch(err){
         logger.error(`${logLabel} - Error to create user '${username}': ${err.message}`);
         throw err;
      }
   }

   async login(username, password){
      const{logLabel} = this;
      //const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let token = null;
         //
         token = jwt.sign(
            {userId: "id_123", role: "admin"}, 'your-secret-key', {expiresIn: '1h'}
         );
         return token;
         //
         let userObj = await this.userRepo.getUser(idReq, username);
         if(userObj==null)
            throw new Error(`User '${username}' not found`);
         let hashedPassStored = userObj.password;
         let saltStored = userObj.salt;
         let hashedPass = computeHash(password, saltStored);
         if(hashedPass==hashedPassStored){
            token = jwt.sign(
               {userId: userObj.id}, 'your-secret-key', {expiresIn: '1h'}
            );
            //await this.authRepo.saveSession(userObj.id, token);
         }else
            throw new Error(`username or password invalid`);
         logger.error(`Login successfully for user with id ${id}. Token: ${token}`);
         
         return token;

      }catch(err){
         logger.error(`${logPrefix} - Error to login: ${err.message}`);
         throw err;
      }
   }

   async logout(idUser){
      const{logLabel} = this;
      //const logPrefix = `${logLabel} - ${idReq}`;
      try{
         return {"logout": "ok"};
         let userObj = await this.userRepo.getUser(idReq, username);
         if(userObj==null)
            throw new Error(`No user found with id ${username}`);
         let token = await this.authRepo.getSession(idUser);
         if(token==null)
            throw new Error(`No session found for the given user`);
         await this.authRepo.deleteSession(idUser);
         logger.error(`Logout successfully for user with id ${id}`);
      }catch(err){
         logger.error(`${logPrefix} - Error to logout: ${err.message}`);
         throw err;
      }
   }
}

module.exports = AuthService