/**
 * @author Giuseppe Piscopo
**/

class AuthRepo{
   constructor({}){
   }
   
   async saveSession(idUser, token){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on saveSession query: ${err.message}`);
         throw err;
      }
   }

   async getSession(idUser){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let token = null;
         return token;
      }catch (err) {
         logger.error(`${logPrefix} - Error on getSession query: ${err.message}`);
         throw err;
      }
   }

   async deleteSession(idUser){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
      }catch (err) {
         logger.error(`${logPrefix} - Error on deleteSession query: ${err.message}`);
         throw err;
      }
   }

}

module.exports = AuthRepo