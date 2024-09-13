import { DASHBOARD_PATH } from '@/app/lib/paths';
import { useNavbarContext } from '../navbarContext';
import { NavbarLink } from './NavbarLink';

export function DashboardLink() {
  const { session } = useNavbarContext();
  if (session?.role !== 'ADMIN' && session?.role !== 'SUPERADMIN') return <></>;
  return <NavbarLink to={DASHBOARD_PATH.HOME}>Dashboard</NavbarLink>;
}
