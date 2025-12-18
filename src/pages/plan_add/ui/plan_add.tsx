import { useMedicationStore } from '@/entities/medication';
import { type PlanDraft, usePlanActions } from '@/entities/plan';
import { toast } from '@/features/toaster';
import { CenteredLoaderSpinner } from '@/shared/ui';
import { useLayoutStore } from '@/widgets/layouts';
import { PlanForm } from '@/widgets/plan_form';
import { createAsync, useNavigate } from '@solidjs/router';
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

  const planActions = usePlanActions();
  const navigate = useNavigate();

  const handlePlanAdd = (plan: PlanDraft) => {
    planActions.addPlan(plan).then(
      () => {
        toast.success('План успешно добавлен');
        navigate('/planning');
      },
      (e) => {
        console.log(e);
        toast.error('Не удалось добавить план, повторите позднее');
      },
    );
  };

  return (
    <Suspense fallback={<CenteredLoaderSpinner />}>
      <Show when={medications()}>
        <main class="plan-add-page">
          <PlanForm medications={medications() ?? []} onSubmit={(plan) => handlePlanAdd(plan)} />
        </main>
      </Show>
    </Suspense>
  );
}
