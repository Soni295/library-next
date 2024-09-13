import { getServerSession } from 'next-auth';
import { MaybeSession } from './definitions/session';
import { userCtrl } from './compose/inversify';

export async function getSession(): Promise<MaybeSession> {
  const simpleSession = await getServerSession();
  if (!simpleSession?.user?.email) return null;
  return await userCtrl.getUserByEmail(simpleSession.user.email);
}
