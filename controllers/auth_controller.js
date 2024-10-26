/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');

class AuthController{
   constructor({authService}){
      this.logLabel = "[auth-controller]";
      this.authService = authService;
   }
   
   register = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const {username, password, email} = req.body;
         
         try{
            if(username==null)
               throw new Error(`username can not be null`);
            if(password==null)
               throw new Error(`password can not be null`);
            if(email==null)
               throw new Error(`email can not be null`);
         }catch(err){
            return res.status(400).send(`Error to validate input data: ${err.message}`);
         }

         await this.authService.register(username, password, email);

         res.status(200).send("Registration completed");
         
      }catch(err){
         const errMsg = `Registration failed: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({error: errMsg});
      }
   }
  
   login = async (req, res, next) => {
      try{
         const {username, password} = req.body;

         try{
            if(username==null)
               throw new Error(`username can not be null`);
            if(password==null)
               throw new Error(`password can not be null`);
         }catch(err){
            return res.status(400).send(`Error to validate input data: ${err.message}`);
         }

         const token = await this.authService.login(username, password);

         res.status(200).json({token});
      }catch(err){
         res.status(500).json({error: 'Login failed'});
      }
   }

   logout = async (req, res, next) => {
      try{
         await this.authService.logout();
         res.status(200).send(`Logout successfully`);
      }catch(err){
         next(err);
      }
   }
}

module.exports = AuthController