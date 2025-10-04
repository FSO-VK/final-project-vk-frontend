import './app.css';

import { Router, Route } from "@solidjs/router"
import HelloWorldPage from '../pages/hello_world_page/hello_world_page';
import NotFoundPage from '../pages/not_found_page/not_found_page';

function App() {
  return (
    <Router>
      <Route path="/" component={HelloWorldPage} />
      <Route path="*" component={NotFoundPage} />
    </Router>
  );
}

export default App;
