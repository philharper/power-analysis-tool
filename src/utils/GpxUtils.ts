import DataEntry from "../types/DataEntry";
import { parseString, processors } from "xml2js";

export default class GpxUtils {

    static async parseGpxFile(gpxFile: File, fileNumber: number) {
        let powerReadings: DataEntry[] = [];
        await gpxFile.text().then((output) => {
            parseString(output, { tagNameProcessors: [ processors.stripPrefix ] }, (error, output) => {
                if (error) console.log("Error parsing GPX file");
                GpxUtils.convertGpxToDataEntryArray(output, powerReadings);
            });
        });

        return powerReadings;
    }

    private static convertGpxToDataEntryArray(output: any, powerReadings: DataEntry[]) {
        for (const reading of output.gpx.trk[0].trkseg[0].trkpt) {
            try {
                const time = new Date(reading.time);
                const power = Number(reading.extensions[0].power[0]);
                const cadence = Number(reading.extensions[0].TrackPointExtension[0].cad[0]);
                const heartRate = Number(reading.extensions[0].TrackPointExtension[0].hr[0]);

                if (power && cadence && heartRate) {
                    const powerReading = new DataEntry(time, power, cadence, heartRate);
                    powerReadings.push(powerReading);
                }
            }
            catch {
                console.log('Error extracting data from GPX');
            }
        }
    }
}