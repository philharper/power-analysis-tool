import { Ride } from "../types/Ride"
import DataEntry from "../types/DataEntry"

export default class GpxToRideConverter {

    convert(output: any): Ride {
        const power: DataEntry[] = new Array<DataEntry>()
        const cadence: DataEntry[] = new Array<DataEntry>()
        const heartRate: DataEntry[] = new Array<DataEntry>()
        for (const reading of output.gpx.trk[0].trkseg[0].trkpt) { 
            const time = new Date(reading.time)
            const extensions = reading.extensions[0]
            if (extensions !== undefined) {
                const powerReading = extensions.power[0]
                if (powerReading !== undefined) {
                    power.push(new DataEntry(time, Number(powerReading)))
                }
                const heartRateReading = extensions.hr[0]
                if (heartRateReading != undefined) {
                    heartRate.push(new DataEntry(time, Number(heartRateReading)))
                }
                const cadenceReading = extensions.cad[0]
                if (cadenceReading != undefined) {
                    cadence.push(new DataEntry(time, Number(cadenceReading)))
                }
            }
        }
        return new Ride(power, heartRate, cadence)
    }
}
