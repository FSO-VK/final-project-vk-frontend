import { useAppForm } from '@/shared/lib';
import './medication-form.css';
import { MedicationFormRequiredForm } from './first-step';
import { MedicationFormOptionalForm } from './second-step';
import { Dynamic } from 'solid-js/web';
import { createSignal } from 'solid-js';
import { ACTIVE_SUBSTANCE_UNIT, AMOUNT_UNITS, Medication } from '@/entities/medication';
import { ActiveSubstance, MedicationDraft } from '@/entities/medication';

export interface MedicationFormProps {
  onBackClick: () => void;
  initialMedication?: Medication;
  onSaveClick: (m: MedicationDraft) => void;
}

export function MedicationForm(props: MedicationFormProps) {
  const [selected, setSelected] = createSignal(0);
  const [medDraft, setMedDraft] = createSignal({
    name: '',
    internationalName: '',
    amount: {
      value: 0,
      unit: '',
    },
    releaseForm: '',
    expirationDate: new Date(Date.now()),
  } as MedicationDraft);

  const requiredForm = useAppForm(() => ({
    defaultValues: {
      medicationName: props.initialMedication?.name ?? '',
      expirationDate: props.initialMedication?.expirationDate.toDateString() ?? '',
      releaseForm: props.initialMedication?.releaseForm ?? '',
      amount: {
        value: props.initialMedication?.amount.value ?? ('' as unknown as number),
        unit: props.initialMedication?.amount.unit ?? '',
      },
    },
    onSubmit: ({ value }) => {
      setSelected(selected() + 1);
      setMedDraft({
        ...medDraft(),
        name: value.medicationName,
        expirationDate: new Date(value.expirationDate),
        releaseForm: value.releaseForm,
        amount: {
          value: value.amount.value,
          unit: value.amount.unit,
        },
      });
    },
  }));

  const optionalForm = useAppForm(() => ({
    defaultValues: {
      activeSubstance: (props.initialMedication?.activeSubstance ?? []).map(
        (s: ActiveSubstance) => {
          return {
            name: s.name,
            value: s.value,
          };
        },
      ),
      group: props.initialMedication?.group ?? ([] as string[]),
      producer: props.initialMedication?.producer?.name ?? '',
      comment: props.initialMedication?.comment ?? '',
    },
    onSubmit: ({ value }) => {
      setMedDraft({
        ...medDraft(),
        activeSubstance: value.activeSubstance.map((s) => {
          return {
            value: s.value,
            name: s.name,
            unit: ACTIVE_SUBSTANCE_UNIT,
          };
        }),
        group: value.group,
        producer: {
          name: value.producer,
          country: '',
        },
        comment: value.comment,
      });
      props.onSaveClick(medDraft());
    },
  }));

  const forms = [
    () => {
      return (
        <MedicationFormRequiredForm
          form={requiredForm}
          amountOptions={AMOUNT_UNITS.map((u) => {
            return {
              value: u,
              label: u,
            };
          })}
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
      <h1 class="medication-form__header">
        {props.initialMedication !== undefined
          ? 'Редактирование препарата'
          : 'Добавление препарата'}
      </h1>
      <Dynamic component={forms[selected()]} />
    </section>
  );
}
