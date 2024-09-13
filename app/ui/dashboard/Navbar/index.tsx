import {
  ConfigIcon,
  DashBoardIcon,
  LogOutIcon,
  MenuIcon,
  ProductsIcon,
  UserIcon,
} from '@/app/ui/icons';
import { NavbarLink } from './NavbarLink';
import { DASHBOARD_PATH } from '@/app/lib/paths';

const dashBoardIcons = [
  { icon: DashBoardIcon, label: 'Dashboard', link: DASHBOARD_PATH.HOME },
  { icon: MenuIcon, label: 'Categorias', link: DASHBOARD_PATH.CATEGORY },
  { icon: ProductsIcon, label: 'Productos', link: DASHBOARD_PATH.PRODUCT },
  { icon: UserIcon, label: 'Usuarios', link: DASHBOARD_PATH.USERS },
  { icon: ConfigIcon, label: 'Configuraciones', link: DASHBOARD_PATH.CONFIG },
];

export function DashboardSidebar() {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {dashBoardIcons.map((icon) => (
            <NavbarLink link={icon.link} key={icon.link}>
              <icon.icon />
              <span className="ms-3">{icon.label}</span>
            </NavbarLink>
          ))}

          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <LogOutIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Cerrar sesion
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
