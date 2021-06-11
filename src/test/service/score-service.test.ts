import ScoreService from "app/service/score-service"

describe("Score service", () => {
    it.each`
        prediction | result  | points
        ${"1-1"}   | ${"1-1"}| ${3}
        ${"2-1"}   | ${"1-2"}| ${0}
        ${"2-1"}   | ${"1-0"}| ${1}
        ${"2-2"}   | ${"0-0"}| ${1}
        ${"0-1"}   | ${"1-3"}| ${1}
    `("Correctly assigns $points points for prediction $prediction for result $result", ({prediction, result, points}) => {
        const pointsScored = new ScoreService()
            .determinePointsForGame(prediction, result);
        expect(pointsScored).toBe(points);
    })
})
