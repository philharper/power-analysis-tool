import DataEntry from "./DataEntry";

export default class PowerAnalysisUtils {

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
            let rangeTotalPower = 0;
            let currentPosition = i;
            while (currentPosition <= i + seconds && currentPosition < powerReadings.length) {
                rangeTotalPower += powerReadings[currentPosition].power || 0;
                currentPosition++;
            }
            const rangeAveragePower = rangeTotalPower / seconds;
            if (rangeAveragePower > maxAveragePower)
                maxAveragePower = rangeAveragePower;
        }
        return Math.floor(maxAveragePower);
    }

}