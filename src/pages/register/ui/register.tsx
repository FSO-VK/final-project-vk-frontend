import { Button, Input, ButtonStyle, handleGrasefulFieldChange } from '@/shared/ui';
import { A, useNavigate } from '@solidjs/router';
import { createForm } from '@tanstack/solid-form';
import { EMAIL_ERROR_STRINGS, emailValidator, MAX_EMAIL_LEN } from '@/entities/email';
import { MAX_PASSWORD_LEN, PASSWORD_ERROR_STRINGS, passwordValidator } from '@/entities/password';
import { useMeActions } from '@/entities/me';
import './register.css';
import { transformFieldState } from '@/shared/ui';
import { toast } from '@/features/toaster';

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
    validators: {
      onChange: ({ value }) => {
        return value.email && value.password && value.passwordConfirm
          ? undefined
          : 'Заполните обязательные поля';
      },
    },
  }));

  const validateEmail = (email: string) => {
    const validationResult = emailValidator.validate(email);
    if (validationResult === undefined) {
      return validationResult;
    }
    return EMAIL_ERROR_STRINGS[validationResult];
  };

  const validatePassword = (pass: string) => {
    const validationResult = passwordValidator.validate(pass);
    if (validationResult === undefined) {
      return validationResult;
    }
    return PASSWORD_ERROR_STRINGS[validationResult];
  };

  return (
    <main class="register-page">
      <h1 class="register-page__header">Регистрация</h1>
      <form
        class="register-page__form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().then(
            () => {
              toast.success('Добро пожаловать!');
            },
            () => {
              toast.error('Не удалось зарегистрироваться, попробуйте позже');
            },
          );
        }}
        novalidate
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              return validateEmail(value);
            },
          }}
          children={(field) => (
            <Input
              autocomplete="email"
              label="Электронная почта"
              required
              feedbackMessage={field().state.meta.errors.join(', ')}
              type="email"
              name={field().name}
              id={field().name}
              value={field().state.value}
              placeholder="Введите email"
              maxlength={MAX_EMAIL_LEN}
              state={transformFieldState(field)}
              onFocusOut={(e) => {
                field().handleBlur();
                const value = (e.target as HTMLInputElement).value;
                handleGrasefulFieldChange(field, value, !validateEmail(value));
              }}
              onInput={(e: InputEvent) => {
                const value = (e.target as HTMLInputElement).value;
                handleGrasefulFieldChange(field, value, !validateEmail(value));
              }}
              class="register-page__email"
            />
          )}
        />
        <div class="register-page__password-block">
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                return validatePassword(value);
              },
            }}
            children={(field) => (
              <Input
                autocomplete="new-password"
                label="Пароль"
                required
                feedbackMessage={field().state.meta.errors.join(', ')}
                type="password"
                name={field().name}
                id={field().name}
                placeholder="Введите пароль"
                maxlength={MAX_PASSWORD_LEN}
                state={transformFieldState(field)}
                onFocusOut={(e) => {
                  field().handleBlur();
                  const value = (e.target as HTMLInputElement).value;
                  handleGrasefulFieldChange(field, value, validatePassword(value) === undefined);
                }}
                onInput={(e: InputEvent) => {
                  const value = (e.target as HTMLInputElement).value;
                  handleGrasefulFieldChange(field, value, validatePassword(value) === undefined);
                }}
                class="register-page__password"
                value={field().state.value}
              />
            )}
          />
          <form.Field
            name="passwordConfirm"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                if (
                  fieldApi.state.meta.isTouched &&
                  value !== fieldApi.form.getFieldValue('password')
                ) {
                  return 'Введенные пароли не совпадают';
                }
                return;
              },
            }}
            children={(field) => (
              <Input
                autocomplete="new-password"
                label="Подтверждение пароля"
                required
                feedbackMessage={field().state.meta.errors.join(', ')}
                type="password"
                name={field().name}
                id={field().name}
                placeholder="Повторите пароль"
                maxlength={MAX_PASSWORD_LEN}
                state={transformFieldState(field)}
                class="register-page__password-confirm"
                onInput={(e: InputEvent) => {
                  field().handleChange((e.target as HTMLInputElement).value);
                }}
                onBlur={field().handleBlur}
                value={field().state.value}
              />
            )}
          />
        </div>
        <div class="register-page__button-container">
          <A href={props.loginLocation}>Уже есть аккаунт?</A>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isPristine: state.isPristine,
            })}
            children={(state) => {
              return (
                <Button
                  colorStyle={ButtonStyle.brand}
                  type="submit"
                  isDisabled={!state().canSubmit || state().isPristine}
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
