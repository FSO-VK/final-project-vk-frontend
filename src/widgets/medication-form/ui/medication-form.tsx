import { useAppForm } from '@/shared/lib';
import './medication-form.css';
import { MedicationFormRequiredForm } from './first-step';
import { MedicationFormOptionalForm } from './second-step';

export function MedicationForm() {
  const requiredForm = useAppForm(() => ({
    defaultValues: {
      medicationName: '',
      expirationDate: '',
      releaseForm: '',
      amount: {
        value: '' as unknown as number,
        unit: '',
      },
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  }));

  const optionalForm = useAppForm(() => ({
    defaultValues: {
      activeSubstance: [] as {
        name: string;
        value: number;
      }[],
      group: [] as string[],
      producer: '',
      comment: '',
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  }));

  return (
    <section class="medication-form">
      <h1 class="medication-form__header">Добавление лекарства</h1>
      <MedicationFormRequiredForm
        form={requiredForm}
        amountOptions={[
          {
            value: '2',
            label: '2',
          },
        ]}
        onSubmit={() => {
          console.log('next');
        }}
      />
      <MedicationFormOptionalForm form={optionalForm} />
    </section>
  );
}
