import {
  Button,
  LabelsWrapper,
  InputField,
  PilledWrapper,
  SelectField,
  type OptionSpec,
  DateField,
} from '@/shared/ui';
import { withForm } from '@/shared/lib';
import './first-step.css';

export const MedicationFormRequiredForm = withForm({
  defaultValues: {
    medicationName: '',
    expirationDate: '',
    releaseForm: '',
    amount: {
      value: '' as unknown as number,
      unit: '',
    },
  },
  props: {
    amountOptions: [] as OptionSpec[],
    onSubmit: () => {
      return;
    },
  },
  render: function Render(props) {
    return (
      <form
        novalidate
        class="medication-form__required-form required-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onSubmit();
        }}
      >
        <h2 class="required-form__header">Обязательные поля</h2>
        <props.form.Field
          name="medicationName"
          children={(field) => {
            return (
              <LabelsWrapper
                label="Препарат"
                labelFor={field().name}
                feedbackMessage={field().state.meta.errors.join(', ')}
                required
              >
                <InputField
                  placeholder="Начните вводить"
                  type="text"
                  name={field().name}
                  id={field().name}
                  maxlength={10}
                  value={field().state.value}
                />
              </LabelsWrapper>
            );
          }}
        />
        <props.form.Field
          name="expirationDate"
          children={(field) => {
            return (
              <LabelsWrapper
                label="Срок годности"
                labelFor={field().name}
                feedbackMessage={field().state.meta.errors.join(', ')}
                required
              >
                <DateField
                  name={field().name}
                  id={field().name}
                  maxlength={10}
                  value={field().state.value}
                />
              </LabelsWrapper>
            );
          }}
        />
        <props.form.Field
          name="releaseForm"
          children={(field) => {
            return (
              <LabelsWrapper
                label="Форма выпуска"
                labelFor={field().name}
                feedbackMessage={field().state.meta.errors.join(', ')}
                required
              >
                <PilledWrapper
                  pills={['Таблетки', 'Капсулы', 'Ампулы', 'Раствор', 'Порошок']}
                  onPillClick={(pill) => field().setValue(pill)}
                >
                  <InputField
                    placeholder="Начните вводить"
                    type="text"
                    name={field().name}
                    id={field().name}
                    maxlength={10}
                    value={field().state.value}
                  />
                </PilledWrapper>
              </LabelsWrapper>
            );
          }}
        />
        <props.form.Field
          name="amount.value"
          children={(field) => {
            return (
              <LabelsWrapper
                label="Количество"
                labelFor={field().name}
                feedbackMessage={field().state.meta.errors.join(', ')}
                required
              >
                <div class="required-form__combined-field">
                  <InputField
                    type="number"
                    name={field().name}
                    id={field().name}
                    placeholder="Количество"
                    value={field().state.value}
                  />
                  <props.form.Field
                    name="amount.unit"
                    children={(field) => (
                      <SelectField
                        name={field().name}
                        id={field().name}
                        options={props.amountOptions ?? []}
                        value={field().state.value}
                      />
                    )}
                  />
                </div>
              </LabelsWrapper>
            );
          }}
        />
        <props.form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
          })}
          children={(state) => {
            return (
              <Button
                class="required-form__next-button"
                type="submit"
                isDisabled={!state().canSubmit}
              >
                Далее
              </Button>
            );
          }}
        />
      </form>
    );
  },
});
