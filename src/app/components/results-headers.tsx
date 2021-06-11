import { Results } from 'app/models/Results';
import React from 'react';

export type ResultsProps = {
    results: Results;
}

const ResultsHeaders: React.FC<ResultsProps> = (props: ResultsProps) => {
    const results = props.results;
    return <thead>
    <tr>
      <th>Match</th>
      <th>Time</th>
      <th>Team 1</th>
      <th>Team 2</th>
      <th>Result</th>
      {
        results.players.map((playerName) => {
          return <th key={playerName}>{playerName}</th>;
        })
      }
    </tr>
  </thead>;
}

export default ResultsHeaders;