import React from "react"
import PowerAnalysisUtils from "./PowerAnalysisUtils"
import DataEntry from "./DataEntry";

class PowerAverageProps {
    data!: DataEntry[];
}

function PowerAverages(props: PowerAverageProps) {

    const secondPowers = [5, 10, 30];
    const minutePowers = [1, 5, 10, 20];
    const data = props.data;

    return (
        <>
            <p>Max Power: {PowerAnalysisUtils.getMaxPower(data)}</p>
            <p>Average Power: {PowerAnalysisUtils.calculateAveragePower(data)}</p>
            {
                secondPowers.map((secondPower) => {
                    return <p>{secondPower} Second Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, secondPower)}</p>
                })
            }
            {
                minutePowers.map((minutePower) => {
                    return <p>{minutePower} Second Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, minutePower)}</p>
                })
            }
            <p>FTP: {(PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 60 * 20)/100) * 95}</p>
        </>
    )
}

export default PowerAverages