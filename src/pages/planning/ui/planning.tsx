import { useLayoutStore } from '@/widgets/layouts';
import './planning.css';
import { createSelector, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { SchedulePage } from './schedule';
import { Button, ButtonStyle } from '@/shared/ui';
import { PlansPage } from './plans';

export function PlanningPage() {
  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: false,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Планирование',
  });

  const [currentPageIdx, setCurrentPageIdx] = createSignal(0);
  const isCurrentPage = createSelector(currentPageIdx);

  const pages = [() => <SchedulePage />, () => <PlansPage />];

  return (
    <div class="planning-page">
      <nav class="planning-page__top-nav">
        <ul class="planning-page__top-nav-options">
          <li
            class={`planning-page__top-nav-option ${isCurrentPage(0) ? 'planning-page__top-nav-option_active' : ''}`}
            onClick={() => setCurrentPageIdx(0)}
          >
            <Button colorStyle={ButtonStyle.none} class="planning-page__top-nav-button">
              Расписание
            </Button>
          </li>
          <li
            class={`planning-page__top-nav-option ${isCurrentPage(1) ? 'planning-page__top-nav-option_active' : ''}`}
            onClick={() => setCurrentPageIdx(1)}
          >
            <Button colorStyle={ButtonStyle.none} class="planning-page__top-nav-button">
              Планы
            </Button>
          </li>
        </ul>
      </nav>
      <div class="planning-page__page-container">
        <Dynamic component={pages[currentPageIdx()]} />
      </div>
    </div>
  );
}
