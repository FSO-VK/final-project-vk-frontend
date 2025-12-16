import { withForm } from '@/shared/lib';
import { PlanDayPeriod } from '@/entities/plan';
import { LabelsWrapper, RadioGroup } from '@/shared/ui';
import { createSignal } from 'solid-js';
import './day_period.css';

const DAY_PERIOD_OPTIONS = [
  {
    value: PlanDayPeriod.EveryDay,
    label: 'Каждый день',
  },
  {
    value: PlanDayPeriod.EveryXDays,
    label: 'Каждые X дней',
  },
];

export const DayPeriodForm = withForm({
  defaultValues: {
    period: null as PlanDayPeriod | null,
  },
  props: {
    initialSelected: undefined as PlanDayPeriod | undefined,
  },
  render: function Render(props) {
    const [selectedIdx, setSelectedIdx] = createSignal(
      props.initialSelected
        ? DAY_PERIOD_OPTIONS.findIndex((opt) => opt.value === props.initialSelected)
        : undefined,
    );

    return (
      <div class="day-period-form">
        <h2 class="day-period-form__header">В каком режиме вы планируете принимать препарат?</h2>
        <form class="day-period-form__form">
          <props.form.Field
            name="period"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) {
                  return 'Выберите способ приема';
                }
                return;
              },
            }}
            children={(field) => {
              return (
                <LabelsWrapper
                  label="Выберите подходящий вариант"
                  labelFor={field().name}
                  feedbackMessage={field().state.meta.errors.join(', ')}
                >
                  <RadioGroup
                    class="day-period-form__radiogroup"
                    name={field().name}
                    options={DAY_PERIOD_OPTIONS}
                    selectedIdx={selectedIdx()}
                    onOptionSelected={(opt, idx) => {
                      setSelectedIdx(idx);
                      field().handleChange(opt.value as PlanDayPeriod);
                    }}
                  />
                </LabelsWrapper>
              );
            }}
          />
        </form>
      </div>
    );
  },
});
