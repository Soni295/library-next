import { tagCtrl } from '@/app/lib/compose/inversify';
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
    //const data = await req
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return successResponse({ data: [] }, 200);
    }

    const data = await tagCtrl.getByFilter({ text: name, pageSize: 8 });

    return NextResponse.json(data.data, { status: 200, headers });
    return successResponse({ saludo: 'hola' }, 200);
  } catch (err) {
    return handlerErr(err);
  }
}
