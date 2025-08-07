import { categoryCtrl } from '@/app/lib/compose/inversify';
import { CategoryId } from '@/app/lib/definitions/models/category';
import { Category } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const headers = { 'Content-Type': 'application/json' };

function handlerErr(err: any) {
  console.log(`${handlerErr.name} [category]: ${err}`);
  return NextResponse.json({ err }, { status: 500, headers });
}

function successResponse(data: any, status: number) {
  return NextResponse.json({ data: data }, { status, headers });
}

export async function POST(req: NextRequest) {
  try {
    const data: Category = await req.json();
    const category = await categoryCtrl.save(data);
    return successResponse({ category }, 201);
  } catch (err) {
    return handlerErr(err);
  }
}

export async function GET() {
  try {
    const categories = await categoryCtrl.getAll();
    return successResponse({ categories }, 201);
  } catch (err) {
    return handlerErr(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data: Category = await req.json();
    const category = await categoryCtrl.update(data);
    return successResponse({ category }, 201);
  } catch (err) {
    return handlerErr(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data: CategoryId = await req.json();
    await categoryCtrl.deleteById(data.id);
    return successResponse(null, 200);
  } catch (err) {
    return handlerErr(err);
  }
}
