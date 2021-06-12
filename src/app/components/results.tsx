import React from 'react';
import ScoreService, { PredictionResult } from 'app/service/score-service';
import ResultsHeaders from './results-headers';
import { Results } from 'app/models/Results';
import { Game } from 'app/models/Game';
import { groupBy } from 'lodash';

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
    <td>{game.description}</td>
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
    const gamesGroupedByStage = groupBy(results.games, (game: Game) => game.stage);

    return <div className="table-wrapper">
      {
        Object.entries(gamesGroupedByStage).map((entry: [stage: string, games: Game[]]) => {
          const stage = entry[0];
          const games = entry[1];
          const aGameHasBeenPlayed = games.some((game) => game.result);
          const allGamesHaveBeenPlayed = games.every((game) => game.result);

          return <details key={stage} open={aGameHasBeenPlayed && !allGamesHaveBeenPlayed}>
            <summary>{stage}</summary>
            <table className="results-table">
              <ResultsHeaders players={results.players}/>
              <tbody>
                {games.map((game, outerIndex) => {
                  return <tr key={outerIndex}>
                    <GameRow game={game} />
                  </tr>
                })}
              </tbody>
            </table>
          </details>
        })
      }
    </div>;
  };
  
export default AllResults;  