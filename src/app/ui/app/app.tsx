import './app.css';

import { Router, Route } from '@solidjs/router';
import { SomethingBadPage } from '@/pages/something_bad';
import { HelloPage } from '@/pages/hello';
import { FullscreenFixedLayout } from '../layouts/fullscreen_fixed/fullscreen_fixed';

export function App() {
  return (
    <Router>
      <Route path="*" component={FullscreenFixedLayout}>
        <Route path="/" component={HelloPage} />
        <Route
          path="*"
          component={() => <SomethingBadPage reason="Ресурс не найден (HTTP 404)" />}
        />
      </Route>
    </Router>
  );
}
