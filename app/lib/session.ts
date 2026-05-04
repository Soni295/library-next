import { getServerSession } from 'next-auth';
import { userCtrl } from './compose/inversify';

export async function getSession() {
  const simpleSession = await getServerSession();
  if (!simpleSession?.user?.email) return null;
  return await userCtrl.getUserByEmail(simpleSession.user.email);
}
