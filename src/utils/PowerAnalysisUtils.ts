import DataEntry from "../DataEntry";
import AverageSecondPower from "./SecondPower";

export default class PowerAnalysisUtils {

    static getMaxPower(powerReadings: DataEntry[]) {
        let maxPower = 0;

        for (const dataEntry of powerReadings) {
            const power = dataEntry.power1 || 0;
            if (power > maxPower) {
                maxPower = power;
            }
        }

        return maxPower;
    }

    static calculateAveragePower(powerReadings: DataEntry[]) {
        let totalPower = 0;

        for (const dataEntry of powerReadings) {
            totalPower += dataEntry.power1 || 0;
        }
        
        return Math.floor(totalPower / powerReadings.length);
    }

    static calculateMaxAveragePowerByTime(powerReadings: DataEntry[], seconds: number) {
        let maxAveragePower = 0;
        for (let i = 0; i < powerReadings.length; i++) {
            let rangeTotalPower = this.getRangeTotalPower(i, seconds, powerReadings);

            const rangeAveragePower = rangeTotalPower / seconds;
            if (rangeAveragePower > maxAveragePower)
                maxAveragePower = rangeAveragePower;
        }

        return Math.floor(maxAveragePower);
    }


    private static getRangeTotalPower(rangeStart: number, rangeLength: number, powerReadings: DataEntry[]) {
        let rangeTotalPower = 0;
        let currentPosition = rangeStart;
        rangeLength--;

        while (currentPosition <= rangeStart + rangeLength && currentPosition < powerReadings.length) {
            rangeTotalPower += powerReadings[currentPosition].power1 || 0;
            currentPosition++;
        }

        return rangeTotalPower;
    }

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
    static convertPowerReadingsToSecondData(readings: DataEntry[]): AverageSecondPower[] {
        return readings.reduce(function(second: AverageSecondPower[], currentValue: DataEntry, currentIndex: number, array: DataEntry[]) {
            var nextIndex = currentIndex + 1
            if (nextIndex < array.length) {
                second.push(new AverageSecondPower(currentValue, array[nextIndex]))
            }
            return second;
        }, new Array<AverageSecondPower>())
    }
}