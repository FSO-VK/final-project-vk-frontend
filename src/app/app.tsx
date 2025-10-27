import './app.css';

import { Router, Route } from '@solidjs/router';
import { SomethingBadPage } from '@/pages/something_bad';
import { HelloPage } from '@/pages/hello';
import { FullscreenFixedLayout, NavbarLayout, NavTabbarLayout } from '@/widgets/layouts';
import { createResource, Suspense, Show } from 'solid-js';
import { RegisterPage } from '@/pages/register';
import { LoginPage } from '@/pages/login';

export interface AppProps {
  // Jobs that must be over before routing started
  initialJob?: () => Promise<void>;
}

export function App(props: AppProps) {
  const job = createResource(props.initialJob ?? (() => Promise.resolve()));

  // TODO: add suspence (FSO-143)
  return (
    <Router>
      <Suspense>
        <Show when={job}>
          <Route path="/" component={FullscreenFixedLayout}>
            <Route path="/" component={HelloPage} />
          </Route>

          <Route
            path="/"
            component={(c) => (
              <NavbarLayout navBarTitle="Привет" navBarBackLocation="/">
                {c.children}
              </NavbarLayout>
            )}
          >
            <Route path="/register" component={() => <RegisterPage loginLocation="/login" />} />
            <Route path="/login" component={() => <LoginPage registerLocation="/register" />} />
          </Route>

          <Route
            path="/medications"
            component={(c) => (
              <NavTabbarLayout
                navBarTitle="Препараты"
                navBarBackLocation="/"
                currentTabBarOption={0}
              >
                <div>Это страница препаратов</div>
                {c.children}
              </NavTabbarLayout>
            )}
          />

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
            component={(c) => (
              <NavTabbarLayout navBarTitle="Профиль" navBarBackLocation="/" currentTabBarOption={2}>
                <div>Это страница профиля</div>
                {c.children}
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
