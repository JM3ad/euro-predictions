import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PageOne from 'app/pages/page_one';
import PageTwo from 'app/pages/page_two'

const App: React.FC = () => {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect != location.href) {
    history.replaceState(null, process.env.REACT_APP_BASE_URL || '', redirect);
  }

  return (
  <Router basename={process.env.REACT_APP_BASE_URL}>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page_two">Alternative Page</Link>
        </li>
      </ul>

      <hr />
      <Switch>
        <Route exact path="/">
          <PageOne />
        </Route>
        <Route path="/page_two">
          <PageTwo />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
