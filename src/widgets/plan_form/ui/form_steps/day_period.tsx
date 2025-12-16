import { withForm } from '@/shared/lib';
import { PlanDayPeriod } from '@/entities/plan';
import { P, RadioGroup } from '@/shared/ui';
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
  props: {},
  render: function Render(props) {
    const [selectedIdx, setSelectedIdx] = createSignal(undefined as number | undefined);

    return (
      <div class="day-period-form">
        <h2 class="day-period-form__header">В каком режиме вы планируете принимать препарат?</h2>
        <P>Выберите подходящий вариант</P>
        <form class="day-period-form__form">
          <props.form.Field
            name="period"
            children={(field) => {
              return (
                <RadioGroup
                  class="day-period-form__radiogroup"
                  name={field().name}
                  options={DAY_PERIOD_OPTIONS}
                  selectedIdx={selectedIdx()}
                  onOptionSelected={(opt, idx) => {
                    setSelectedIdx(idx);
                    field().handleChange(opt.value as PlanDayPeriod);
                    props.form.handleSubmit().catch((e) => {
                      console.error('Error when submitting day period form: ', e);
                    });
                  }}
                />
              );
            }}
          />
        </form>
      </div>
    );
  },
});
