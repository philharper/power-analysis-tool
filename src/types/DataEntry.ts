export default class DataEntry {
    readonly time: Date;
    readonly value: number;

    constructor(time: Date, value: number) {
        this.time = time;
        this.value = value;
    }
}