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
      try{
         let idUser = null;
         let userObj = await this.userRepo.findByUsername(username);
         if(userObj!=null)
            throw new Error(`user '${username}' already exists`);
         const {hash, salt} = computeSaltedHash(password);
         userObj = new User(null, username, hash, salt, email);
         idUser = await this.userRepo.create(userObj);
         return idUser;
      }catch(err){
         throw err;
      }
   }

   async login(username, password){
      const{logLabel} = this;
      try{
         let token = null;
         let userObj = await this.userRepo.findByUsername(username);
         if(userObj==null)
            throw new Error(`user '${username}' not found`);
         let hashedPassStored = userObj.password;
         let saltStored = userObj.salt;
         let hashedPass = computeHash(password, saltStored);
         if(hashedPass==hashedPassStored){
            token = jwt.sign(
               {idUser: userObj.id, role: userObj.role}, 'your-secret-key', {expiresIn: '1h'}
            );
         }else
            throw new Error(`username or password invalid`);
         logger.info(`User ${userObj.id} successfully logged. Token: ${token}`);
         
         return token;

      }catch(err){
         logger.error(`${logLabel} - Error to login: ${err.message}`);
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