import { NavbarSearch } from './NavbarSearch';
import { NavBarIcon } from './NavbarIcon';
import { NavBarHandler } from './NavBarHandler';
import { NavbarProvider } from './navbarContext';
import { getSession } from '@/app/lib/session';
import prisma from '@/app/lib/db/prisma';
import { faker } from '@faker-js/faker';

async function importar() {
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
  //for (let i = 0; i < 1000; i++) {	}
}

export async function Navbar() {
  const session = await getSession();
  //await importar()

  return (
    <nav className="flex h-[2.5rem] w-screen px-[1rem] bg-brand-light items-center justify-between">
      <NavBarIcon />
      <NavbarSearch />
      <div className="flex">
        <NavbarProvider session={session}>
          <NavBarHandler />
        </NavbarProvider>
      </div>
    </nav>
  );
}
