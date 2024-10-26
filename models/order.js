/**
 * @author  Giuseppe Piscopo
**/

const { dateToCustomFormat } = require('../utils/helpers');

class Order{
   constructor(id, date, totalPrice, userObj, orderVoucherObjList){
      this.id = id;
      this.date = date;
      this.totalPrice = totalPrice;
      this.userObj = userObj;
      this.orderVoucherObjList = orderVoucherObjList;
   }

   toJson(){
      let obj = {
         "id": this.id,
         "date": dateToCustomFormat(this.date),
         "totalePrice": this.totalPrice,
         "idUser": this.userObj.id,
         "vouchersOrdered": []
      }
      for(const orderVoucherObj of this.orderVoucherObjList)
         obj["vouchersOrdered"].push(orderVoucherObj.toJson())
      return obj;
   }
}

module.exports = Order