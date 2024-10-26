/**
 * @author Giuseppe Piscopo
**/

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
   await prisma.brand.createMany({
      data: [
         { name: 'Amazon' }, 
         { name: 'Carrefour' }, 
         { name: 'Agip' }
      ],
      skipDuplicates: true,
   });

   await prisma.voucher.createMany({
      data: [
         { 
            name: "buono regalo",
            description: "acquista il tuo buono regalo",
            idBrand: 1
         },
         { 
            name: "buono spesa",
            description: "acquista il tuo buono spesa",
            idBrand: 2
         },
         { 
            name: "buono benzina",
            description: "acquista il tuo buono benzina",
            idBrand: 3
         },
      ],
      skipDuplicates: true,
   });

   await prisma.voucherPrice.createMany({
      data: [
         { idVoucher: 1, price: 25 },
         { idVoucher: 1, price: 50 },
         { idVoucher: 1, price: 100 },
         { idVoucher: 2, price: 8 },
         { idVoucher: 2, price: 10 },
         { idVoucher: 2, price: 12 },
         { idVoucher: 3, price: 20 },
         { idVoucher: 3, price: 40 },
         { idVoucher: 3, price: 60 },
         { idVoucher: 3, price: 80 },
         { idVoucher: 3, price: 100 }
      ],
      skipDuplicates: true,
   });

   await prisma.asset.createMany({
      data: [
         { idVoucher: 1, imageName: "image_1_1.png", imagePath: "/media/" },
         { idVoucher: 2, imageName: "image_2_1.png", imagePath: "/media/" },
         { idVoucher: 2, imageName: "image_2_2.png", imagePath: "/media/" },
         { idVoucher: 3, imageName: "image_3_1.png", imagePath: "/media/" }
      ],
      skipDuplicates: true,
   });

   await prisma.user.createMany({
      data: [
         { 
            username: "admin", 
            password: "1e9fee9864792ce29fb5605fc1894b6828206098a611064e665d5cdffdcdbb6f", //qwe123
            salt: "b380deb5ca164a01d5c4e2159326cce7", 
            email: "test@123.it", 
            role: "admin"
         },
         { 
            username: "customer", 
            password: "75ede1666870c1fcd033e7ab5960ecd20916005a909dcc9be1b34e0206590e59", //qwe123
            salt: "5b1528d933c1cf4d44e44df2a1e79564", 
            email: "test@456.it", 
            role: "customer",
            name: "Mario",
            surname: "Rossi",
            address: "Via Caspio 4, Torino TO 10144",
            phone: "3402454064"
         } 
      ],
      skipDuplicates: true,
   });

   await prisma.order.createMany({
      data: [
         { totalPrice: 49, idUser: 2 },
         { totalPrice: 200, idUser: 2 }
      ],
      skipDuplicates: true,
   });

   await prisma.orderVoucher.createMany({
      data: [
         {idOrder: 1, idVoucher: 2, price: 8, codeGenerated: "7877fd17-8ce2-4edf-bccb-28529a635b43"},
         {idOrder: 1, idVoucher: 2, price: 8, codeGenerated: "c6b525f6-31ce-4b7c-b81c-4685fa3555c3"},
         {idOrder: 1, idVoucher: 2, price: 8, codeGenerated: "ef0dfd95-7b6f-4db2-95fa-0d3cae48769f"},
         {idOrder: 1, idVoucher: 1, price: 25, codeGenerated: "41c56f5d-e33c-49ed-8d78-0f743d51f8ae"},

         {idOrder: 2, idVoucher: 3, price: 100, codeGenerated: "9c6e8394-9d67-4155-9f5c-c1cd5a5463fb"},
         {idOrder: 2, idVoucher: 3, price: 100, codeGenerated: "6f1b2308-6ccb-4b94-98ac-bf2a34840526"}
          
      ],
      skipDuplicates: true,
   });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });