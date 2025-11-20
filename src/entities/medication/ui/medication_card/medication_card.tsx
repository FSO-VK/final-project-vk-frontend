import { Button, ButtonStyle, EditIcon, Gauge, IconStyle } from '@/shared/ui';
import { Medication } from '../../model/medication';
import './medication_card.css';
import { useNavigate } from '@solidjs/router';
import { getGaugeState, INITIAL_GAUGE_POSITION } from '../getGaugeState';
import { createMemo } from 'solid-js';

export interface MedicationCardProps {
  medication: Medication;
  medicationPageLocation: string;
  onEditClick?: () => void;
}

export function MedicationCard(props: MedicationCardProps) {
  const expiresFormatter = new Intl.DateTimeFormat('ru-RU', {
    month: '2-digit',
    year: 'numeric',
  });

  let editButtonHTML!: HTMLButtonElement;

  const navigate = useNavigate();

  const gaugeState = createMemo(() => {
    return getGaugeState(props.medication);
  });

  return (
    <section
      class="medication-card medication-card_brand"
      onClick={(e) => {
        if (editButtonHTML.contains(e.target)) {
          props.onEditClick?.();
          return;
        }
        navigate(props.medicationPageLocation);
      }}
    >
      <div class="medication-card__header-container">
        <h3 class="medication-card__header">{props.medication.name}</h3>
        <Button
          type="button"
          colorStyle={ButtonStyle.none}
          class="medication-card__edit-button"
          ref={editButtonHTML}
        >
          <EditIcon elementClass="medication-card__edit-icon" iconStyle={IconStyle.Active} />
        </Button>
      </div>
      <div class="medication-card__info">
        <div class="medication-card__description">
          <Gauge
            initialDeg={INITIAL_GAUGE_POSITION}
            fillPercentage={gaugeState().fillPercentage}
            strokeColor={gaugeState().strokeColor}
            class="medication-card__gauge"
          />
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
