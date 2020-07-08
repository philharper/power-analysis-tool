import DataEntry from "./DataEntry";
import Plottable from "./Plottable";

export class Ride implements Plottable {
    readonly power: DataEntry[]
    readonly heartRate: DataEntry[]
    readonly cadence: DataEntry[]
    
    constructor(power: DataEntry[], heartRate: DataEntry[], cadence: DataEntry[]) {
        this.power = power
        this.heartRate = heartRate
        this.cadence = cadence
    }

    plottables(): Map<string, DataEntry[]> {
        const plottables = new Map()
        plottables.set("power", this.power)
        plottables.set("Heart Rate", this.heartRate)
        plottables.set("Cadence", this.cadence)
        return plottables
    }
}
