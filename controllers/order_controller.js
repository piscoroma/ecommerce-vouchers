/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');

class OrderController{
   constructor({orderService}){
      this.orderService = orderService;
   }
   
   addOrder = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const idUser = req.idUser ;
         const {vouchersSelected} = req.body;

         // Validate input
         try{
            if(vouchersSelected.length==0)
               throw new Error(`no voucher selected`);
            for(const voucher of vouchersSelected){
               if(!voucher.hasOwnProperty('id'))
                  throw new Error(`found a voucher without id`);
               if(!voucher.hasOwnProperty('price'))
                  throw new Error(`found a voucher without price`);
               if(!voucher.hasOwnProperty('qty'))
                  throw new Error(`found a voucher without qty`);
            }
         }catch(err){
            return res.status(400).send(`Error to validate input data: ${err.message}`);
         }

         let idOrder = await this.orderService.addOrder(idUser, vouchersSelected);

         res.status(200).json({"id": idOrder});

      }catch(err){
         const errMsg = `Error to add order: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({error: errMsg});
      }
   }

   getOrder = async (req, res, next) => {
      try{
         const idOrder = Number(req.params.id);

         // only admin can retrieve order of other users
         let idUser = Number(req.idUser);
         if(req.role=="admin")
            idUser = null;

         const orderObj = await this.orderService.getOrder(
            idOrder, idUser
         );
         
         if(orderObj==null)
            res.status(200).send(`No order found with id: ${idOrder}`);
         else
            res.status(200).json(orderObj.toJson());

      }catch(err){
         next(err);
      }
   }

   getOrders = async (req, res, next) => {
      try{
         const filters = req.query;

         // only admin can retrieve orders of other users
         if(req.role!="admin"){
            if("idUser" in filters){
               if(filters["idUser"] != req.idUser)
                  return res.status(401).send("Unauthorized");
            }else{
               filters["idUser"] = req.idUser;
            }
         }

         const orderObjList = await this.orderService.getOrders(
            filters
         );
         let orderObjListJson = [];
         for(const orderObj of orderObjList)
            orderObjListJson.push(orderObj.toJson());
         res.status(200).json({"result": orderObjListJson});

      }catch(err){
         next(err);
      }
   }
   
}

module.exports = OrderController