/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const User = require('../models/user');
const { prisma } = require('../prisma')

class UserRepo {
   constructor() {
      this.logLabel = "[user-repo]";
   }

   async create(userObj){
      const{logLabel} = this;
      try{
         const user = await prisma.user.create({
            data: userObj
         });
         return user.id;
      }catch (err) {
         logger.error(`${logLabel} - Error on create query: ${err.message}`);
         throw err;
      }
   }

   /*async create(idReq, username, hashedPass, salt, email){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let idUser = null;
         return idUser;
      }catch (err) {
         logger.error(`${logPrefix} - Error on createUser query: ${err.message}`);
         throw err;
      }
   }*/

   async findAll(role=null){
      const{logLabel} = this;
      try{
         //let userObjList = [];
         //return userObjList;
         const users = await prisma.user.findMany();
         return users;
      }catch (err) {
         logger.error(`${logLabel} - Error on findAll query: ${err.message}`);
         throw err;
      }
   }

   async findByUsername(username){
      const{logLabel} = this;
      try{
         const user = await prisma.user.findUnique({
            where: {
               username: username
            }
         });
         return user;
      }catch (err) {
         logger.error(`${logLabel} - Error on findByUsername query: ${err.message}`);
         throw err;
      }
   }

   async update(idReq, idUser, userObj){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on update query: ${err.message}`);
         throw err;
      }
   }

   async delete(idReq, idUser){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on delete query: ${err.message}`);
         throw err;
      }
   }

   _parseUser(user){
      let userObj = new User(
         user['id_user'],
         user['username'],
         user['password'],
         user['salt'],
         user['email'],
         user['role'],
         user['creation_date'],
         user['update_date'],
         user['name'],
         user['surname'],
         user['phone'],
         user['address']
      )
      return userObj;
   }

}

module.exports = UserRepo