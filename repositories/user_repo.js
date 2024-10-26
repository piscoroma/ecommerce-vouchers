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
            data: {
               username: userObj.username,
               password: userObj.password,
               salt: userObj.salt,
               email: userObj.email,
               name: userObj.name,
               surname: userObj.surname,
               phone: userObj.phone,
               address: userObj.address
               
            }
         });
         return user.id;
      }catch (err) {
         logger.error(`${logLabel} - Error on create query: ${err.message}`);
         throw err;
      }
   }

   async update(userObj){
      const{logLabel} = this;
      try{
         const user = await prisma.user.update({
            where: {
               id: userObj.id
            },
            data: {
               password: userObj.password,
               salt: userObj.salt,
               name: userObj.name,
               surname: userObj.surname,
               phone: userObj.phone,
               address: userObj.address
            }
         });
         return user;
      }catch (err) {
         logger.error(`${logLabel} - Error on update query: ${err.message}`);
         throw err;
      }
   }

   async findAll(filters){
      const{logLabel} = this;
      try{
         let userObjList = [];
         const users = await prisma.user.findMany({
            where: {
               AND: [
                  {role: filters.role},
                  {username: filters.username}
               ]
            }
         });
         for(const user of users){
            let userObj = this._parseUser(user);
            userObjList.push(userObj);
         }
         return userObjList;
      }catch (err) {
         logger.error(`${logLabel} - Error on findAll query: ${err.message}`);
         throw err;
      }
   }

   async findByUsername(username){
      const{logLabel} = this;
      try{
         let userObj = null;
         const user = await prisma.user.findUnique({
            where: {
               username: username
            }
         });
         if(user!=null)
            userObj = this._parseUser(user);
         return userObj;
      }catch (err) {
         logger.error(`${logLabel} - Error on findByUsername query: ${err.message}`);
         throw err;
      }
   }

   async findByEmail(email){
      const{logLabel} = this;
      try{
         let userObj = null;
         const user = await prisma.user.findUnique({
            where: {
               email: email
            }
         });
         if(user!=null)
            userObj = this._parseUser(user);
         return userObj;
      }catch (err) {
         logger.error(`${logLabel} - Error on findByEmail query: ${err.message}`);
         throw err;
      }
   }

   async findById(idUser){
      const{logLabel} = this;
      try{
         let userObj = null;
         const user = await prisma.user.findUnique({
            where: {
               id: idUser
            }
         });
         if(user!=null)
            userObj = this._parseUser(user);
         return userObj;
      }catch (err) {
         logger.error(`${logLabel} - Error on findById query: ${err.message}`);
         throw err;
      }
   }

   async delete(idUser){
      const{logLabel} = this;
      try{
         await prisma.user.delete({
            where: {
               id: idUser
            }
         });
      }catch (err) {
         logger.error(`${logLabel} - Error on delete query: ${err.message}`);
         throw err;
      }
   }

   _parseUser(user){
      let userObj = new User(
         user['id'],
         user['username'],
         user['password'],
         user['salt'],
         user['email'],
         user['role'],
         user['createdAt'],
         user['updatedAt'],
         user['name'],
         user['surname'],
         user['phone'],
         user['address']
      )
      return userObj;
   }

}

module.exports = UserRepo