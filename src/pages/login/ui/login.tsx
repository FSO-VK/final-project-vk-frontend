import { useMeActions } from '@/entities/me';
import { useNavigate } from '@solidjs/router';
import { createForm } from '@tanstack/solid-form';
import { Input } from '@/shared/ui';
import { MAX_EMAIL_LEN } from '@/entities/email';
import { MAX_PASSWORD_LEN } from '@/entities/password';
import { Button, ButtonStyle } from '@/shared/ui';
import { A } from '@solidjs/router';
import './login.css';

export interface LoginPageProps {
  registerLocation?: string;
}

export function LoginPage(props: LoginPageProps) {
  const meActions = useMeActions();
  const navigate = useNavigate();

  const form = createForm(() => ({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: ({ value }) => {
        if (value.password && value.email) {
          return undefined;
        }
        return 'Заполните все поля';
      },
    },
    onSubmit: async ({ value }) => {
      await meActions.login({
        email: value.email,
        password: value.password,
      });
      // Will be removed when medications list will be there.
      navigate('/', { replace: true });
    },
  }));

  return (
    <main class="login-page">
      <h1 class="login-page__header">Вход</h1>
      <form
        class="login-page__form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().catch(() => {
            console.error('failed to submit login form');
          });
        }}
        novalidate
      >
        <form.Field
          name="email"
          children={(field) => (
            <Input
              label="Электронная почта"
              type="email"
              name={field().name}
              id={field().name}
              value={field().state.value}
              placeholder="Введите email"
              maxlength={MAX_EMAIL_LEN}
              onInput={(e) => field().handleChange((e.target as HTMLInputElement).value)}
              elementClass="login-page__email"
            />
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <Input
              label="Пароль"
              type="password"
              name={field().name}
              id={field().name}
              placeholder="Введите пароль"
              maxlength={MAX_PASSWORD_LEN}
              elementClass="login-page__password"
              onInput={(e) => field().handleChange((e.target as HTMLInputElement).value)}
              value={field().state.value}
            />
          )}
        />
        <div class="login-page__button-container">
          <Button colorStyle={ButtonStyle.secondary} type="button">
            <A class="login-page__register-button" href={props.registerLocation ?? ''}>
              Зарегистрироваться
            </A>
          </Button>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.isTouched && state.isValid,
            })}
            children={(state) => {
              return (
                <Button
                  class="login-page__submit-button"
                  colorStyle={ButtonStyle.brand}
                  type="submit"
                  isDisabled={!state().canSubmit}
                >
                  Войти
                </Button>
              );
            }}
          />
        </div>
      </form>
    </main>
  );
}
