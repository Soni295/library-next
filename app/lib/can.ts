import { useAuth } from './usehook/useAuth';
type userSession = ReturnType<typeof useAuth>['user'] | null;

export function can(user: userSession, permission: string) {
  return user?.permissions?.includes(permission);
}

export function canSome(user: userSession, permission: string[]) {
  return user?.permissions?.some((p) => permission.includes(p));
}
