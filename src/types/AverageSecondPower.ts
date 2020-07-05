export default class AverageSecondPower {

    private readonly start: number
    private readonly end: number
    readonly average: number

    constructor(start: number, end: number) {
        this.start = start
        this.end = end
        this.average = (start + end) / 2
    }
}