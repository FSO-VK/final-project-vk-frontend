import './app.css';

import { Router, Route } from '@solidjs/router';
import { SomethingBadPage } from '@/pages/something_bad';
import { HelloPage } from '@/pages/hello';

export function App() {
  return (
    <Router>
      <Route path="/" component={HelloPage} />
      <Route path="*" component={() => <SomethingBadPage reason="Ресурс не найден (HTTP 404)" />} />
    </Router>
  );
}
