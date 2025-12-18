import { useAppForm } from '@/shared/lib';
import './medication-form.css';
import { MedicationFormRequiredForm } from './first-step';
import { MedicationFormOptionalForm } from './second-step';
import { Dynamic } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { ACTIVE_SUBSTANCE_UNIT, AMOUNT_UNITS } from '@/entities/medication';
import { ActiveSubstance, MedicationDraft } from '@/entities/medication';

export interface MedicationFormProps {
  onBackClick: () => void;
  initialMedication?: MedicationDraft;
  onSaveClick: (m: MedicationDraft) => void;
  header: string;
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
    releaseDate: new Date(Date.now()),
  } as MedicationDraft);

  onMount(() => {
    if (props.initialMedication !== undefined) {
      setMedDraft(props.initialMedication);
    }
  });

  const requiredForm = useAppForm(() => ({
    defaultValues: {
      medicationName: props.initialMedication?.name ?? '',
      expirationDate: props.initialMedication?.expirationDate.toISOString().split('T')[0] ?? '',
      releaseForm: props.initialMedication?.releaseForm ?? '',
      amount: {
        value: props.initialMedication?.amount.value ?? ('' as unknown as number),
        unit: props.initialMedication?.amount.unit ?? AMOUNT_UNITS[0],
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
      releaseDate: props.initialMedication?.releaseDate?.toISOString().split('T')[0] ?? '',
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
        releaseDate: new Date(value.releaseDate),
        comment: value.comment,
      });
      props.onSaveClick(medDraft());
    },
  }));

  const amountOptions = AMOUNT_UNITS.map((u) => {
    return {
      value: u,
      label: u,
    };
  });

  if (
    props.initialMedication !== undefined &&
    AMOUNT_UNITS.find((unit) => unit === props.initialMedication!.amount.unit) === undefined
  ) {
    amountOptions.push({
      value: props.initialMedication.amount.unit,
      label: props.initialMedication.amount.unit,
    });
  }

  const forms = [
    () => {
      return (
        <MedicationFormRequiredForm
          form={requiredForm}
          amountOptions={amountOptions}
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
      <h1 class="medication-form__header">{props.header ?? ''}</h1>
      <Dynamic component={forms[selected()]} />
    </section>
  );
}
