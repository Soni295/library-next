import { markController } from '@/controllers';
import { handlerErr, successResponse } from '@/app/(server)/api/lib/utils';

export async function GET() {
  try {
    const data = await markController.getAll();
    return successResponse(data, 200);
  } catch (err) {
    return handlerErr(err);
  }
}
