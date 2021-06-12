import { Results } from "app/models/Results";

interface SheetsResult {
    values: string[][];
}

const getResultsFromSheet: (sheet: SheetsResult) => Results = (sheet: SheetsResult) => {
    const players = sheet.values[0].slice(5);
    const games = sheet.values.slice(1)
      .filter((row) => row.length >= 4)
      .map((row) => {
      const roundDescription = row[0].split('-');
      const description = roundDescription[0];
      const stage = roundDescription.length === 2 ? roundDescription[1] : roundDescription[0];

      const game = {
        stage: stage,
        description: description,
        time: row[1],
        teamA: row[2],
        teamB: row[3],
        result: row[4],
        predictions: row.slice(5),
      };
      return game;
    });
    return {
      players: players,
      games: games
    }
};

export const fetchResults = (token: string): Promise<Results> => {
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}/values/Sheet1!A1:K100`;
    return fetch(`${sheetsUrl}?access_token=${token}`).then((result) => {
        if (!result.ok) {
          throw new Error("Token expired"); 
        }
        return result.json();
      }).then((result) => {
        const parsedResults = getResultsFromSheet(result);
        return parsedResults;
    });
}