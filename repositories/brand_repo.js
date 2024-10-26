/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const Brand = require('../models/brand');
const { prisma } = require('../prisma')

class BrandRepo{
   constructor(){
      this.logLabel = "[brand-repo]";
   }
   
   async create(brandObj){
      const{logLabel} = this;
      try{
         const brand = await prisma.brand.create({
            data: {
               name: brandObj.name
            }
         });
         return brand.id;
      }catch (err) {
         logger.error(`${logLabel} - Error on create query: ${err.message}`);
         throw err;
      }
   }

   async findById(idBrand){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         let brandObj = null;
         const brand = await prisma.brand.findUnique({
            where: {
               id: idBrand
            }
         });
         if(brand!=null)
            brandObj = this._parseBrand(brand);
         return brandObj;
      }catch (err) {
         logger.error(`${logPrefix} - Error on findById query: ${err.message}`);
         throw err;
      }
   }

   async findByName(name){
      const{logLabel} = this;
      try{
         let brandObj = null;
         const brand = await prisma.brand.findUnique({
            where: {
               name: name
            }
         });
         if(brand!=null)
            brandObj = this._parseBrand(brand);
         return brandObj;
      }catch (err) {
         logger.error(`${logLabel} - Error on findByName query: ${err.message}`);
         throw err;
      }
   }

   async update(brandObj){
      const{logLabel} = this;
      try{
         const brand = await prisma.brand.update({
            where: {
               id: brandObj.id
            },
            data: {
               name: brandObj.name
            }
         });
         return brand;
      }catch (err) {
         logger.error(`${logLabel} - Error on update query: ${err.message}`);
         throw err;
      }
   }

   async delete(idBrand){
      const{logger, logLabel} = this;
      const logPrefix = `${logLabel} - ${idReq}`;
      try{
         await prisma.brand.delete({
            where: {
               id: idBrand
            }
         });
      }catch (err) {
         logger.error(`${logPrefix} - Error on delete query: ${err.message}`);
         throw err;
      }
   }

   _parseBrand(brand){
      let brandObj = new Brand(
         brand['id'],
         brand['name'],
         brand['createdAt'],
         brand['updatedAt']
      )
      return brandObj;
   }

}

module.exports = BrandRepo