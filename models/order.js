/**
 * @author  Giuseppe Piscopo
**/

const { dateToCustomFormat } = require('../tools/utils');

class Order{
   constructor(id, date, totalPrice, customer, vouchersOrdered){
      this.id = id;
      this.date = date;
      this.totalPrice = totalPrice;
      this.customer = customer;
      this.vouchersOrdered = vouchersOrdered;
   }

   toJson(){
      let obj = {
         "id": this.id,
         "date": dateToCustomFormat(this.date),
         "totalePrice": this.totalPrice,
         "customer": this.customer.toJson(),
         "vouchersOrdered": []
      }
      for(const orderVoucher of this.vouchersOrdered)
         obj["vouchersOrdered"].push(orderVoucher.toJson())
      return obj;
   }
}

module.exports = Order