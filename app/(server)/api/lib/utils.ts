import { NextResponse } from 'next/server';
const headers = { 'Content-Type': 'application/json' };

export function handlerErr(err: any) {
  console.log(`${handlerErr.name} [category]: ${err}`);
  return NextResponse.json({ err }, { status: 500, headers });
}

export function successResponse(data: any, status: number) {
  return NextResponse.json(data, { status, headers });
}
