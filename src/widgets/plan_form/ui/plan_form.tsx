import { useAppForm } from '@/shared/lib';
import { MedicationSelectForm } from './form_steps/medication_select';
import { Medication } from '@/entities/medication';

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
  return <MedicationSelectForm form={firstStep} medications={props.medications ?? []} />;
}
