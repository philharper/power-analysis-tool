import DataEntry from "../types/DataEntry";
import { PowerReadingConverter } from "./PowerReadingConverter";

test('confirm the average of two DataEntry with the power of 1 is 1', () => {
    let entryOne = new DataEntry(new Date(), 1, 0)
    let entryTwo = new DataEntry(new Date(), 1, 0)
    let dataEntries: DataEntry[] = [entryOne, entryTwo]
    let powerReadingConverter = new PowerReadingConverter()
    let averages = powerReadingConverter.convert(dataEntries)

    expect(averages.length).toBe(1)
    expect(averages[0].average).toBe(1)
});

test('confirm the average of a DataEntry with the power of 1 and an entry with 0 power is 0.5', () => {
    let entryOne = new DataEntry(new Date(), 1, 0)
    let entryTwo = new DataEntry(new Date(), 0, 0)
    let dataEntries: DataEntry[] = [entryOne, entryTwo]
    let powerReadingConverter = new PowerReadingConverter()
    let averages = powerReadingConverter.convert(dataEntries)
    expect(averages.length).toBe(1)
    expect(averages[0].average).toBe(0.5)
});


test('confirm that an array 11 DataEntry are converted to and array of 10 AverageSecondPower', () => {
    let dataEntry = new DataEntry(new Date(), 1, 0)

    let dataEntries: DataEntry[] = [dataEntry, dataEntry, dataEntry, dataEntry, dataEntry, dataEntry, dataEntry, dataEntry, dataEntry, dataEntry, dataEntry]
    let powerReadingConverter = new PowerReadingConverter()
    let averages = powerReadingConverter.convert(dataEntries)
    expect(averages.length).toBe(10)
});