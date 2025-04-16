import { NextRequest } from 'next/server';
import { UserCreateInput } from '@/app/lib/definitions/user';
import { Responses } from '@/app/lib/utils/response';
import { ServerErr } from '@/app/lib/errors/serverErr';
import { userCtrl } from '@/app/lib/compose/inversify';
import { revalidatePath } from 'next/cache';
import { CLIENT_PATH } from '@/app/lib/paths';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as UserCreateInput;
    const user = await userCtrl.signIn(data);
    if (user instanceof ServerErr) {
      return Responses.error(500, [user]);
    }

    revalidatePath(CLIENT_PATH.HOME + '/(client)', 'layout');
    return Responses.success(null, 201);
  } catch (err) {
    console.log(err);
    return Responses.serverError();
  }
}
