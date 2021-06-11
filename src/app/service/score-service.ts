import { Results } from "app/models/Results";
import { Score } from "app/models/Score";

enum GameResult {
    HOME_WIN,
    DRAW,
    AWAY_WIN
}

export enum PredictionResult {
    CORRECT_SCORE,
    CORRECT_RESULT,
    INCORRECT_RESULT,
    UNDETERMINED
}

class ScoreService {
    determineResult = (prediction: string): GameResult => {
        const homeScore = prediction.split('-')[0];
        const awayScore = prediction.split('-')[1];
        if (homeScore == awayScore) {
            return GameResult.DRAW;
        }
        if (homeScore > awayScore) {
            return GameResult.HOME_WIN;
        }
        return GameResult.AWAY_WIN;
    }

    determinePredictionResult = (prediction: string, result: string): PredictionResult => {
        if (!result) {
            return PredictionResult.UNDETERMINED;
        }
        if (prediction == result) {
            return PredictionResult.CORRECT_SCORE;
        }
        if (this.determineResult(prediction) === this.determineResult(result)){
            return PredictionResult.CORRECT_RESULT;
        }
        return PredictionResult.INCORRECT_RESULT;
    }

    determinePointsForGame = (prediction: string, result: string): number => {
        const predictionResult = this.determinePredictionResult(prediction, result);
        switch(predictionResult) {
            case PredictionResult.CORRECT_SCORE:
                return 3;
            case PredictionResult.CORRECT_RESULT:
                return 1;
            case PredictionResult.INCORRECT_RESULT:
            case PredictionResult.UNDETERMINED:
            default:
                return 0;
        }
    };

    determinePoints = (results: Results): Score[] => {
        const scores = results.players.map((player, index) => {
            const score = results.games.map((game) => {
                const points = this.determinePointsForGame(game.predictions[index], game.result);
                return points;
            }).reduce((sum, current) => sum + current, 0);
            return {
                player: player,
                score: score
            };
        });
        return scores;
    };
}

export default ScoreService;