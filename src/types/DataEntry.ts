export default class DataEntry {
    readonly time: Date;
    readonly power: number;
    readonly cadence: number;
    readonly heartRate: number;

    constructor(time: Date, power: number, cadence: number, heartRate: number) {
        this.time = time;
        this.power = power;
        this.cadence = cadence;
        this.heartRate = heartRate;
    }
}