import type { Medication } from '@/shared/api';
import { Divider } from '@/shared/ui';
import './medication_card.css';

export interface MedicationCardProps {
  medicine: Medication;
}

export function MedicationCard(props: MedicationCardProps) {
  return (
    <section class="medicine-card medicine-card_main">
      <h3 class="medicine-card__name">{props.medicine.name}</h3>
      <Divider />
      <div class="medicine-card__info">
        <span class="medicine-card__amount">
          {props.medicine.items} {props.medicine.itemsUnit}
        </span>
        <span class="medicine-card__expires">
          Годен до {props.medicine.expires.toLocaleDateString()}
        </span>
      </div>
    </section>
  );
}
