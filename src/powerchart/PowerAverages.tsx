import React from "react"
import PowerAnalysisUtils from "../utils/PowerAnalysisUtils"
import DataEntry from "../types/DataEntry";
import { PowerReadingConverter } from "../converter/PowerReadingConverter";

class PowerAverageProps {
    data!: DataEntry[];
}

function PowerAverages(props: PowerAverageProps) {

    const secondPowers = [5, 10, 30];
    const minutePowers = [1, 5, 10, 20];
    const data = props.data;
    
    const averages = new PowerReadingConverter().convert(data)

    return (
        <>
            <p>Max Power: {PowerAnalysisUtils.getMaxPower(data)}</p>
            <p>Average Power: {PowerAnalysisUtils.calculateAveragePower(data)}</p>
            {
                secondPowers.map((secondPower) => {
                    return <p key={secondPower}>{secondPower} Second Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(averages, secondPower)}</p>
                })
            }
            {
                minutePowers.map((minutePower) => {
                    return <p key={minutePower}>{minutePower} Minute Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(averages, minutePower * 60)}</p>
                })
            }
            <p>FTP: {(PowerAnalysisUtils.calculateMaxAveragePowerByTime(averages, 60 * 20)/100) * 95}</p>
        </>
    )
}

export default PowerAverages