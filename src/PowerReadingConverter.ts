import DataEntry from "./types/DataEntry";
import AverageSecondPower from "./types/AverageSecondPower";

export class PowerReadingConverter {
   /**
     * Convert an array of DataEntry to an array contaning the average power of one second.
     * 
     * An average power of one second is calculated by taking the power at the start and end of a second in time and then calculating the 
     * average. 
     * 
     * TODO(jordan): Use the time of a DataEntry to identify a second.
     *
     * @param readings data entry readings to convert to second data
     */
    public convert(dataEntries: DataEntry[]): AverageSecondPower[] {
        return dataEntries.reduce(function(averageSecondPower, average, index, array) {
            let nextIndex = index + 1
            if (nextIndex < array.length) {
                averageSecondPower.push(new AverageSecondPower(average.power1 || 0, array[nextIndex].power1 || 0))
            }
            return averageSecondPower;
        }, new Array<AverageSecondPower>())
    }
}