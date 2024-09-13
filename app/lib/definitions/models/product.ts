import { Prisma } from '@prisma/client';
import prisma from '../../../../app/lib/db/prisma';
export type Product = Prisma.Args<typeof prisma.product, 'create'>['data'];
