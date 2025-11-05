import './app.css';

import { Router, Route, useParams } from '@solidjs/router';
import { SomethingBadPage } from '@/pages/something_bad';
import { HelloPage } from '@/pages/hello';
import { FullscreenFixedLayout, NavbarLayout, NavTabbarLayout } from '@/widgets/layouts';
import { createResource, Suspense, Show, ParentProps } from 'solid-js';
import { RegisterPage } from '@/pages/register';
import { LoginPage } from '@/pages/login';
import { useMeStore } from '@/entities/me';
import { AuthGuard } from '@/shared/ui';
import { isServer } from 'solid-js/web';
import { MedicationsListPage } from '@/pages/medications_list';
import { ProfilePage } from '@/pages/profile_page';
import { MedicationAddPage } from '@/pages/medication_add';
import { MedicationEditPage } from '@/pages/medication_edit';
import { MedicationPage } from '@/pages/medication';

export interface AppProps {
  // Jobs that must be over before routing started
  initialJob?: () => Promise<void>;
  // Application initial URL
  initialUrl?: string;
}

export function App(props: AppProps) {
  const job = createResource(props.initialJob ?? (() => Promise.resolve()));
  const meStore = useMeStore();

  // TODO: add suspence (FSO-143)
  return (
    <Router url={isServer ? props.initialUrl : ''}>
      <Suspense fallback={<div>Загрузка</div>}>
        <Show when={job}>
          <Route
            path="/"
            component={(p: ParentProps) => (
              <AuthGuard isAuthenticated={!meStore.isAuthorized()} redirectTo="/medications">
                {p.children}
              </AuthGuard>
            )}
          >
            <Route path="/" component={FullscreenFixedLayout}>
              <Route path="/" component={HelloPage} />
            </Route>

            <Route
              path="/"
              component={(c) => (
                <NavbarLayout navBarTitle="Авторизация" navBarBackLocation="/">
                  {c.children}
                </NavbarLayout>
              )}
            >
              <Route path="/register" component={() => <RegisterPage loginLocation="/login" />} />
              <Route path="/login" component={() => <LoginPage registerLocation="/register" />} />
            </Route>
          </Route>

          <Route
            path="/"
            component={(p: ParentProps) => (
              <AuthGuard isAuthenticated={meStore.isAuthorized()} redirectTo="/login">
                {p.children}
              </AuthGuard>
            )}
          />
          <Route
            path="/medications"
            component={(p) => (
              <NavTabbarLayout
                navBarTitle="Препараты"
                navBarBackLocation="/"
                currentTabBarOption={0}
              >
                {p.children}
              </NavTabbarLayout>
            )}
          >
            <Route path="/" component={MedicationsListPage} />
            <Route
              path="/add"
              component={() => (
                <MedicationAddPage backLocation="/medications" afterSaveLocation="/medications" />
              )}
            />
            <Route
              path="/edit/:id"
              component={() => {
                const params = useParams();
                return (
                  <MedicationEditPage
                    backLocation="/medications"
                    afterSaveLocation="/medications"
                    medicationId={params.id}
                  />
                );
              }}
            />

            <Route
              path="/view/:id"
              component={() => {
                const params = useParams();
                return <MedicationPage medicationId={params.id} />;
              }}
            />
          </Route>

          <Route
            path="/planning"
            component={(c) => (
              <NavTabbarLayout
                navBarTitle="Планирование"
                navBarBackLocation="/"
                currentTabBarOption={1}
              >
                <div>Это страница планирования</div>
                {c.children}
              </NavTabbarLayout>
            )}
          />

          <Route
            path="/me"
            component={() => (
              <NavTabbarLayout navBarTitle="Профиль" navBarBackLocation="/" currentTabBarOption={2}>
                <ProfilePage />
              </NavTabbarLayout>
            )}
          />

          <Route path="*" component={FullscreenFixedLayout}>
            <Route
              path="*"
              component={() => <SomethingBadPage reason="Ресурс не найден (HTTP 404)" />}
            />
          </Route>
        </Show>
      </Suspense>
    </Router>
  );
}
