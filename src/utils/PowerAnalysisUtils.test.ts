import PowerAnalysisUtils from './PowerAnalysisUtils';
import DataEntry from '../types/DataEntry';
import AverageSecondPower from '../types/AverageSecondPower';

test('getMaxPower returns max power', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(new DataEntry(new Date(), 1, 0, 0));
    dataEntries.push(new DataEntry(new Date(), 3, 0, 0));
    dataEntries.push(new DataEntry(new Date(), 2, 0, 0));

    expect(PowerAnalysisUtils.getMaxPower(dataEntries)).toBe(3);
});

test('calculateAveragePower returns average power', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(new DataEntry(new Date(), 10, 0, 0));
    dataEntries.push(new DataEntry(new Date(), 20, 0, 0));
    dataEntries.push(new DataEntry(new Date(), 30, 0, 0));

    expect(PowerAnalysisUtils.calculateAveragePower(dataEntries)).toBe(20);
});

test('calculateMaxAveragePowerByTime returns average power for ten seconds', () => {
    let averageSecondPower: AverageSecondPower[] = [
        new AverageSecondPower(615, 835),
        new AverageSecondPower(835, 886),
        new AverageSecondPower(886, 939),
        new AverageSecondPower(939, 948),
        new AverageSecondPower(948, 925),
        new AverageSecondPower(925, 861),
        new AverageSecondPower(861, 888),
        new AverageSecondPower(888, 785),
        new AverageSecondPower(785, 781),
        new AverageSecondPower(781, 724)
    ]
    expect(PowerAnalysisUtils.calculateMaxAveragePowerByTime(averageSecondPower, 10)).toBe(851);
})