export default class DataEntry {
    time?: Date;
    power?: number;
    cadence?: number;

    constructor(time: Date, power: number, cadence: number) {
        this.time = time;
        this.power = power;
        this.cadence = cadence;
    }
}