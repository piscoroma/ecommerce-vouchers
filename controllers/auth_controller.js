/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');

class AuthController{
   constructor({authService}){
      this.logLabel = "[auth-service]";
      this.authService = authService;
   }
   
   register = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const {username, password, email} = req.body;
         
         if(!username || !password || !email)
            throw new Error(`Error to validate input data`);

         await this.authService.register(username, password, email);
         
      }catch(err){
         logger.error(`${logLabel} - Registration failed: ${err.message}`);
         res.status(500).json({ error: 'Registration failed' });
      }
   }
  
   login = async (req, res, next) => {
      try{
         let body = req.body;
         const token = await this.authService.login(
            body["username"],
            body["password"]
         );
         res.status(200).json({token});
      }catch(err){
         res.status(500).json({ error: 'Login failed' });
      }
   }

   logout = async (req, res, next) => {
      try{
         const result = await this.authService.logout();
         res.status(200).json(result);
      }catch(err){
         next(err);
      }
   }
}

module.exports = AuthController