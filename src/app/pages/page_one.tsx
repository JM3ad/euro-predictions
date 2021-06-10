import React, {useState} from 'react';
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
  const players = sheet.values[0].slice(4, 7);
  const games = sheet.values.slice(1).map((row) => {
    const game = {
      round: row[0],
      time: row[1],
      teamA: row[2],
      teamB: row[3],
      predictions: row.slice(4,7),
      result: row[7]
    };
    console.log(game);
    return game;
  });
  return {
    players: players,
    games: games
  }
};

const PredictionsDisplay = (props: PredictionsProps) => {
  const results = getResultsFromSheet(props.sheet);
  const scoreService = new ScoreService();
  const scores = scoreService.determinePoints(results);

  return <div>
    <table>
      <tbody>
        {props.sheet.values.map((row, outerIndex) => {
          return <tr key={outerIndex}>
            {row.map((entry, index) => {
              return <td key={index}>{entry}</td>;
            })}
          </tr>
        })}
      </tbody>
    </table>
    <table>
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
  </div>;
};

const PageOne: React.FC = () => {

  // Store token in localstorage
  // ?
  const [sheet, setSheet] = useState<SheetsResult>();

  const responseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const result = res as GoogleLoginResponse;
    if (!result) {
      return;
    }
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}/values/Sheet1!A1:H20?access_token=${result.accessToken}`).then((result) => {
      return result.json();
    }).then((result) => {
      setSheet(result);
    });
  };
  const failGoogle = (error: any) => {
    console.log("Fail");
    console.log(error);
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
      <GoogleLogin 
        clientId={clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={failGoogle}
        cookiePolicy={'single_host_origin'}
        scope={"https://www.googleapis.com/auth/spreadsheets.readonly"} />
    </div>
  );
}

export default PageOne;
