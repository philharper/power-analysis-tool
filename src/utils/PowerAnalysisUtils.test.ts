import PowerAnalysisUtils from './PowerAnalysisUtils';
import DataEntry from '../types/DataEntry';
import AverageSecondPower from '../types/AverageSecondPower';

function createDataEntry(date: Date, power: number) {
    let dataEntry = new DataEntry();
    dataEntry.time = date;
    dataEntry.power1 = power;
    return dataEntry;
}

test('getMaxPower returns max power', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(createDataEntry(new Date(), 1));
    dataEntries.push(createDataEntry(new Date(), 3));
    dataEntries.push(createDataEntry(new Date(), 2));

    expect(PowerAnalysisUtils.getMaxPower(dataEntries)).toBe(3);
});

test('calculateAveragePower returns average power', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(createDataEntry(new Date(), 10));
    dataEntries.push(createDataEntry(new Date(), 20));
    dataEntries.push(createDataEntry(new Date(), 30));

    expect(PowerAnalysisUtils.calculateAveragePower(dataEntries)).toBe(20);
});

test('calculateMaxAveragePowerByTime returns average power for ten seconds', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(createDataEntry(new Date(), 615));  // 0
    dataEntries.push(createDataEntry(new Date(), 835));  // 1
    dataEntries.push(createDataEntry(new Date(), 886));  // 2
    dataEntries.push(createDataEntry(new Date(), 939));  // 3
    dataEntries.push(createDataEntry(new Date(), 948));  // 4
    dataEntries.push(createDataEntry(new Date(), 925));  // 5
    dataEntries.push(createDataEntry(new Date(), 861));  // 6
    dataEntries.push(createDataEntry(new Date(), 888));  // 7
    dataEntries.push(createDataEntry(new Date(), 785));  // 8
    dataEntries.push(createDataEntry(new Date(), 781));  // 9
    dataEntries.push(createDataEntry(new Date(), 724));  // 10
    dataEntries.push(createDataEntry(new Date(), 673));  // 11

    let averageSecondPower: AverageSecondPower[] = [
        new AverageSecondPower(new DataEntry(new Date(), 615), new DataEntry(new Date(), 835)),
        new AverageSecondPower(new DataEntry(new Date(), 835), new DataEntry(new Date(), 886)),
        new AverageSecondPower(new DataEntry(new Date(), 886), new DataEntry(new Date(), 939)),
        new AverageSecondPower(new DataEntry(new Date(), 939), new DataEntry(new Date(), 948)),
        new AverageSecondPower(new DataEntry(new Date(), 948), new DataEntry(new Date(), 925)),
        new AverageSecondPower(new DataEntry(new Date(), 925), new DataEntry(new Date(), 861)),
        new AverageSecondPower(new DataEntry(new Date(), 861), new DataEntry(new Date(), 888)),
        new AverageSecondPower(new DataEntry(new Date(), 888), new DataEntry(new Date(), 785)),
        new AverageSecondPower(new DataEntry(new Date(), 785), new DataEntry(new Date(), 781)),
        new AverageSecondPower(new DataEntry(new Date(), 781), new DataEntry(new Date(), 724))
    ]


    expect(PowerAnalysisUtils.calculateMaxAveragePowerByTime(averageSecondPower, 10)).toBe(851);
})