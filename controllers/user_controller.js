/**
 * @author Giuseppe Piscopo
**/

class UserController{
   constructor({userService}){
      this.userService = userService;
   }
   
   updateUser = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   getUser = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   getUsers = async (req, res, next) => {
      try{
         const filters = req.query;
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   deleteUser = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }
}

module.exports = UserController