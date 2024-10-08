import { NextRequest } from 'next/server';
import { handlerErr, successResponse } from '@/app/(server)/api/lib/utils';
import { markCtrl } from '@/app/lib/compose/inversify';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 7;

  try {
    const data = await markCtrl.getMarkByPage({ page, pageSize });
    return successResponse(data, 200);
  } catch (err) {
    return handlerErr(err);
  }
}
