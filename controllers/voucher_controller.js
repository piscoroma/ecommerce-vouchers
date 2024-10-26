/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');

class VoucherController{
   constructor({voucherService}){
      this.voucherService = voucherService;
   }
   
   addVoucher = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const {name, brandName, description, prices, assets} = req.body;

         if(req.role=="admin"){
            try{
               if(name==null)
                  throw new Error(`name can not be null`);
               if(brandName==null)
                  throw new Error(`brandName can not be null`);
            }catch(err){
               return res.status(400).send(`Error to validate input data: ${err.message}`);
            }

            let idVoucher = await this.voucherService.addVoucher(
               name, brandName, description, prices, assets
            );

            res.status(200).json({"id": idVoucher});
         }else{
            res.status(401).send("Unauthorized");
         }

      }catch(err){
         const errMsg = `Error to add voucher: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({error: errMsg});
      }
   }

   updateVoucher = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const idVoucher = Number(req.params.id);
         const {name, description, prices, assets} = req.body;

         if(req.role=="admin"){
            try{
               if(name!=null && name=="")
                  throw new Error(`name can not be empty`);
            }catch(err){
               return res.status(400).send(`Error to validate input data: ${err.message}`);
            }

            await this.voucherService.updateVoucher(
               idVoucher, name, description, prices, assets
            );

            res.status(200).send("Voucher updated successfully");
         }else{
            res.status(401).send("Unauthorized");
         }

      }catch(err){
         const errMsg = `Error to update user: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({error: errMsg});
      }
   }

   getVoucher = async (req, res, next) => {
      try{
         const idVoucher = Number(req.params.id);

         const voucherObj = await this.voucherService.getVoucher(idVoucher);
         if(voucherObj==null)
            res.status(200).send(`No voucher found with id: ${idVoucher}`);
         else
            res.status(200).json(voucherObj.toJson());

      }catch(err){
         next(err);
      }
   }

   getVouchers = async (req, res, next) => {
      try{
         const filters = req.query;

         const voucherObjList = await this.voucherService.getVouchers(filters);
         let voucherObjListJson = [];
         for(const voucherObj of voucherObjList)
            voucherObjListJson.push(voucherObj.toJson());
         res.status(200).json({"result": voucherObjListJson});

      }catch(err){
         next(err);
      }
   }

   deleteVoucher = async (req, res, next) => {
      const{logLabel} = this;
      try{
         const idVoucher = Number(req.params.id);

         if(req.role=="admin"){
            await this.voucherService.deleteVoucher(idVoucher);
            res.status(200).send("Voucher removed successfully");
         }else{
            res.status(401).send("Unauthorized");
         }

      }catch(err){
         const errMsg = `Error to delete voucher: ${err.message}`;
         logger.error(`${logLabel} - ${errMsg}`);
         res.status(500).json({error: errMsg});
      }
   }
}

module.exports = VoucherController