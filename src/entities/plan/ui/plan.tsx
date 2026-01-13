import { Medication } from '@/entities/medication';
import { Plan } from '../model/plan';
import { Show } from 'solid-js';
import { createMemo } from 'solid-js';
import './plan.css';

export interface PlanCardProps {
  plan: Plan;
  medication: Medication;
}

export function PlanCard(props: PlanCardProps) {
  const formatter = Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const finishDate = createMemo(() => {
    if (props.plan.status !== 'finished') {
      return undefined;
    }
    return formatter.format(props.plan.endDate);
  });
  const startDate = createMemo(() => {
    return formatter.format(props.plan.startDate);
  });
  const endDate = createMemo(() => {
    return formatter.format(props.plan.endDate);
  });

  return (
    <div class="plan-card">
      <div class="plan-card__header">{props.medication.name}</div>
      <div class="plan-card__start-end-period">{`С ${startDate()} по ${endDate()}`}</div>
      <Show when={props.plan.status === 'finished'}>
        <div class="plan-card__finished-date">{`Завершен ${finishDate()}`}</div>
      </Show>
    </div>
  );
}
