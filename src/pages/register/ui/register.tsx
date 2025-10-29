import { Button, Input, ButtonStyle } from '@/shared/ui';
import { A, useNavigate } from '@solidjs/router';
import { createForm } from '@tanstack/solid-form';
import { EMAIL_ERROR_STRINGS, emailValidator, MAX_EMAIL_LEN } from '@/entities/email';
import { MAX_PASSWORD_LEN, PASSWORD_ERROR_STRINGS, passwordValidator } from '@/entities/password';
import { useMeActions } from '@/entities/me';
import './register.css';
import { transformFieldState } from '@/shared/ui';

export interface RegisterPageProps {
  loginLocation: string;
}

export function RegisterPage(props: RegisterPageProps) {
  const meActions = useMeActions();
  const navigate = useNavigate();

  const form = createForm(() => ({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async ({ value }) => {
      await meActions.register({
        email: value.email,
        password: value.password,
      });
      // Will be removed when medications list will be there.
      navigate('/', { replace: true });
    },
  }));

  return (
    <main class="register-page">
      <h1 class="register-page__header">Регистрация</h1>
      <form
        class="register-page__form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().catch(() => {
            console.error('failed to submit registration form');
          });
        }}
        novalidate
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const validationResult = emailValidator.validate(value);
              if (validationResult === undefined) {
                return validationResult;
              }
              return EMAIL_ERROR_STRINGS[validationResult];
            },
          }}
          children={(field) => (
            <Input
              label="Электронная почта"
              isRequired
              feedbackMessage={field().state.meta.errors.join(', ')}
              type="email"
              name={field().name}
              id={field().name}
              value={field().state.value}
              placeholder="Введите email"
              maxlength={MAX_EMAIL_LEN}
              state={transformFieldState(field)}
              onFocusOut={(e: FocusEvent) =>
                field().handleChange((e.target as HTMLInputElement).value)
              }
              elementClass="register-page__email"
            />
          )}
        />
        <div class="register-page__password-block">
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                const validationResult = passwordValidator.validate(value);
                if (validationResult === undefined) {
                  return validationResult;
                }
                return PASSWORD_ERROR_STRINGS[validationResult];
              },
            }}
            children={(field) => (
              <Input
                label="Пароль"
                isRequired
                feedbackMessage={field().state.meta.errors.join(', ')}
                type="password"
                name={field().name}
                id={field().name}
                placeholder="Введите пароль"
                maxlength={MAX_PASSWORD_LEN}
                state={transformFieldState(field)}
                onInput={(e: InputEvent) =>
                  field().handleChange((e.target as HTMLInputElement).value)
                }
                elementClass="register-page__password"
                value={field().state.value}
              />
            )}
          />
          <form.Field
            name="passwordConfirm"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue('password')) {
                  return 'Введенные пароли не совпадают';
                }
                return;
              },
            }}
            children={(field) => (
              <Input
                label="Подтверждение пароля"
                isRequired
                feedbackMessage={field().state.meta.errors.join(', ')}
                type="password"
                name={field().name}
                id={field().name}
                placeholder="Повторите пароль"
                maxlength={10}
                state={transformFieldState(field)}
                elementClass="register-page__password-confirm"
                onFocusOut={(e: FocusEvent) =>
                  field().handleChange((e.target as HTMLInputElement).value)
                }
                onInput={(e: InputEvent) => {
                  if (field().state.meta.isPristine) {
                    return;
                  }
                  if (!field().state.meta.isValid) {
                    return field().handleChange((e.target as HTMLInputElement).value);
                  }
                }}
                value={field().state.value}
              />
            )}
          />
        </div>
        <div class="register-page__button-container">
          <A href={props.loginLocation}>Уже есть аккаунт?</A>
          <form.Subscribe
            selector={(state) => ({
              canSubmit:
                state.isTouched &&
                state.isFieldsValid &&
                Object.values(state.values).every((field) => field.length > 0),
            })}
            children={(state) => {
              return (
                <Button
                  colorStyle={ButtonStyle.brand}
                  type="submit"
                  isDisabled={!state().canSubmit}
                >
                  Зарегистрироваться
                </Button>
              );
            }}
          />
        </div>
      </form>
    </main>
  );
}
