import React from 'react';
import ScoreService, { Results } from 'app/service/score';
import AllResults from './results';
import ScoreDisplay from './score-display';

export type PredictionsProps = {
    results: Results;
}

const PredictionsDisplay: React.FC<PredictionsProps> = (props: PredictionsProps) => {
    const results = props.results;
    const scoreService = new ScoreService();
    const scores = scoreService.determinePoints(results);
  
    return <div>
      <ScoreDisplay scores={scores} />
      <AllResults results={results} />
    </div>;
};

export default PredictionsDisplay;