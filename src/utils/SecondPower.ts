import DataEntry from "../DataEntry"

export default class SecondPower {

    private readonly start: DataEntry
    private readonly end: DataEntry
    readonly average: number

    constructor(start: DataEntry, end: DataEntry) {
        this.start = start
        this.end = end
        this.average = (this.start?.power1 || 0) + (this.end?.power2 || 0) / 2
    }
}