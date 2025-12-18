import { useMedicationActions, useMedicationStore } from '@/entities/medication';
import { SomethingBadScreen } from '@/features/something_bad';
import { useLayoutStore } from '@/widgets/layouts';
import { createAsync } from '@solidjs/router';
import { Suspense, Show, createSignal, For, createMemo } from 'solid-js';
import './llm_assistant.css';
import { ArrowUpIcon, CenteredLoaderSpinner, IconStyle } from '@/shared/ui';
import { createForm } from '@tanstack/solid-form';
import { toast } from '@/features/toaster';

export interface LlmAssistantPageProps {
  medicationId: string;
}

export function LlmAssistantPage(props: LlmAssistantPageProps) {
  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: '',
  });

  const medStore = useMedicationStore();
  const medication = createAsync(() => medStore.medicationById(props.medicationId));

  const medActions = useMedicationActions();

  const [submitBlocked, setSubmitBlocked] = createSignal(false);

  const form = createForm(() => ({
    defaultValues: {
      query: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        if (value.query === '') {
          return 'Заполните поле';
        }
      },
    },
    onSubmit: async ({ value, formApi }) => {
      if (submitBlocked() || !medication()) {
        return;
      }
      formApi.reset();
      setSubmitBlocked(true);
      try {
        await medActions.askAssistant(medication()!.id, value.query);
      } catch {
        toast.error('Не удалось отправить запрос');
      } finally {
        setSubmitBlocked(false);
      }
    },
  }));

  const handleSubmitQuery = () => {
    form.handleSubmit().catch(() => {
      // it is not possible, but to make sure
      toast.error('Не удалось отправить запрос');
    });
  };

  // See https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#whitespace_keys
  const ENTER_KEY_CODE = 'Enter';

  const submitOnEnter = (event: KeyboardEvent) => {
    if (event.key === ENTER_KEY_CODE) {
      handleSubmitQuery();

      event.preventDefault();
    }
  };

  const assistantLog = createMemo(() => {
    if (!medication()) {
      return;
    }
    const assistantLog = medStore.fullAssistantLog();
    return assistantLog.get(medication()!.id) ?? [];
  });

  return (
    <main class="llm-assistant-page">
      <Suspense fallback={<CenteredLoaderSpinner />}>
        <Show
          when={medication() !== undefined && medication() !== null}
          fallback=<SomethingBadScreen reason="Препарат не найден (HTTP 404)" />
        >
          <div class="llm-assistant-page__assistant-greeting">
            Привет! Я могу помочь вам с вопросами по препарату. Cпросите меня о чём-нибудь.
            Например: "Какая дозировка препарата?"
          </div>
          <For each={assistantLog()}>
            {(queryLog) => {
              return (
                <div class="llm-assistant-page__qna-block">
                  <div class="llm-assistant-page__user-message llm-assistant-page__user-message_brand">
                    {queryLog.query}
                  </div>
                  <Show when={queryLog.answer}>
                    <div class="llm-assistant-page__llm-response">{queryLog.answer}</div>
                  </Show>
                </div>
              );
            }}
          </For>
          <div class="llm-assistant-page__form-container">
            <form
              class="llm-assistant-page__query-form"
              novalidate
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmitQuery();
              }}
            >
              <form.Field
                name="query"
                children={(field) => {
                  return (
                    <textarea
                      class="llm-assistant-page__query-input"
                      name={field().name}
                      id={field().name}
                      maxlength={300}
                      value={field().state.value}
                      placeholder="Ваш вопрос"
                      onInput={(e) => {
                        field().handleChange(e.target.value);
                      }}
                      onKeyDown={(event) => submitOnEnter(event)}
                    >
                      {field().state.value}
                    </textarea>
                  );
                }}
              />
              <form.Subscribe
                selector={(state) => ({
                  canSubmit: state.canSubmit && state.values.query?.trim().length > 0,
                })}
                children={(state) => (
                  <button
                    class="llm-assistant-page__submit-query-button"
                    type="submit"
                    disabled={!state().canSubmit || submitBlocked()}
                  >
                    <ArrowUpIcon
                      elementClass="llm-assistant-page__submit-query-icon"
                      iconStyle={state().canSubmit ? IconStyle.Active : IconStyle.Inactive}
                    />
                  </button>
                )}
              />
            </form>
          </div>
        </Show>
      </Suspense>
    </main>
  );
}
