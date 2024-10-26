/**
 * @author Giuseppe Piscopo
**/

const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
   let token = req.header('Authorization');
   if(!token) 
      return res.status(401).json({ error: 'Unauthorized' });
   try{
      token = token.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.idUser = Number(decoded.idUser);
      req.role = decoded.role;
      next();
   } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
   }
}
 
module.exports = {
   authenticate
};