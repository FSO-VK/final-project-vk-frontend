import { Match, Show, Switch } from 'solid-js';
import { IntakeRecord } from '../model/plan';
import { createMemo } from 'solid-js';
import './intake_record.css';
import { CircleErrorIcon, CircleIcon, CircleOkIcon, IconStyle } from '@/shared/ui';

export interface IntakeRecordProps {
  intakeRecord: IntakeRecord;
}

export function IntakeRecordCard(props: IntakeRecordProps) {
  const formatter = new Intl.DateTimeFormat('ru-RU');
  const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const intakeTime = createMemo(() => {
    const takenAt = props.intakeRecord.takenAt ?? new Date(Date.now());
    const timeTakenAt = timeFormatter.format(takenAt);
    const dateTakenAt = formatter.format(takenAt);
    return timeTakenAt + ', ' + dateTakenAt;
  });

  return (
    <div class="intake-record-card">
      <div class="intake-record-card__top-block">
        <div class="intake-record-card__info">
          <h3 class="intake-record-card__header">{props.intakeRecord.medicationName}</h3>
          <div class="intake-record-card__amount">{`${props.intakeRecord.amount.value} ${props.intakeRecord.amount.unit}`}</div>
        </div>
        <div class="intake-record-card__intake-button">
          <Switch>
            <Match when={props.intakeRecord.status === 'Принято'}>
              <CircleOkIcon
                iconStyle={IconStyle.Success}
                elementClass="intake-record-card__intake-icon"
              />
            </Match>
            <Match when={props.intakeRecord.status === 'Пропущено'}>
              <CircleErrorIcon
                iconStyle={IconStyle.Danger}
                elementClass="intake-record-card__intake-icon"
              />
            </Match>
            <Match when={props.intakeRecord.status === 'Запланировано'}>
              <CircleIcon
                iconStyle={IconStyle.Active}
                elementClass="intake-record-card__intake-icon"
              />
            </Match>
          </Switch>
        </div>
      </div>
      <Show when={props.intakeRecord.status === 'Принято' && props.intakeRecord.takenAt}>
        <div class="intake-record-card__taken-at">{`Принято в ${intakeTime()}`}</div>
      </Show>
    </div>
  );
}
