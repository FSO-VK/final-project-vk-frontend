import { useMeActions } from '@/entities/me';
import { useNavigate } from '@solidjs/router';
import { createForm } from '@tanstack/solid-form';
import { Input } from '@/shared/ui';
import { MAX_EMAIL_LEN } from '@/entities/email';
import { MAX_PASSWORD_LEN } from '@/entities/password';
import { Button, ButtonStyle } from '@/shared/ui';
import { A } from '@solidjs/router';
import './login.css';
import { toast } from '@/features/toaster';

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
            toast.error('Не удалось войти, попробуйте позже');
          });
        }}
        novalidate
      >
        <form.Field
          name="email"
          children={(field) => (
            <Input
              autocomplete="email"
              label="Электронная почта"
              type="email"
              name={field().name}
              id={field().name}
              value={field().state.value}
              placeholder="Введите email"
              maxlength={MAX_EMAIL_LEN}
              onInput={(e) => field().handleChange((e.target as HTMLInputElement).value)}
              class="login-page__email"
            />
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <Input
              autocomplete="current-password"
              label="Пароль"
              type="password"
              name={field().name}
              id={field().name}
              placeholder="Введите пароль"
              maxlength={MAX_PASSWORD_LEN}
              class="login-page__password"
              onInput={(e) => field().handleChange((e.target as HTMLInputElement).value)}
              value={field().state.value}
            />
          )}
        />
        <div class="login-page__button-container">
          <A class="login-page__register-button" href={props.registerLocation ?? ''}>
            <Button colorStyle={ButtonStyle.secondary} type="button">
              Зарегистрироваться
            </Button>
          </A>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isPristine: state.isPristine,
            })}
            children={(state) => {
              return (
                <Button
                  class="login-page__submit-button"
                  colorStyle={ButtonStyle.brand}
                  type="submit"
                  isDisabled={!state().canSubmit || state().isPristine}
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
