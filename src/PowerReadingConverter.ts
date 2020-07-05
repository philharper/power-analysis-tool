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
        return dataEntries.reduce(function(second: AverageSecondPower[], currentValue: DataEntry, currentIndex: number, array: DataEntry[]) {
            var nextIndex = currentIndex + 1
            if (nextIndex < array.length) {
                second.push(new AverageSecondPower(currentValue, array[nextIndex]))
            }
            return second;
        }, new Array<AverageSecondPower>())
    }
}