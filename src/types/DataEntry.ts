export default class DataEntry {
    time?: Date;
    power?: number;
    cadence?: number;
    heartRate?: number;

    constructor(time: Date, power: number, cadence: number, heartRate: number) {
        this.time = time;
        this.power = power;
        this.cadence = cadence;
        this.heartRate = heartRate;
    }
}