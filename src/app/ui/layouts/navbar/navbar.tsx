import type { ParentComponent } from 'solid-js';
import './navbar.css';
import { Divider, Navbar } from '@/shared/ui';

// NavbarLayout is a fullscreen layout with navigation bar on top,
// bounded by horizontal size on desktops.
export const NavbarLayout: ParentComponent = (props) => {
  return (
    <div class="navbar-layout">
      <Navbar elementClass="navbar-layout__navbar" title="Очень длинное название" backLocation="" />
      <Divider />
      <div class="navbar-layout__page">{props.children}</div>
    </div>
  );
};
