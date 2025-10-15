import './app.css';

import { Router, Route } from '@solidjs/router';
import { NotFoundPage } from '@/pages/not_found';
import { MedicationsPage } from '@/pages/medications';
import { TopBottomLayout } from '../layouts/top_bottom_layout/top_bottom_layout';
import { HelloPage } from '@/pages/hello';

export function App() {
  return (
    <Router>
      <Route path="/" component={HelloPage} />
      <Route path="*" component={NotFoundPage} />
    </Router>
  );
}
