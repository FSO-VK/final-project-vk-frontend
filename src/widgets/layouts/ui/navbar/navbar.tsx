import './navbar.css';
import { Divider, Navbar } from '@/shared/ui';
import type { ParentProps } from 'solid-js';

export interface NavbarLayoutProps extends ParentProps {
  navBarTitle: string;
  navBarBackLocation: string;
}

// NavbarLayout is a fullscreen layout with navigation bar on top,
// bounded by horizontal size on desktops.
export const NavbarLayout = (props: NavbarLayoutProps) => {
  return (
    <div class="navbar-layout">
      <Navbar
        elementClass="navbar-layout__navbar"
        title={props.navBarTitle ?? ''}
        backLocation={props.navBarBackLocation ?? ''}
      />
      <Divider />
      <div class="navbar-layout__page">{props.children}</div>
    </div>
  );
};
