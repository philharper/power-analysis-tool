import DataEntry from "../types/DataEntry";
import { xml2js } from "xml-js";

export default class GpxUtils {

    static async parseGpxFile(gpxFile: File, fileNumber: number) {
        let powerReadings: DataEntry[] = [];
        
        await gpxFile.text().then((output) => {
            const gpxContent = xml2js(output);
            for (const reading of gpxContent.elements[0].elements[1].elements[2].elements) {
                const time = new Date(reading.elements[1].elements[0].text);
                const power = reading.elements[2].elements[0].elements[0].text;
                
                if (power) {
                    const powerReading = new DataEntry(time, 0) 
                    if (fileNumber === 1) {
                        powerReading.power1 = parseInt(power);
                    }
                    if (fileNumber === 2) {
                        powerReading.power2 = parseInt(power);
                    }
                    powerReadings.push(powerReading);
                }
            }
        });

        return powerReadings;
    }
}