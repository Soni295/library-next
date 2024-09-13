import { NextRequest } from 'next/server';
import { UserCreateInput } from '@/app/lib/definitions/user';
import { Responses } from '@/app/lib/utils/response';
import { ServerErr } from '@/app/lib/errors/serverErr';
import { userCtrl } from '@/app/lib/compose/inversify';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as UserCreateInput;
    const user = await userCtrl.signIn(data);
    if (user instanceof ServerErr) {
      return Responses.error(500, [user]);
    }
    return Responses.success(null, 201);
  } catch (err) {
    console.log(err);
    return Responses.serverError();
  }
}
