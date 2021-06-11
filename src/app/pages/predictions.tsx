import React, {useEffect, useState} from 'react';
import 'app/pages/Pages.css';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import {Results} from 'app/service/score';
import PredictionsDisplay from 'app/components/predictions-display';

interface SheetsResult {
  values: string[][];
}

const getResultsFromSheet: (sheet: SheetsResult) => Results = (sheet: SheetsResult) => {
  const players = sheet.values[0].slice(5);
  const games = sheet.values.slice(1).map((row) => {
    const game = {
      round: row[0],
      time: row[1],
      teamA: row[2],
      teamB: row[3],
      result: row[4],
      predictions: row.slice(5),
    };
    return game;
  });
  return {
    players: players,
    games: games
  }
};


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
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}/values/Sheet1!A1:K20?access_token=${token}`).then((result) => {
        if (!result.ok) {
          logOut();
          return null;
        }
        return result.json();
      }).then((result) => {
        const parsedResults = getResultsFromSheet(result);
        setResults(parsedResults);
      });
    }
  }, [token])

  //eslint-disable-next-line
  const failGoogle = (error: any) => {
    setLoggedIn(false);
  };
  const clientId = `${process.env.REACT_APP_CLIENT_ID}`;

  return (
    <div className="App">
      <div>
        {results
          ? <PredictionsDisplay results={results} />
          : null
        }
      </div>
      {
        !loggedIn
        ? <GoogleLogin 
        clientId={clientId}
        buttonText="Login"
        onSuccess={successGoogle}
        onFailure={failGoogle}
        cookiePolicy={'single_host_origin'}
        scope={"https://www.googleapis.com/auth/spreadsheets.readonly"} />
        : null
      }
    </div>
  );
}

export default PredictionsPage;
