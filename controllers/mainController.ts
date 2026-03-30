import { injectable } from 'inversify';
import { getSession } from '@/app/lib/session';

export class UserPermissionVerifier {
  async isAdmin(): Promise<boolean> {
    const session = await getSession();
    if (!session) return false;
    return session.role == 'ADMIN' || session.role == 'SUPERADMIN';
  }

  async isSuperAdmin(): Promise<boolean> {
    const session = await getSession();
    if (!session) return false;
    return session.role == 'SUPERADMIN';
  }
  async isUser(): Promise<boolean> {
    return false;
  }
}

@injectable() // borrar eventualmente
export class GeneralController {
  constructor(
    protected readonly userPermissionVerifier: UserPermissionVerifier = new UserPermissionVerifier(),
  ) {}
}
