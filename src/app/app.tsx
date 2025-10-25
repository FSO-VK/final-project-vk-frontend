import './app.css';

import { Router, Route } from '@solidjs/router';
import { SomethingBadPage } from '@/pages/something_bad';
import { HelloPage } from '@/pages/hello';
import { FullscreenFixedLayout, NavbarLayout } from '@/widgets/layouts';
import { createResource, Suspense, Show } from 'solid-js';
import { RegisterPage } from '@/pages/register';

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
          </Route>

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
