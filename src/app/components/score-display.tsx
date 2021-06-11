import { Score } from 'app/models/Score';
import React from 'react';

export type ScoreProps = {
    scores: Score[];
};

const ScoreDisplay: React.FC<ScoreProps> = (props: ScoreProps) => {
    const scores = props.scores;
    const orderedScores = scores.sort((a, b) => a.score - b.score).reverse();
    return <div className="score-table">
      <div className="table-header">
        <div className="table-entry">Scores</div>
      </div>
      {orderedScores.map((score: Score) => {
        return <div key={score.player} className="table-row">
          <div className="table-entry">{score.player}</div>
          <div className="table-entry">{score.score}</div>
        </div>;
      })}
    </div>
}
  
export default ScoreDisplay;