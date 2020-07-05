import AverageSecondPower from "./AverageSecondPower";

export class AverageRange {

    private readonly averages: AverageSecondPower[]
    readonly range: number

    constructor(averages: AverageSecondPower[], range: number) {
        this.averages = averages
        this.range = range
    }

    average() {
        return this.averages.reduce((accumulator, currentValue) => accumulator + currentValue.average, 0) / this.range
    }
}