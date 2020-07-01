import React from 'react';
import { render } from '@testing-library/react';
import PowerAnalysisUtils from './PowerAnalysisUtils';
import DataEntry from '../DataEntry';

test('getMaxPower returns max power', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(new DataEntry(new Date(), 1));
    dataEntries.push(new DataEntry(new Date(), 3));
    dataEntries.push(new DataEntry(new Date(), 2));

    expect(PowerAnalysisUtils.getMaxPower(dataEntries)).toBe(3);
});

test('calculateAveragePower returns average power', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(new DataEntry(new Date(), 10));
    dataEntries.push(new DataEntry(new Date(), 20));
    dataEntries.push(new DataEntry(new Date(), 30));

    expect(PowerAnalysisUtils.calculateAveragePower(dataEntries)).toBe(20);
});

test('calculateMaxAveragePowerByTime returns average power for ten seconds', () => {
    let dataEntries: DataEntry[] = []
    dataEntries.push(new DataEntry(new Date(), 20));  // 1
    dataEntries.push(new DataEntry(new Date(), 20));  // 2
    dataEntries.push(new DataEntry(new Date(), 20));  // 3
    dataEntries.push(new DataEntry(new Date(), 20));  // 4
    dataEntries.push(new DataEntry(new Date(), 20));  // 5
    dataEntries.push(new DataEntry(new Date(), 10));  // 6
    dataEntries.push(new DataEntry(new Date(), 10));  // 7
    dataEntries.push(new DataEntry(new Date(), 10));  // 8
    dataEntries.push(new DataEntry(new Date(), 10));  // 9
    dataEntries.push(new DataEntry(new Date(), 10));  // 10
    dataEntries.push(new DataEntry(new Date(), 1));   // 11

    expect(PowerAnalysisUtils.calculateMaxAveragePowerByTime(dataEntries, 10)).toBe(15);
})