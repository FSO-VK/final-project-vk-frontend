import './navtabbar.css';
import { Divider, Navbar, Tabbar } from '@/shared/ui';
import type { ParentProps } from 'solid-js';
import { TabbarOption } from '@/shared/ui';
import { useLayoutStore } from '../../model/layout_solid';

export interface NavTabBarLayoutProps extends ParentProps {
  onBackClick: () => void;
  currentTabBarOption?: number;
  tabbarOptions: TabbarOption[];
}

// NavTabbarLayout is a fullscreen layout with navigation bar on top,
// and tabbar at the bottom
// bounded by horizontal size on desktops.
export const NavTabbarLayout = (props: NavTabBarLayoutProps) => {
  const layoutStore = useLayoutStore();
  return (
    <div class="navtabbar-layout">
      <div class="navtabbar-layout__navbar-container">
        <Navbar
          elementClass="navbar-layout__navbar"
          onBackButtonClick={props.onBackClick}
          title={layoutStore.navbarState().title}
          showBackButton={layoutStore.navbarState().showBackButton}
          showDropdownMenu={layoutStore.navbarState().showDropdownMenu}
          dropdownMenuItems={layoutStore.navbarState().dropdownMenuItems}
        />
        <Divider />
      </div>
      <div class="navtabbar-layout__page">{props.children}</div>
      <div class="navtabbar-layout__tabbar-container">
        <Divider />
        <Tabbar
          options={props.tabbarOptions}
          activeOption={props.currentTabBarOption ?? 0}
          elementClass="navtabbar-layout__tabbar"
        />
      </div>
    </div>
  );
};
