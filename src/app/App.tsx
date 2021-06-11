import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PredictionsPage from 'app/pages/predictions';

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
          <PredictionsPage />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
