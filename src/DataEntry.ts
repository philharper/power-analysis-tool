export default class DataEntry {
    time?: Date;
    power1?: number;
    power2?: number;

    constructor(time: Date, power1: number) {
        this.time = time;
        this.power1 = power1;
    }
}