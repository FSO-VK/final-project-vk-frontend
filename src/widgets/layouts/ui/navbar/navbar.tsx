import './navbar.css';
import { Divider, Navbar } from '@/shared/ui';
import type { ParentProps } from 'solid-js';
import { useLayoutStore } from '../../model/layout_solid';

export interface NavbarLayoutProps extends ParentProps {
  onBackClick: () => void;
}

// NavbarLayout is a fullscreen layout with navigation bar on top,
// bounded by horizontal size on desktops.
export const NavbarLayout = (props: NavbarLayoutProps) => {
  const layoutStore = useLayoutStore();

  return (
    <div class="navbar-layout">
      <Navbar
        elementClass="navbar-layout__navbar"
        onBackButtonClick={props.onBackClick}
        title={layoutStore.navbarState().title}
        showBackButton={layoutStore.navbarState().showBackButton}
        showDropdownMenu={layoutStore.navbarState().showDropdownMenu}
        dropdownMenuItems={layoutStore.navbarState().dropdownMenuItems}
      />
      <Divider />
      <div class="navbar-layout__page">{props.children}</div>
    </div>
  );
};
