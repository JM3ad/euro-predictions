import React from 'react';
import ScoreService from 'app/service/score-service';
import AllResults from './results';
import ScoreDisplay from './score-display';
import { Results } from 'app/models/Results';

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