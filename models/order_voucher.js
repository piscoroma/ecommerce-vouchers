/**
 * @author  Giuseppe Piscopo
**/


class OrderVoucher{
   constructor(id, idOrder, idVoucher, price, codeGenerated){
      this.id = id;
      this.idOrder = idOrder;
      this.idVoucher = idVoucher;
      this.price = price;
      this.codeGenerated = codeGenerated;
   }

   toJson(){
      let obj = {
         "idVoucher": this.idVoucher,
         "price": this.price,
         "codeGenerated": this.codeGenerated
      }
      return obj;
   }
}

module.exports = OrderVoucher