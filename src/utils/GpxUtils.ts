import DataEntry from "../types/DataEntry";
import { parseString, processors } from "xml2js";
import { Ride } from "../types/Ride";
import GpxToRideConverter from "../converter/GpxToRideConverter";

export default class GpxUtils {

    static async parseGpxFile(gpxFile: File, fileNumber: number) {
        var ride
        await gpxFile.text().then((output) => {
            parseString(output, { tagNameProcessors: [ processors.stripPrefix ] }, (error, output) => {
                if (error) console.log("Error parsing GPX file");
                const converter = new GpxToRideConverter()
                ride = converter.convert(output)
            });
        });

        return ride;
    }
}