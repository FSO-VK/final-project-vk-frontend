import {
  Button,
  LabelsWrapper,
  InputField,
  PilledWrapper,
  SelectField,
  type OptionSpec,
  DateField,
  ButtonStyle,
  transformFieldState,
  FieldState,
} from '@/shared/ui';
import { withForm } from '@/shared/lib';
import './first-step.css';
import {
  MAX_NAME_LEN,
  MAX_RELEASE_FORM_LEN,
  validateAmountValue,
  ValidationError,
} from '@/entities/medication';
import { toast } from '@/features/toaster';

export const VALIDATION_ERROR_STRINGS = {
  [ValidationError.MustBePositive]: 'Введите положительное число',
};

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
    onBackClick: () => {
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
          props.form.handleSubmit().catch(() => {
            toast.error('Не удалось сохранить введенные данные');
          });
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
                  maxlength={MAX_NAME_LEN}
                  value={field().state.value}
                  onInput={(e) => field().handleChange(e.currentTarget.value)}
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
                  value={field().state.value}
                  onInput={(e) => field().handleChange(e.currentTarget.value)}
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
                    maxlength={MAX_RELEASE_FORM_LEN}
                    value={field().state.value}
                    onInput={(e) => field().handleChange(e.currentTarget.value)}
                  />
                </PilledWrapper>
              </LabelsWrapper>
            );
          }}
        />
        <props.form.Field
          name="amount.value"
          validators={{
            onChange: ({ value }) => {
              const validationResult = validateAmountValue(value);
              if (validationResult === undefined) {
                return undefined;
              }
              return VALIDATION_ERROR_STRINGS[validationResult];
            },
          }}
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
                    onInput={(e) => field().handleChange(Number(e.currentTarget.value))}
                    state={
                      transformFieldState(field) == FieldState.Error
                        ? FieldState.Error
                        : FieldState.None
                    }
                  />
                  <props.form.Field
                    name="amount.unit"
                    children={(field) => (
                      <SelectField
                        name={field().name}
                        id={field().name}
                        options={props.amountOptions ?? []}
                        value={field().state.value}
                        onInput={(e) => field().handleChange(e.currentTarget.value)}
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
            canSubmit:
              state.canSubmit &&
              Object.values(state.values).every((field) => field) &&
              state.values.amount.value,
          })}
          children={(state) => {
            return (
              <div class="required-form__button-container">
                <Button
                  class="required-form__button"
                  type="button"
                  colorStyle={ButtonStyle.secondary}
                  onClick={() => props.onBackClick()}
                >
                  Назад
                </Button>
                <Button class="required-form__button" type="submit" isDisabled={!state().canSubmit}>
                  Далее
                </Button>
              </div>
            );
          }}
        />
      </form>
    );
  },
});
