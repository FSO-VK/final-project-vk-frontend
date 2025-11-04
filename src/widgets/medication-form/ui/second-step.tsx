import { withForm } from '@/shared/lib';
import {
  Button,
  ButtonStyle,
  IconStyle,
  InputField,
  LabelsWrapper,
  TrashIcon,
  PlusIcon,
  TextareaField,
} from '@/shared/ui';
import { Index, Show } from 'solid-js';
import './second-step.css';

export const MedicationFormOptionalForm = withForm({
  defaultValues: {
    activeSubstance: [] as {
      name: string;
      value: number;
    }[],
    group: [] as string[],
    producer: '',
    comment: '',
  },
  props: {
    onBackClick: () => {
      return;
    },
  },
  render: function Render(props) {
    return (
      <form
        novalidate
        class="medication-form__optional-form optional-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.form.handleSubmit().catch(() => {
            console.error('failed to submit optional form');
          });
        }}
      >
        <h2 class="optional-form__header">Опциональные поля</h2>
        <props.form.Field name="activeSubstance" mode="array">
          {(field) => (
            <LabelsWrapper
              label="Действующее вещество"
              feedbackMessage={field().state.meta.errors.join(', ')}
            >
              <Show when={field().state.value.length > 0}>
                <Index each={field().state.value}>
                  {(_, i) => {
                    return (
                      <div class="optional-form__combined-field">
                        <props.form.Field name={`activeSubstance[${i}].name`}>
                          {(subfield) => {
                            return (
                              <InputField
                                type="text"
                                name={subfield().name}
                                id={subfield().name + i}
                                placeholder="Действующее вещество"
                                value={subfield().state.value}
                                onChange={(e) => subfield().handleChange(e.target.value)}
                              />
                            );
                          }}
                        </props.form.Field>
                        <props.form.Field name={`activeSubstance[${i}].value`}>
                          {(subfield) => {
                            return (
                              <InputField
                                type="number"
                                name={subfield().name}
                                id={subfield().name}
                                placeholder="мг"
                                value={subfield().state.value}
                                onChange={(e) => subfield().handleChange(Number(e.target.value))}
                              />
                            );
                          }}
                        </props.form.Field>
                        <Button
                          class="optional-form__remove-field-button"
                          type="button"
                          colorStyle={ButtonStyle.secondary}
                          onClick={() => {
                            field().removeValue(i);
                          }}
                        >
                          <TrashIcon
                            iconStyle={IconStyle.Danger}
                            elementClass="optional-form__add-field-button-icon"
                          />
                        </Button>
                      </div>
                    );
                  }}
                </Index>
              </Show>
              <Button
                class="optional-form__add-field-button"
                type="button"
                colorStyle={ButtonStyle.secondary}
                onClick={() => {
                  field().pushValue({
                    name: '',
                    value: '' as unknown as number,
                  });
                }}
              >
                Добавить
                <PlusIcon
                  iconStyle={IconStyle.Active}
                  elementClass="optional-form__add-field-button-icon"
                />
              </Button>
            </LabelsWrapper>
          )}
        </props.form.Field>
        <props.form.Field name="group" mode="array">
          {(field) => (
            <LabelsWrapper
              label="Фармакологическая группа"
              feedbackMessage={field().state.meta.errors.join(', ')}
            >
              <Show when={field().state.value.length > 0}>
                <Index each={field().state.value}>
                  {(_, i) => {
                    return (
                      <props.form.Field name={`group[${i}]`}>
                        {(subfield) => {
                          return (
                            <div class="optional-form__group-input">
                              <InputField
                                type="text"
                                name={subfield().name}
                                id={subfield().name + i}
                                placeholder="Начните вводить"
                                value={subfield().state.value}
                                onChange={(e) => subfield().handleChange(e.target.value)}
                              />
                              <Button
                                class="optional-form__remove-field-button"
                                type="button"
                                colorStyle={ButtonStyle.secondary}
                                onClick={() => {
                                  field().removeValue(i);
                                }}
                              >
                                <TrashIcon
                                  iconStyle={IconStyle.Danger}
                                  elementClass="optional-form__add-field-button-icon"
                                />
                              </Button>
                            </div>
                          );
                        }}
                      </props.form.Field>
                    );
                  }}
                </Index>
              </Show>
              <Button
                class="optional-form__add-field-button"
                type="button"
                colorStyle={ButtonStyle.secondary}
                onClick={() => {
                  field().pushValue('');
                }}
              >
                Добавить
                <PlusIcon
                  iconStyle={IconStyle.Active}
                  elementClass="optional-form__add-field-button-icon"
                />
              </Button>
            </LabelsWrapper>
          )}
        </props.form.Field>
        <props.form.Field
          name="producer"
          children={(field) => {
            return (
              <LabelsWrapper
                label="Производитель"
                labelFor={field().name}
                feedbackMessage={field().state.meta.errors.join(', ')}
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
          name="comment"
          children={(field) => {
            return (
              <LabelsWrapper
                label="Комментарий"
                labelFor={field().name}
                feedbackMessage={field().state.meta.errors.join(', ')}
              >
                <TextareaField
                  placeholder="Ваш комментарий"
                  name={field().name}
                  id={field().name}
                  maxlength={300}
                  value={field().state.value}
                  onInput={(e) => {
                    field().setValue(e.currentTarget.value);
                  }}
                  hasCounter
                />
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
              <div class="optional-form__button-container">
                <Button
                  class="optional-form__button"
                  type="button"
                  colorStyle={ButtonStyle.secondary}
                  onClick={() => props.onBackClick()}
                >
                  Назад
                </Button>
                <Button class="optional-form__button" type="submit" isDisabled={!state().canSubmit}>
                  Сохранить
                </Button>
              </div>
            );
          }}
        />
      </form>
    );
  },
});
