import { useLayoutStore } from '@/widgets/layouts';

export function PlanningPage() {
  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: false,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Планирование приема',
  });

  return <div>Это страница планирования</div>;
}
