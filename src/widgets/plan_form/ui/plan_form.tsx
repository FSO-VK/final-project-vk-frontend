import { useAppForm } from '@/shared/lib';
import { MedicationSelectForm } from './form_steps/medication_select';
import { Medication } from '@/entities/medication';
import { PlanDayPeriod, PlanDraft } from '@/entities/plan';
import { DayPeriodForm } from './form_steps/day_period';
import { IntakeIntervalForm } from './form_steps/intake_interval';
import { IntakeHoursForm } from './form_steps/intake_hours';
import { createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Show } from 'solid-js';
import { Button, ButtonStyle } from '@/shared/ui';
import './plan_form.css';
import { adaptPlanFormDraft, PlanFormDraft } from '../model/plan_form_draft';
import { createStore } from 'solid-js/store';

export interface PlanFormProps {
  medications: Medication[];
  onSubmit?: (planDraft: PlanDraft) => void;
}

export function PlanForm(props: PlanFormProps) {
  const [currentStep, setCurrentStep] = createSignal(0);

  const [formDraft, setFormDraft] = createStore({} as PlanFormDraft);

  const medicationSelectForm = useAppForm(() => ({
    defaultValues: {
      medication: null as null | Medication,
    },
    onSubmit: ({ value, formApi }) => {
      if (formApi.state.isValid && value.medication !== null) {
        setFormDraft('medication', value.medication);
        setCurrentStep(currentStep() + 1);
      }
    },
  }));

  const dayPeriodForm = useAppForm(() => ({
    defaultValues: {
      period: null as PlanDayPeriod | null,
    },
    onSubmit: ({ value, formApi }) => {
      if (formApi.state.isValid && value.period !== null) {
        setFormDraft('period', value.period);
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
        setFormDraft('intakeStart', new Date(value.intakeStart));
        setFormDraft('intakeEnd', new Date(value.intakeEnd));
        setFormDraft('intakeDaysInterval', value.intakeDaysInterval);
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
        setFormDraft('dosage', value.dosage);
        setFormDraft('timeOfIntake', value.timeOfIntake);
        props.onSubmit?.(adaptPlanFormDraft(formDraft));
      }
    },
  }));

  const steps = [
    () => (
      <MedicationSelectForm form={medicationSelectForm} medications={props.medications ?? []} />
    ),
    () => <DayPeriodForm form={dayPeriodForm} initialSelected={formDraft.period} />,
    () => (
      <IntakeIntervalForm
        form={intakeIntervalForm}
        showDayInterval={formDraft.period !== PlanDayPeriod.EveryDay}
      />
    ),
    () => <IntakeHoursForm form={intakeHoursForm} medication={formDraft.medication} />,
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
