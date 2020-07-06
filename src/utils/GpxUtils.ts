import DataEntry from "../types/DataEntry";
import { parseString, processors } from "xml2js";

export default class GpxUtils {

    static async parseGpxFile(gpxFile: File, fileNumber: number) {
        let powerReadings: DataEntry[] = [];
        await gpxFile.text().then((output) => {
            parseString(output, { tagNameProcessors: [ processors.stripPrefix ] }, function(err, output) {
                if(err) throw err;

                for (const reading of output.gpx.trk[0].trkseg[0].trkpt) {

                    let time = new Date();
                    let power = 0;
                    let cadence = 0;

                    try {
                        time = new Date(reading.time);
                        power = parseInt(reading.extensions[0].power[0]);  
                        cadence = parseInt(reading.extensions[0].TrackPointExtension[0].cad[0]);

                        if (power) {
                            const powerReading = new DataEntry(time, power, cadence);
                            powerReadings.push(powerReading);
                        }
                    } catch {
                        console.log('Reading missing data');
                    }
                }
            });
        });

        return powerReadings;
    }
}