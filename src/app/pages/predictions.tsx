import React, {useEffect, useState} from 'react';
import 'app/pages/Pages.css';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import PredictionsDisplay from 'app/components/predictions-display';
import { fetchResults } from 'app/service/google-sheets-service';
import { Results } from 'app/models/Results';

const PredictionsPage: React.FC = () => {
  const [results, setResults] = useState<Results>();
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const [loggedIn, setLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));

  const successGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const result = res as GoogleLoginResponse;
    if (!result) {
      return;
    }
    localStorage.setItem("token", result.accessToken);
    setToken(result.accessToken);
    setLoggedIn(true);
  };

  const logOut = () => {
    setToken("");
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      fetchResults(token).then((results) => {
        setResults(results)
      }).catch(() => {
        logOut();
        console.warn("Issue loading results, logging you out")
      })
    }
  }, [token])

  //eslint-disable-next-line
  const failGoogle = (error: any) => {
    setLoggedIn(false);
  };
  const clientId = `${process.env.REACT_APP_CLIENT_ID}`;

  return (
    <div className="App">
        {results && loggedIn
          ? <PredictionsDisplay results={results} />
          : <div className="login-wrapper">
            <GoogleLogin 
            clientId={clientId}
            buttonText="Login"
            onSuccess={successGoogle}
            onFailure={failGoogle}
            cookiePolicy={'single_host_origin'}
            scope={"https://www.googleapis.com/auth/spreadsheets.readonly"} />
          </div>
        }
    </div>
  );
}

export default PredictionsPage;
