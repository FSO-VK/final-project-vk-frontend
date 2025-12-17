import { withForm } from '@/shared/lib';
import { Button, ButtonStyle, IconStyle, P, PlusIcon, TimeField, TrashIcon } from '@/shared/ui';
import './day_period.css';
import type { Medication } from '@/entities/medication';
import { LabelsWrapper, InputField } from '@/shared/ui';
import { transformFieldState, FieldState } from '@/shared/ui';
import './intake_hours.css';
import { Index, Show } from 'solid-js';

const MAX_INTAKE_TIME_SIZE = 10;

export const IntakeHoursForm = withForm({
  defaultValues: {
    dosage: 0,
    timeOfIntake: [] as string[],
  },
  props: {
    medication: undefined as Medication | undefined,
  },
  render: function Render(props) {
    return (
      <div class="intake-hours-form">
        <h2 class="intake-hours-form__header">Как вы планируете прием?</h2>
        <P>Укажите дозировку и время приема</P>
        <form class="intake-hours-form__form">
          <props.form.Field
            name="dosage"
            validators={{
              onChange: ({ value }) => {
                if (value < 0) {
                  return 'Укажите положительное число';
                }
                return;
              },
            }}
            children={(field) => {
              return (
                <LabelsWrapper
                  label="Принимаемая доза"
                  labelFor={field().name}
                  feedbackMessage={field().state.meta.errors.join(', ')}
                >
                  <div class="intake-hours-form__dosage">
                    <InputField
                      type="number"
                      name={field().name}
                      id={field().name}
                      value={field().state.value}
                      state={
                        field().state.meta.isValid ? FieldState.None : transformFieldState(field)
                      }
                      onInput={(e) => field().handleChange(Number(e.currentTarget.value))}
                      max={props.medication?.amount.value}
                      min={0}
                    />
                    <span class="intake-hours-form__dosage-units">
                      {props.medication?.amount.unit ?? ''}
                    </span>
                  </div>
                </LabelsWrapper>
              );
            }}
          />
          <props.form.Field
            name="timeOfIntake"
            mode="array"
            validators={{
              onChange: ({ value }) => {
                if (value.length == 0) {
                  return 'Укажите хотя бы одно время';
                }
                return;
              },
              onSubmit: ({ value }) => {
                if (value.some((val) => !val)) {
                  return 'Заполните все поля';
                }
                return;
              },
            }}
            children={(field) => {
              return (
                <div class="intake-hours-form__time-of-intake">
                  <LabelsWrapper
                    label="Время приема"
                    feedbackMessage={field().state.meta.errors.join(', ')}
                  >
                    <Index each={field().state.value}>
                      {(_, i) => {
                        return (
                          <props.form.Field
                            name={`timeOfIntake[${i}]`}
                            validators={{
                              onChange: ({ value }) => {
                                if (value === '') {
                                  return 'Заполните это поле';
                                }
                                return;
                              },
                            }}
                            children={(subfield) => {
                              return (
                                <div class="intake-hours-form__time-of-intake-field">
                                  <TimeField
                                    name={subfield().name}
                                    id={subfield().name + i}
                                    value={subfield().state.value}
                                    state={
                                      subfield().state.meta.isValid
                                        ? FieldState.None
                                        : transformFieldState(subfield)
                                    }
                                    onInput={(e) => subfield().handleChange(e.target.value)}
                                  />
                                  <Button
                                    class="intake-hours-form__remove-field-button"
                                    type="button"
                                    colorStyle={ButtonStyle.secondary}
                                    onClick={() => {
                                      field().handleChange(field().state.value);
                                      field().removeValue(i);
                                    }}
                                  >
                                    <TrashIcon
                                      iconStyle={IconStyle.Danger}
                                      elementClass="intake-hours-form__remove-field-button-icon"
                                    />
                                  </Button>
                                </div>
                              );
                            }}
                          />
                        );
                      }}
                    </Index>
                    <Show when={field().state.value.length < MAX_INTAKE_TIME_SIZE}>
                      <Button
                        class="intake-hours-form__add-field-button"
                        type="button"
                        colorStyle={ButtonStyle.secondary}
                        onClick={() => {
                          field().pushValue('');
                          field().handleChange(field().state.value);
                        }}
                      >
                        Добавить
                        <PlusIcon
                          iconStyle={IconStyle.Active}
                          elementClass="intake-hours-form__add-field-button-icon"
                        />
                      </Button>
                    </Show>
                  </LabelsWrapper>
                </div>
              );
            }}
          />
        </form>
      </div>
    );
  },
});
