import { handlerErr, successResponse } from '@/app/(server)/api/lib/utils';
import { markCtrl } from '@/app/lib/compose/inversify';

export async function GET() {
  try {
    const data = await markCtrl.getAll();
    return successResponse(data, 200);
  } catch (err) {
    return handlerErr(err);
  }
}
