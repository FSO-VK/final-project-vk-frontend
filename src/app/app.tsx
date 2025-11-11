import './app.css';

import { Router, Route, useParams } from '@solidjs/router';
import { HelloPage } from '@/pages/hello';
import { FullscreenFixedLayout, NavbarLayout, NavTabbarLayout } from '@/widgets/layouts';
import { createResource, Suspense, Show, ParentProps } from 'solid-js';
import { RegisterPage } from '@/pages/register';
import { LoginPage } from '@/pages/login';
import { useMeStore } from '@/entities/me';
import { AuthGuard, CalendarIcon, FolderIcon, TabbarOption, UserIcon } from '@/shared/ui';
import { isServer } from 'solid-js/web';
import { MedicationsListPage } from '@/pages/medications_list';
import { ProfilePage } from '@/pages/profile_page';
import { MedicationAddPage } from '@/pages/medication_add';
import { MedicationEditPage } from '@/pages/medication_edit';
import { MedicationPage } from '@/pages/medication';
import { PlanningPage } from '@/pages/planning';
import { NotFoundPage } from '@/pages/not_found';
import { Scanner } from '@/features/medication_scan';

export interface AppProps {
  // Jobs that must be over before routing started
  initialJob?: () => Promise<void>;
  // Application initial URL
  initialUrl?: string;
}

export function App(props: AppProps) {
  const job = createResource(props.initialJob ?? (() => Promise.resolve()));
  const meStore = useMeStore();

  const handleBackClick = () => {
    history.back();
  };

  const tabbarOptions: TabbarOption[] = [
    {
      label: 'Лекарства',
      icon: FolderIcon,
      href: '/medications',
    },
    {
      label: 'Приём',
      icon: CalendarIcon,
      href: '/planning',
    },
    {
      label: 'Профиль',
      icon: UserIcon,
      href: '/me',
    },
  ];

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
                <NavbarLayout onBackClick={() => handleBackClick()}>{c.children}</NavbarLayout>
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
                onBackClick={() => handleBackClick()}
                currentTabBarOption={0}
                tabbarOptions={tabbarOptions}
              >
                {p.children}
              </NavTabbarLayout>
            )}
          >
            <Route path="/" component={MedicationsListPage} />
            <Route
              path="/add"
              component={() => (
                <MedicationAddPage
                  onBackClick={() => handleBackClick()}
                  afterSaveLocation="/medications"
                />
              )}
            />
            <Route
              path="/edit/:id"
              component={() => {
                const params = useParams();
                return (
                  <MedicationEditPage
                    onBackClick={() => handleBackClick()}
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
                return (
                  <MedicationPage
                    medicationId={params.id}
                    medicationEditLocation="/medications/edit"
                    medicationsLocation="/medications"
                  />
                );
              }}
            />
          </Route>

          <Route
            path="/planning"
            component={() => (
              <NavTabbarLayout
                onBackClick={() => handleBackClick()}
                currentTabBarOption={1}
                tabbarOptions={tabbarOptions}
              >
                <PlanningPage />
              </NavTabbarLayout>
            )}
          />

          <Route
            path="/me"
            component={() => (
              <NavTabbarLayout
                onBackClick={() => handleBackClick()}
                currentTabBarOption={2}
                tabbarOptions={tabbarOptions}
              >
                <ProfilePage />
              </NavTabbarLayout>
            )}
          />

          <Route
            path="/scan"
            component={() => {
              return <Scanner />;
            }}
          />

          <Route path="*" component={FullscreenFixedLayout}>
            <Route path="*" component={() => <NotFoundPage />} />
          </Route>
        </Show>
      </Suspense>
    </Router>
  );
}
