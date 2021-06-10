import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PageOne from 'app/pages/page_one';
import PageTwo from 'app/pages/page_two';

const App: React.FC = () => {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect != location.href) {
    history.replaceState(null, process.env.REACT_APP_BASE_URL || '', redirect);
  }

  return (
  <Router basename={process.env.REACT_APP_BASE_URL}>
    <div>
      <Switch>
        <Route path="/">
          <PageOne />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
