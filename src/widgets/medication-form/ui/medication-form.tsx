import { useAppForm } from '@/shared/lib';
import './medication-form.css';
import { MedicationFormRequiredForm } from './first-step';
import { MedicationFormOptionalForm } from './second-step';
import { Dynamic } from 'solid-js/web';
import { createSignal } from 'solid-js';

export interface MedicationFormProps {
  onBackClick: () => void;
}

export function MedicationForm(props: MedicationFormProps) {
  const [selected, setSelected] = createSignal(0);

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
    onSubmit: () => {
      setSelected(selected() + 1);
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

  const forms = [
    () => {
      return (
        <MedicationFormRequiredForm
          form={requiredForm}
          amountOptions={[
            {
              value: '2',
              label: '2',
            },
          ]}
          onBackClick={() => {
            props.onBackClick();
          }}
        />
      );
    },
    () => <MedicationFormOptionalForm form={optionalForm} onBackClick={() => setSelected(0)} />,
  ];

  return (
    <section class="medication-form">
      <h1 class="medication-form__header">Добавление лекарства</h1>
      <Dynamic component={forms[selected()]} />
    </section>
  );
}
