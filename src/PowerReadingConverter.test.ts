import DataEntry from "./types/DataEntry";
import { PowerReadingConverter } from "./PowerReadingConverter";
"./utils/SecondPower";

test('confirm the average of two DataEntry with the power of 1 is 1', () => {
    var entryOne = new DataEntry()
    entryOne.power1 = 1
    var entryTwo = new DataEntry()
    entryTwo.power1 = 1
    let dataEntries: DataEntry[] = [entryOne, entryTwo]

    var powerReadingConverter = new PowerReadingConverter()
    var averages = powerReadingConverter.convert(dataEntries)

    expect(averages.length).toBe(1)
    expect(averages[0].average).toBe(1)
});


test('confirm the average of a DataEntry with the power of 1 and an entry with no power is 0.5', () => {
    var entryOne = new DataEntry()
    entryOne.power1 = 1
    var entryTwo = new DataEntry()
    let dataEntries: DataEntry[] = [entryOne, entryTwo]

    var powerReadingConverter = new PowerReadingConverter()
    var averages = powerReadingConverter.convert(dataEntries)

    expect(averages.length).toBe(1)
    expect(averages[0].average).toBe(0.5)
});