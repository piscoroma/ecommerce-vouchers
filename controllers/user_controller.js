/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');

class UserController{
   constructor({userService}){
      this.logLabel = "[user-controller]";
      this.userService = userService;
   }
   
   updateUser = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const idUser = Number(req.params.id);
         const {password, name, surname, phone, address} = req.body;
         
         if(req.idUser==idUser || req.role=="admin"){
            try{
               if(password!=null && password=="")
                  throw new Error(`password can not be empty`);
            }catch(err){
               return res.status(400).send(`Error to validate input data: ${err.message}`);
            }

            await this.userService.updateUser(
               idUser, password, name, surname, phone, address
            );
            res.status(200).send("User updated successfully");
         }else{
            res.status(401).send("Unauthorized");
         }
      }catch(err){
         const errMsg = `Error to update user: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({error: errMsg});
      }
   }

   getUser = async (req, res, next) => {
      try{
         const idUser = Number(req.params.id);

         if(req.idUser==idUser || req.role=="admin"){
            const userObj = await this.userService.getUser(idUser);
            if(userObj==null)
               res.status(200).send(`No user found with id: ${idUser}`);
            else
               res.status(200).json(userObj.toJson());
         }else{
            res.status(401).send("Unauthorized");
         }
      }catch(err){
         next(err);
      }
   }

   getUsers = async (req, res, next) => {
      try{
         const filters = req.query;
         
         if(req.idUser==idUser || req.role=="admin"){
            const userObjList = await this.userService.getUsers(filters);
            let userObjListJson = [];
            for(const userObj of userObjList)
               userObjListJson.push(userObj.toJson());
            res.status(200).json({"result": userObjListJson});
         }else{
            res.status(401).send("Unauthorized");
         }
      }catch(err){
         next(err);
      }
   }

   deleteUser = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const idUser = Number(req.params.id);

         if(req.idUser==idUser || req.role=="admin"){
            await this.userService.deleteUser(idUser);
            res.status(200).send("User removed successfully");
         }else{
            res.status(401).send("Unauthorized");
         }
      }catch(err){
         const errMsg = `Error to delete user: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({error: errMsg});
      }
   }
}

module.exports = UserController