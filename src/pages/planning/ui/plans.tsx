import { useMedicationStore } from '@/entities/medication';
import { usePlanStore } from '@/entities/plan';
import { PlanCard } from '@/entities/plan';
import { CenteredLoaderSpinner } from '@/shared/ui';
import { createAsync } from '@solidjs/router';
import { createMemo, For, Suspense, Show } from 'solid-js';
import { type Plan } from '@/entities/plan';
import { type Medication } from '@/entities/medication';
import { PlanStatus } from '@/entities/plan/model/plan';
import './plans.css';

export function PlansPage() {
  const planStore = usePlanStore();
  const medStore = useMedicationStore();
  const plansAndMedications = createAsync(async () => {
    const plans = await planStore.allPlans();
    const medications = await medStore.allMedications();
    return {
      plans: plans,
      medications: medications,
    };
  });

  const selectPlansByStatus = (
    { plans, medications }: { plans: Plan[]; medications: Medication[] },
    status: PlanStatus,
  ) => {
    return plans
      .filter((p) => p.status === status)
      .map((plan) => {
        return {
          ...plan,
          medication: medications.find((m) => m.id == plan.medicationId),
        };
      });
  };

  const activePlans = createMemo(() => {
    if (plansAndMedications() === undefined) {
      return [];
    }
    return selectPlansByStatus(plansAndMedications()!, 'active');
  });

  const finishedPlans = createMemo(() => {
    if (plansAndMedications() === undefined) {
      return [];
    }
    return selectPlansByStatus(plansAndMedications()!, 'finished');
  });

  return (
    <main class="plans-page">
      <Suspense fallback={<CenteredLoaderSpinner />}>
        <div class="plans-page__all-plans">
          <Show when={activePlans().length > 0}>
            <section class="plans-page__active-plans">
              <h2 class="plans-page__header">Активные планы</h2>
              <div class="plans-page__plans-list">
                <For each={activePlans()}>
                  {(plan) => <PlanCard plan={plan} medication={plan.medication!} />}
                </For>
              </div>
            </section>
          </Show>
          <Show when={finishedPlans().length > 0}>
            <section class="plans-page__finished-plans">
              <h2 class="plans-page__header">Завершенные планы</h2>
              <div class="plans-page__plans-list">
                <For each={finishedPlans()}>
                  {(plan) => <PlanCard plan={plan} medication={plan.medication!} />}
                </For>
              </div>
            </section>
          </Show>
        </div>
      </Suspense>
    </main>
  );
}
