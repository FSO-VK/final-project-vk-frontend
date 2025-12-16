import { useAppForm } from '@/shared/lib';
import { MedicationSelectForm } from './form_steps/medication_select';
import { Medication } from '@/entities/medication';
import { PlanDayPeriod } from '@/entities/plan';
import { DayPeriodForm } from './form_steps/day_period';
import { IntakeIntervalForm } from './form_steps/intake_interval';

export interface PlanFormProps {
  medications: Medication[];
}

export function PlanForm(props: PlanFormProps) {
  const firstStep = useAppForm(() => ({
    defaultValues: {
      medicationId: '',
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  }));

  const secondStep = useAppForm(() => ({
    defaultValues: {
      period: null as PlanDayPeriod | null,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  }));

  const thirdStep = useAppForm(() => ({
    defaultValues: {
      intakeStart: '',
      intakeEnd: '',
      intakeDaysInterval: 0,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  }));

  return (
    <div>
      <MedicationSelectForm form={firstStep} medications={props.medications ?? []} />
      <DayPeriodForm form={secondStep} />
      <IntakeIntervalForm form={thirdStep} showDayInterval={true} />
    </div>
  );
}
