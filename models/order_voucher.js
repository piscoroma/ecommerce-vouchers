/**
 * @author  Giuseppe Piscopo
**/


class OrderVoucher{
   constructor(id, idOrder, voucher, price, codeGenerated){
      this.id = id;
      this.idOrder = idOrder;
      this.voucher = voucher;
      this.price = price;
      this.codeGenerated = codeGenerated;
   }

   toJson(){
      let obj = {
         "idVoucher": this.voucher.id,
         "name": this.voucher.name,
         "description": this.voucher.description,
         "price": this.price,
         "codeGenerated": this.codeGenerated
      }
      return obj;
   }
}

module.exports = OrderVoucher