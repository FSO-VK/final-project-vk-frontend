import { withForm } from '@/shared/lib';
import {
  DateField,
  FieldState,
  InputField,
  LabelsWrapper,
  P,
  transformFieldState,
} from '@/shared/ui';
import { Show } from 'solid-js';
import './intake_interval.css';

const ONE_YEAR = 365;

export const IntakeIntervalForm = withForm({
  defaultValues: {
    intakeStart: '',
    intakeEnd: '',
    intakeDaysInterval: 0,
  },
  props: {
    showDayInterval: false,
  },
  render: function Render(props) {
    return (
      <div class="intake-interval-form">
        <h2 class="intake-interval-form__header">Когда вы планируете принимать препарат?</h2>

        <P>Укажите продолжительность курса и настройте интервал</P>
        <form class="intake-interval-form__form">
          <props.form.Field
            name="intakeStart"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) {
                  return 'Заполните это поле';
                }
                return;
              },
            }}
            children={(field) => {
              return (
                <LabelsWrapper
                  label="Начало курса"
                  labelFor={field().name}
                  feedbackMessage={field().state.meta.errors.join(', ')}
                >
                  <DateField
                    name={field().name}
                    id={field().name}
                    value={field().state.value}
                    onInput={(e) => field().handleChange(e.currentTarget.value)}
                    state={
                      field().state.meta.isValid ? FieldState.None : transformFieldState(field)
                    }
                    onBlur={() => field().handleBlur()}
                  />
                </LabelsWrapper>
              );
            }}
          />
          <props.form.Field
            name="intakeEnd"
            validators={{
              onChangeListenTo: ['intakeStart'],
              onChange: ({ value, fieldApi }) => {
                if (
                  fieldApi.state.meta.isTouched &&
                  new Date(value) < new Date(fieldApi.form.getFieldValue('intakeStart'))
                ) {
                  return 'Дата окончания должна быть позже даты начала';
                }

                if (new Date(value) < new Date(Date.now())) {
                  return 'Дата окончания должна быть в будущем';
                }
                return;
              },
              onSubmit: ({ value }) => {
                if (!value) {
                  return 'Заполните это поле';
                }
                return;
              },
            }}
            children={(field) => {
              return (
                <LabelsWrapper
                  label="Окончание курса"
                  labelFor={field().name}
                  feedbackMessage={field().state.meta.errors.join(', ')}
                >
                  <DateField
                    name={field().name}
                    id={field().name}
                    value={field().state.value}
                    state={
                      field().state.meta.isValid ? FieldState.None : transformFieldState(field)
                    }
                    onInput={(e) => field().handleChange(e.currentTarget.value)}
                    onBlur={() => field().handleBlur()}
                  />
                </LabelsWrapper>
              );
            }}
          />
          <Show when={props.showDayInterval}>
            <props.form.Field
              name="intakeDaysInterval"
              validators={{
                onChange: ({ value }) => {
                  if (value <= 0) {
                    return 'Выберите положительный интервал';
                  }
                  return;
                },
              }}
              children={(field) => {
                return (
                  <LabelsWrapper
                    label="Интервал в днях"
                    labelFor={field().name}
                    feedbackMessage={field().state.meta.errors.join(', ')}
                  >
                    <InputField
                      type="number"
                      name={field().name}
                      id={field().name}
                      value={field().state.value}
                      state={
                        field().state.meta.isValid ? FieldState.None : transformFieldState(field)
                      }
                      onInput={(e) => field().handleChange(Number(e.currentTarget.value))}
                      max={ONE_YEAR}
                      onBlur={() => field().handleBlur()}
                    />
                  </LabelsWrapper>
                );
              }}
            />
          </Show>
        </form>
      </div>
    );
  },
});
