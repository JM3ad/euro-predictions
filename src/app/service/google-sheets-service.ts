import { Results } from "app/models/Results";

interface SheetsResult {
    values: string[][];
}

const getResultsFromSheet: (sheet: SheetsResult) => Results = (sheet: SheetsResult) => {
    const players = sheet.values[0].slice(5);
    const games = sheet.values.slice(1).map((row) => {
      const game = {
        round: row[0],
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
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}/values/Sheet1!A1:K20`;
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