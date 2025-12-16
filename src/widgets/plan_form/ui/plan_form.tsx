import { useAppForm } from '@/shared/lib';
import { MedicationSelectForm } from './form_steps/medication_select';
import { Medication } from '@/entities/medication';
import { PlanDayPeriod } from '@/entities/plan';
import { DayPeriodForm } from './form_steps/day_period';
import { IntakeIntervalForm } from './form_steps/intake_interval';
import { IntakeHoursForm } from './form_steps/intake_hours';
import { createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Show } from 'solid-js';
import { Button, ButtonStyle } from '@/shared/ui';
import './plan_form.css';

export interface PlanFormProps {
  medications: Medication[];
}

export function PlanForm(props: PlanFormProps) {
  const [currentStep, setCurrentStep] = createSignal(0);

  const medicationSelectForm = useAppForm(() => ({
    defaultValues: {
      medicationId: '',
    },
    onSubmit: ({ value, formApi }) => {
      if (formApi.state.isValid) {
        console.log(value);
        setCurrentStep(currentStep() + 1);
      }
    },
  }));

  const dayPeriodForm = useAppForm(() => ({
    defaultValues: {
      period: null as PlanDayPeriod | null,
    },
    onSubmit: ({ value, formApi }) => {
      if (formApi.state.isValid) {
        console.log(value);
        setCurrentStep(currentStep() + 1);
      }
    },
  }));

  const intakeIntervalForm = useAppForm(() => ({
    defaultValues: {
      intakeStart: '',
      intakeEnd: '',
      intakeDaysInterval: 0,
    },
    onSubmit: ({ value, formApi }) => {
      if (formApi.state.isValid) {
        console.log(value);
        setCurrentStep(currentStep() + 1);
      }
    },
  }));

  const intakeHoursForm = useAppForm(() => ({
    defaultValues: {
      dosage: 0,
      timeOfIntake: [] as string[],
    },
    onSubmit: ({ value, formApi }) => {
      if (formApi.state.isValid) {
        console.log(value);
        setCurrentStep(currentStep() + 1);
      }
    },
  }));

  const steps = [
    () => (
      <MedicationSelectForm form={medicationSelectForm} medications={props.medications ?? []} />
    ),
    () => <DayPeriodForm form={dayPeriodForm} />,
    () => <IntakeIntervalForm form={intakeIntervalForm} showDayInterval={true} />,
    () => <IntakeHoursForm form={intakeHoursForm} medication={props.medications[0]} />,
  ];

  const forms = [medicationSelectForm, dayPeriodForm, intakeIntervalForm, intakeHoursForm];

  return (
    <div class="plan-form">
      <Dynamic component={steps[currentStep()]} />
      <div class="required-form__button-container">
        <Show when={currentStep() > 0}>
          <Button
            class="required-form__button"
            type="button"
            colorStyle={ButtonStyle.secondary}
            onClick={() => setCurrentStep(currentStep() - 1)}
          >
            Назад
          </Button>
        </Show>
        <Button
          class="required-form__button"
          type="submit"
          onClick={() => {
            forms[currentStep()].handleSubmit().catch((e) => {
              console.error('failed when submitting form', e);
            });
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
