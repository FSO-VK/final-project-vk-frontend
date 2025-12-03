import './app.css';

import { Router, Route, useParams, useSearchParams, useNavigate } from '@solidjs/router';
import { HelloPage } from '@/pages/hello';
import { FullscreenFixedLayout, NavbarLayout, NavTabbarLayout } from '@/widgets/layouts';
import { createResource, Suspense, Show, ParentProps } from 'solid-js';
import { RegisterPage } from '@/pages/register';
import { LoginPage } from '@/pages/login';
import { useMeStore } from '@/entities/me';
import {
  AuthGuard,
  CalendarIcon,
  CenteredLoaderSpinner,
  FolderIcon,
  TabbarOption,
  UserIcon,
} from '@/shared/ui';
import { isServer } from 'solid-js/web';
import { MedicationsListPage } from '@/pages/medications_list';
import { ProfilePage } from '@/pages/profile_page';
import { MedicationAddPage } from '@/pages/medication_add';
import { MedicationEditPage } from '@/pages/medication_edit';
import { MedicationPage } from '@/pages/medication';
import { NotFoundPage } from '@/pages/not_found';
import { lazy } from 'solid-js';
import { LlmAssistantPage } from '@/pages/llm_assistant';
import { SchedulePage } from '@/pages/schedule';
import { InstructionPage } from '@/pages/instruction';

const Toaster = lazy(async () => {
  const { Toaster } = await import('@/features/toaster');
  return { default: Toaster };
});

export interface AppProps {
  // Jobs that must be over before routing started
  initialJob?: () => Promise<void>;
  // Application initial URL
  initialUrl?: string;
}

export function App(props: AppProps) {
  const jobData = createResource(props.initialJob ?? (() => Promise.resolve()))[0];
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

  return (
    <>
      <Router url={isServer ? props.initialUrl : ''}>
        <Suspense fallback={<CenteredLoaderSpinner />}>
          <Show when={!jobData.loading}>
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
            >
              <Route
                path="/medications/assistant/:id"
                component={() => {
                  const params = useParams();
                  return (
                    <NavbarLayout onBackClick={() => handleBackClick()}>
                      <LlmAssistantPage medicationId={params.id} />
                    </NavbarLayout>
                  );
                }}
              />

              <Route
                path="/medications/instruction/:id"
                component={() => {
                  const params = useParams();
                  return (
                    <NavbarLayout onBackClick={() => handleBackClick()}>
                      <InstructionPage medicationId={params.id} />
                    </NavbarLayout>
                  );
                }}
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
                <Route
                  path="/"
                  component={() => {
                    const navigate = useNavigate();
                    return (
                      <MedicationsListPage
                        onScanned={(result) => {
                          navigate(`/medications/add?data=${encodeURIComponent(result)}`);
                        }}
                      />
                    );
                  }}
                />
                <Route
                  path="/add"
                  component={() => {
                    const rawData = useSearchParams()[0].data;
                    const data = rawData instanceof Array ? rawData[0] : rawData;

                    return (
                      <MedicationAddPage
                        onBackClick={() => handleBackClick()}
                        afterSaveLocation="/medications"
                        initialDataMatrix={data}
                      />
                    );
                  }}
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
                        instructionViewLocation={`/medications/instruction/${params.id}`}
                        assistantAskLocation={`/medications/assistant/${params.id}`}
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
                    <SchedulePage />
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
            </Route>

            <Route path="*" component={FullscreenFixedLayout}>
              <Route path="*" component={() => <NotFoundPage />} />
            </Route>
          </Show>
        </Suspense>
      </Router>
      <Show when={!import.meta.env.SSR}>
        <Toaster />
      </Show>
    </>
  );
}
