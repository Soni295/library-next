import prisma from '@/app/lib/db/prisma';
import { faker } from '@faker-js/faker';

export async function importar() {
  const marks = 0;
  const products = 0;
  for (let i = 0; i < marks; i++) {
    const a = await prisma.mark.create({
      data: {
        name: faker.word.noun(),
        enable: faker.helpers.arrayElement([true, false]),
      },
    });
  }
  const example = await prisma.mark.findMany({ select: { id: true } });
  const ids = example.map(({ id }) => id);

  for (let i = 0; i < products; i++) {
    await prisma.product.create({
      data: {
        photo: '',
        name: i + faker.commerce.productName(),
        markId: faker.helpers.arrayElement(ids),
        quantity: faker.number.int({ min: 0, max: 1e4 }),
        basePrice: faker.number.float({ min: 0, max: 1e6, fractionDigits: 2 }),
        enable: faker.helpers.arrayElement([true, false]),
      },
    });
  }

  const p = await prisma.product.count();
  console.log(p);
}
