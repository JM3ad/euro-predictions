import React from 'react';
import ScoreService, { PredictionResult } from 'app/service/score-service';
import ResultsHeaders from './results-headers';
import { Results } from 'app/models/Results';
import { Game } from 'app/models/Game';

export type ResultsProps = {
    results: Results;
}

type GameRowProps = {
  game: Game;
};

const GameRow: React.FC<GameRowProps> = (props: GameRowProps) => {
  const game = props.game;
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
  return <>
    <td>{game.round}</td>
    <td>{game.time}</td>
    <td>{game.teamA}</td>
    <td>{game.teamB}</td>
    <td>{game.result}</td>
    {game.predictions.map((entry, index) => {
      return <td key={index} className={getPredictionClassName(entry, game.result)}>
        {entry}
      </td>;
    })}
  </>;
};

const AllResults: React.FC<ResultsProps> = (props: {results: Results}) => {
    const results = props.results;

    return <div className="table-wrapper">
      <table className="results-table">
        <ResultsHeaders results={results}/>
        <tbody>
          {results.games.map((game, outerIndex) => {
            return <tr key={outerIndex}>
              <GameRow game={game} />
            </tr>
          })}
        </tbody>
      </table>
    </div>;
  };
  
export default AllResults;  