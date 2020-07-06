import DataEntry from "../types/DataEntry";
import { AverageRange } from "../types/AverageRange";
import AverageSecondPower from "../types/AverageSecondPower";


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

    static calculateMaxAveragePowerByTime(powerReadings: AverageSecondPower[], seconds: number) {
        let maxAveragePower = 0;
        for (let i = 0; i < powerReadings.length; i++) {
            const averageRange = new AverageRange(powerReadings.slice(i, i + seconds), seconds)
            const rangeAveragePower = averageRange.average();
            if (rangeAveragePower > maxAveragePower)
                maxAveragePower = rangeAveragePower;
        }
        return Math.floor(maxAveragePower);
    }
}