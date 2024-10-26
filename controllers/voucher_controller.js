/**
 * @author Giuseppe Piscopo
**/

class VoucherController{
   constructor({voucherService}){
      this.voucherService = voucherService;
   }
   
   addVoucher = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   updateVoucher = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   getVoucher = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   getVouchers = async (req, res, next) => {
      try{
         const filters = req.query;
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }

   deleteVoucher = async (req, res, next) => {
      try{
         res.status(200).json({});
      }catch(err){
         next(err);
      }
   }
}

module.exports = VoucherController