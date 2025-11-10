import { createStore } from 'solid-js/store';
import { type NavbarState, type LayoutStore } from './layout';

const [solidLayoutStore, setSolidLayoutStore] = createStore<{ navbarState: NavbarState }>({
  navbarState: {
    showBackButton: false,
    title: '',
    showDropdownMenu: false,
    dropdownMenuItems: [],
  },
});

const layoutStore: LayoutStore = {
  navbarState: () => solidLayoutStore.navbarState,
  setNavbarState: (s: NavbarState) => setSolidLayoutStore('navbarState', s),
};

export function useLayoutStore() {
  return layoutStore;
}
