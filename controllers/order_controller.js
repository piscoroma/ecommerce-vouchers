/**
 * @author Giuseppe Piscopo
**/

class OrderController{
   constructor({orderService}){
      this.orderService = orderService;
   }
   
   addOrder = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   getOrder = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   getOrders = async (req, res, next) => {
      try{
         const filters = req.query;
         let orders = await this.orderService.getOrders(filters);
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }
   
}

module.exports = OrderController