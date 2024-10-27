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
         
         if(!username || !password || !email)
            throw new Error(`Error to validate input data`);

         await this.authService.register(username, password, email);

         res.status(200).send("Registration completed");
         
      }catch(err){
         const errMsg = `Registration failed: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({ error: errMsg });
      }
   }
  
   login = async (req, res, next) => {
      try{
         const {username, password} = req.body;

         if(!username || !password)
            throw new Error(`Error to validate input data`);

         const token = await this.authService.login(username, password);

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