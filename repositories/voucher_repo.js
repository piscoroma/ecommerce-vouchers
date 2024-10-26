/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const Voucher = require('../models/voucher');
const Brand = require('../models/brand');
const Asset = require('../models/asset');
const { prisma } = require('../prisma')

class VoucherRepo{
   constructor(){
      this.logLabel = "[voucher-repo]";
   }
   
   async create(voucherObj){
      const{logLabel} = this;
      try{
         let prices = [];
         for(const price of voucherObj.prices)
            prices.push({"price": price});
         const voucher = await prisma.voucher.create({
            data: {
               name: voucherObj.name,
               description: voucherObj.description,
               idBrand: voucherObj.brandObj.id,
               voucherPrice: {
                  createMany: {
                     data: prices
                  },
               },
            },
            include: {
               brand: false,
               voucherPrice: false,
            }
         });
         return voucher.id;
      }catch (err) {
         logger.error(`${logLabel} - Error on create query: ${err.message}`);
         throw err;
      }
   }

   async update(voucherObj){
      const{logLabel} = this;
      try{
         let prices = [];
         for(const price of voucherObj.prices)
            prices.push({"price": price});
         const voucher = await prisma.voucher.update({
            where: {
               id: voucherObj.id
            },
            data: {
               name: voucherObj.name,
               description: voucherObj.description,
               voucherPrice: {
                  deleteMany: {},
                  createMany: {
                     data: prices
                  },
               },
            }
         });
         return voucher;
      }catch (err) {
         logger.error(`${logLabel} - Error on update query: ${err.message}`);
         throw err;
      }
   }

   async findAll(filters){
      const{logLabel} = this;
      try{
         let voucherObjList = [];
         const vouchers = await prisma.voucher.findMany({
            where: {
               brand: {
                  name: filters.brandName
               }
            },
            include: {
               brand: true,
               voucherPrice: true,
            }
         });
         for(const voucher of vouchers){
            let voucherObj = this._parseVoucher(voucher);
            voucherObjList.push(voucherObj);
         }
         return voucherObjList;
      }catch (err) {
         logger.error(`${logLabel} - Error on findAll query: ${err.message}`);
         throw err;
      }
   }

   async findById(idVoucher){
      const{logLabel} = this;
      try{
         let voucherObj = null;
         const voucher = await prisma.voucher.findUnique({
            where: {
               id: idVoucher
            },
            include: {
               brand: true,
               voucherPrice: true,
               asset: true
            }
         });
         if(voucher!=null)
            voucherObj = this._parseVoucher(voucher);
         return voucherObj;
      }catch (err) {
         logger.error(`${logLabel} - Error on findById query: ${err.message}`);
         throw err;
      }
   }

   async delete(idVoucher){
      const{logLabel} = this;
      try{
         await prisma.voucher.delete({
            where: {
               id: idVoucher
            }
         });
      }catch (err) {
         logger.error(`${logLabel} - Error on delete query: ${err.message}`);
         throw err;
      }
   }

   _parseVoucher(voucher){
      let voucherObj = null;

      let brand = voucher["brand"];
      const brandObj = new Brand(
         brand["id"],
         brand["name"],
         brand["createdAt"],
         brand["updatedAt"]
      )

      let prices = [];
      let voucherPriceList = voucher["voucherPrice"];
      for(const voucherPrice of voucherPriceList){
         let price = voucherPrice["price"];
         prices.push(price);
      }

      let assetObjList = [];
      let assetList = voucher["asset"];
      for(const asset of assetList){
         let assetObj = new Asset(
            asset["id"],
            asset["imageName"],
            asset["imagePath"],
            asset["createdAt"]
         )
         assetObjList.push(assetObj);
      }

      voucherObj = new Voucher(
         voucher['id'],
         voucher['name'],
         voucher['description'],
         brandObj,
         prices,
         assetObjList,
         voucher['createdAt'],
         voucher['updatedAt']
      )

      return voucherObj;
   }
}

module.exports = VoucherRepo