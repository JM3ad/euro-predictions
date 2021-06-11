import React from 'react';
import { Score } from 'app/service/score';

export type ScoreProps = {
    scores: Score[];
};

const ScoreDisplay: React.FC<ScoreProps> = (props: ScoreProps) => {
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
  
export default ScoreDisplay;