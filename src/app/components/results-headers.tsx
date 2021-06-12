import React from 'react';

export type ResultsProps = {
    players: string[];
}

const ResultsHeaders: React.FC<ResultsProps> = (props: ResultsProps) => {
    const players = props.players;
    return <thead>
    <tr>
      <th>Match</th>
      <th>Time</th>
      <th>Team 1</th>
      <th>Team 2</th>
      <th>Result</th>
      {
        players.map((playerName) => {
          return <th key={playerName}>{playerName}</th>;
        })
      }
    </tr>
  </thead>;
}

export default ResultsHeaders;