import React from 'react';
import ScoreService, { PredictionResult, Results } from 'app/service/score';

export type ResultsProps = {
    results: Results;
}

const AllResults: React.FC<ResultsProps> = (props: {results: Results}) => {
    const results = props.results;
    const getPredictionClassName = (prediction: string, result: string) => {
      const scoreService = new ScoreService();
      const predictionResult = scoreService.determinePredictionResult(prediction, result);
      switch(predictionResult) {
        case PredictionResult.CORRECT_SCORE:
          return "correct-score";
        case PredictionResult.CORRECT_RESULT:
          return "correct-result";
        case PredictionResult.INCORRECT_RESULT:
          return "incorrect-result";
        case PredictionResult.UNDETERMINED:
          return "";
      }
    }
  
    return <table className="results-table">
      <thead>
        <tr>
          <th>
            Round
          </th>
          <th>
            Time
          </th>
          <th>
            Team 1
          </th>
          <th>
            Team 2
          </th>
          <th>
            Score
          </th>
          {
            results.players.map((playerName) => {
              return <th key={playerName}>{playerName}</th>;
            })
          }
        </tr>
      </thead>
      <tbody>
        {props.results.games.map((game, outerIndex) => {
          return <tr key={outerIndex}>
            <td>
              {game.round}
            </td>
            <td>
              {game.time}
            </td>
            <td>
              {game.teamA}
            </td>
            <td>
              {game.teamB}
            </td>
            <td>
              {game.result}
            </td>
            {game.predictions.map((entry, index) => {
              return <td key={index} className={getPredictionClassName(entry, game.result)}>
                {entry}
              </td>;
            })}
          </tr>
        })}
      </tbody>
    </table>;
  };
  
export default AllResults;  