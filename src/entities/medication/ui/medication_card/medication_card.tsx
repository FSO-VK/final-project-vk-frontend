import { Button, ButtonStyle, EditIcon, IconStyle } from '@/shared/ui';
import { Medication } from '../../model/medication';
import './medication_card.css';

export interface MedicationCardProps {
  medication: Medication;
  onEditClick?: () => void;
}

export function MedicationCard(props: MedicationCardProps) {
  const expiresFormatter = new Intl.DateTimeFormat('ru-RU', {
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <section class="medication-card medication-card_brand">
      <div class="medication-card__header-container">
        <h3 class="medication-card__header">{props.medication.name}</h3>
        <Button
          type="button"
          colorStyle={ButtonStyle.none}
          class="medication-card__edit-button"
          onClick={() => props.onEditClick?.()}
        >
          <EditIcon elementClass="medication-card__edit-icon" iconStyle={IconStyle.Active} />
        </Button>
      </div>
      <div class="medication-card__info">
        <div class="medication-card__description">
          <div class="medication-card__text-column">
            <span class="medication-card__release-form">{props.medication.releaseForm}</span>
            <span
              class={`medication-card__expires ${props.medication.expirationDate > new Date(Date.now()) ? 'medication-card__expires_ok' : 'medication-card__expires_bad'}`}
            >
              {'до ' + expiresFormatter.format(props.medication.expirationDate)}
            </span>
          </div>
        </div>
        <div class="medication-card__amount">
          {props.medication.amount.value + ' ' + props.medication.amount.unit}
        </div>
      </div>
    </section>
  );
}
