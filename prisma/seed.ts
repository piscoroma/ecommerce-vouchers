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
   })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });