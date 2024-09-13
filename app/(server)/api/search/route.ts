import prisma from '@/app/lib/db/prisma';
import { Prisma, Product } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const headers = { 'Content-Type': 'application/json' };

function handlerErr(err: any) {
  console.log(`${handlerErr.name} [category]: ${err}`);
  return NextResponse.json({ err }, { status: 500, headers });
}

function successResponse(data: any, status: number) {
  return NextResponse.json({ data: data }, { status, headers });
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const cleanQuery = `'%${query.trim().toLowerCase()}%'`;

    const result = (await prisma.$queryRaw(Prisma.sql`
      SELECT * FROM libreria.Product WHERE name LIKE ${cleanQuery}
    `)) as Product[];

    console.log(result);

    //const categories = await categoryController.getAll()
    return successResponse(
      {
        data: {
          products: result,
        },
      },
      201,
    );
  } catch (err) {
    return handlerErr(err);
  }
}
