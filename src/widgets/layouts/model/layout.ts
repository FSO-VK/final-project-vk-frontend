import { type NavbarMenuItem } from '@/shared/ui';

export interface NavbarState {
  showBackButton: boolean;
  title: string;
  showDropdownMenu: boolean;
  dropdownMenuItems: NavbarMenuItem[];
}

export interface LayoutStore {
  navbarState: () => NavbarState;
  setNavbarState: (s: NavbarState) => void;
}
