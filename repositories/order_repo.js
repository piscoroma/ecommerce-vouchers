/**
 * @author Giuseppe Piscopo
**/

const logger = require('../logger');
const Order = require("../models/order");
const OrderVoucher = require("../models/order_voucher");
const User = require('../models/user');

const { prisma } = require('../prisma');

class OrderRepo{
   constructor(){
      this.logLabel = "[order-repo]";
   }
   
   async create(orderObj){
      const{logLabel} = this;
      try{
         let orderVoucherList = [];
         for(const orderVoucherObj of orderObj.orderVoucherObjList){
            let orderVoucher = {
               "idVoucher": orderVoucherObj.idVoucher,
               "codeGenerated": orderVoucherObj.codeGenerated,
               "price": orderVoucherObj.price
            }
            orderVoucherList.push(orderVoucher);
         }
         const order = await prisma.order.create({
            data: {
               totalPrice: orderObj.totalPrice,
               idUser: orderObj.userObj.id,
               orderVoucher: {
                  createMany: {
                     data: orderVoucherList
                  },
               },
            },
            include: {
               orderVoucher: false
            }
         });
         return order.id;
      }catch (err) {
         logger.error(`${logLabel} - Error on create query: ${err.message}`);
         throw err;
      }
   }

   async findAll(filters){
      const{logLabel} = this;
      try{
         if("idUser" in filters)
            filters["idUser"] = Number(filters["idUser"]);
         let orderObjList = [];
         const orders = await prisma.order.findMany({
            where: {
               idUser: filters.idUser
            },
            orderBy: {
               date: 'desc',
            },
            include: {
               orderVoucher: true,
               user: true
            }
         });
         for(const order of orders){
            let orderObj = this._parseOrder(order);
            orderObjList.push(orderObj);
         }
         return orderObjList;
      }catch (err) {
         logger.error(`${logLabel} - Error on findAll query: ${err.message}`);
         throw err;
      }
   }

   async findById(idOrder){
      const{logLabel} = this;
      try{
         let orderObj = null;
         const order = await prisma.order.findUnique({
            where: {
               id: idOrder
            },
            include: {
               orderVoucher: true,
               user: true
            }
         });
         if(order!=null)
            orderObj = this._parseOrder(order);
         return orderObj;
      }catch (err) {
         logger.error(`${logLabel} - Error on findById query: ${err.message}`);
         throw err;
      }
   }

   async find(idOrder, idUser){
      const{logLabel} = this;
      try{
         let orderObj = null;
         const order = await prisma.order.findFirst({
            where: {
               AND: [
                  {id: idOrder},
                  {idUser: idUser}
               ]
            },
            include: {
               orderVoucher: true,
               user: true
            }
         });
         if(order!=null)
            orderObj = this._parseOrder(order);
         return orderObj;
      }catch (err) {
         logger.error(`${logLabel} - Error on find query: ${err.message}`);
         throw err;
      }
   }

   _parseOrder(order){
      let orderObj = null;

      let orderVoucherObjList = [];
      let orderVoucherList = order["orderVoucher"];
      for(const orderVoucher of orderVoucherList){
         let orderVoucherObj = new OrderVoucher(
            orderVoucher["id"],
            orderVoucher["idOrder"],
            orderVoucher["idVoucher"],
            orderVoucher["price"],
            orderVoucher["codeGenerated"],
         )
         orderVoucherObjList.push(orderVoucherObj);
      }

      let userObj = this._parseUser(order["user"]);

      orderObj = new Order(
         order['id'],
         order['date'],
         order['totalPrice'],
         userObj,
         orderVoucherObjList
      )

      return orderObj;
   }

   _parseUser(user){
      let userObj = new User(
         user['id'],
         user['username'],
         user['password'],
         user['salt'],
         user['email'],
         user['role'],
         user['createdAt'],
         user['updatedAt'],
         user['name'],
         user['surname'],
         user['phone'],
         user['address']
      )
      return userObj;
   }
}

module.exports = OrderRepo
