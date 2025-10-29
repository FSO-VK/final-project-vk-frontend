import './navtabbar.css';
import { Divider, FolderIcon, Navbar, Tabbar, UserIcon } from '@/shared/ui';
import type { ParentProps } from 'solid-js';
import { CalendarIcon, TabbarOption } from '@/shared/ui';

export interface NavTabBarLayoutProps extends ParentProps {
  navBarTitle: string;
  navBarBackLocation: string;
  currentTabBarOption?: number;
}

// TODO: remove with nav context (FSO-149)
const tabbarOptions: TabbarOption[] = [
  {
    label: 'Лекарства',
    icon: FolderIcon,
    href: '/medications',
  },
  {
    label: 'Приём',
    icon: CalendarIcon,
    href: '/planning',
  },
  {
    label: 'Профиль',
    icon: UserIcon,
    href: '/me',
  },
];

// NavTabbarLayout is a fullscreen layout with navigation bar on top,
// and tabbar at the bottom
// bounded by horizontal size on desktops.
export const NavTabbarLayout = (props: NavTabBarLayoutProps) => {
  return (
    <div class="navtabbar-layout">
      <div class="navtabbar-layout__navbar-container">
        <Navbar
          elementClass="navbar-layout__navbar"
          title={props.navBarTitle ?? ''}
          backLocation={props.navBarBackLocation ?? ''}
        />
        <Divider />
      </div>
      <div class="navtabbar-layout__page">{props.children}</div>
      <div class="navtabbar-layout__tabbar-container">
        <Divider />
        <Tabbar
          options={tabbarOptions}
          activeOption={props.currentTabBarOption ?? 0}
          elementClass="navtabbar-layout__tabbar"
        />
      </div>
    </div>
  );
};
