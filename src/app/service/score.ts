interface Game {
    time: string;
    teamA: string;
    teamB: string;
    predictions: string[];
    result: string;
  }
  
export interface Results {
    players: string[];
    games: Game[];
}

export interface Score {
    player: string;
    score: number;
}

enum Result {
    HOME_WIN,
    DRAW,
    AWAY_WIN
}

class ScoreService {
    determineResult = (prediction: string): Result => {
        const homeScore = prediction.split('-')[0];
        const awayScore = prediction.split('-')[1];
        if (homeScore == awayScore) {
            return Result.DRAW;
        }
        if (homeScore > awayScore) {
            return Result.HOME_WIN;
        }
        return Result.AWAY_WIN;
    }

    determinePointsForGame = (prediction: string, result: string): number => {
        console.log(prediction);
        console.log(result);
        if (prediction == result) {
            return 3;
        }
        if (this.determineResult(prediction) === this.determineResult(result)){
            return 1;
        }
        return 0;
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
        console.log(scores);
        return scores;
    };
}

export default ScoreService;