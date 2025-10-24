import './app.css';

import { Router, Route } from '@solidjs/router';
import { SomethingBadPage } from '@/pages/something_bad';
import { HelloPage } from '@/pages/hello';
import { FullscreenFixedLayout } from '@/widgets/layouts';
import { createResource, Suspense, Show } from 'solid-js';

export interface AppProps {
  // Jobs that must be over before routing started
  initialJob?: () => Promise<void>;
}

export function App(props: AppProps) {
  const job = createResource(props.initialJob ?? (() => Promise.resolve()));

  // TODO: add suspence (FSO-143)
  return (
    <Router>
      <Route path="*" component={FullscreenFixedLayout}>
        <Suspense>
          <Show when={job}>
            <Route path="/" component={HelloPage} />
            <Route
              path="*"
              component={() => <SomethingBadPage reason="Ресурс не найден (HTTP 404)" />}
            />
          </Show>
        </Suspense>
      </Route>
    </Router>
  );
}
