import React, {useEffect, useState} from 'react';
import 'app/pages/Pages.css';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import ScoreService, {Results, Score} from 'app/service/score';

interface SheetsResult {
  values: string[][];
}

interface PredictionsProps {
  sheet: SheetsResult;
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

const ScoreDisplay = (props: {scores: Score[]}) => {
  const scores = props.scores;
  return <table className="score-table">
      <tbody>
        <tr>
          {scores.map((score: Score, index) => {
            return <td key={index}>{score.player}</td>;
          })}
        </tr>
        <tr>
          {scores.map((score: Score, index) => {
              return <td key={index}>{score.score}</td>;
          })}          
        </tr>
      </tbody>
    </table>
}

const AllResults = (props: {sheet: SheetsResult}) => {
  return <table className="results-table">
    <tbody>
      {props.sheet.values.map((row, outerIndex) => {
        return <tr key={outerIndex}>
          {row.map((entry, index) => {
            return <td key={index}>{entry}</td>;
          })}
        </tr>
      })}
    </tbody>
  </table>;
};

const PredictionsDisplay = (props: PredictionsProps) => {
  const results = getResultsFromSheet(props.sheet);
  const scoreService = new ScoreService();
  const scores = scoreService.determinePoints(results);

  return <div>
    <ScoreDisplay scores={scores} />
    <AllResults sheet={props.sheet} />
  </div>;
};

const PageOne: React.FC = () => {
  const [sheet, setSheet] = useState<SheetsResult>();
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
          throw Error("");
        }
        return result.json();
      }).then((result) => {
        setSheet(result);
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
        {sheet
          ? <PredictionsDisplay sheet={sheet} />
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

export default PageOne;
