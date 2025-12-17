import { useMedicationStore } from '@/entities/medication';
import { CenteredLoaderSpinner } from '@/shared/ui';
import { useLayoutStore } from '@/widgets/layouts';
import { PlanForm } from '@/widgets/plan_form';
import { createAsync } from '@solidjs/router';
import { Suspense, Show } from 'solid-js';

export function PlanAddPage() {
  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Планирование',
  });

  const medStore = useMedicationStore();
  const medications = createAsync(medStore.allMedications);

  return (
    <Suspense fallback={<CenteredLoaderSpinner />}>
      <Show when={medications()}>
        <main class="plan-add-page">
          <PlanForm medications={medications() ?? []} onSubmit={(plan) => console.log(plan)} />
        </main>
      </Show>
    </Suspense>
  );
}
