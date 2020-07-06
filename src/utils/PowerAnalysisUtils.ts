import DataEntry from "../types/DataEntry";

export default class PowerAnalysisUtils {

    static getMaxPower(powerReadings: DataEntry[]) {
        let maxPower = 0;

        for (const dataEntry of powerReadings) {
            const power = dataEntry.power || 0;
            if (power > maxPower) {
                maxPower = power;
            }
        }

        return maxPower;
    }

    static calculateAveragePower(powerReadings: DataEntry[]) {
        let totalPower = 0;

        for (const dataEntry of powerReadings) {
            totalPower += dataEntry.power || 0;
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

        while (currentPosition <= rangeStart + rangeLength && currentPosition + 1 < powerReadings.length) {
            const readingOne = powerReadings[currentPosition].power || 0;
            const readingTwo = powerReadings[currentPosition + 1].power || 0;
            rangeTotalPower += (readingOne + readingTwo) / 2;
            currentPosition++;
        }

        return rangeTotalPower;
    }
}