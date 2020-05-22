import React, { useState } from 'react';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
  } from '@devexpress/dx-react-chart-material-ui';
import {DropzoneArea} from 'material-ui-dropzone';
import {xml2js} from 'xml-js'

function PowerChart() {

    const [data, setData] = useState([] as any);

    const uploadFile = async (acceptedFiles: File[]) => {
        let powerReadings: { time: any; power: any; }[] = [];

        for (const acceptedFile of acceptedFiles) {
            await acceptedFile.text().then((output) => {
                const gpxContent = xml2js(output);
                for (const reading of gpxContent.elements[0].elements[1].elements[2].elements) {
                    const time = reading.elements[1].elements[0].text;
                    const power = reading.elements[2].elements[0].elements[0].text;

                    const powerReading = {
                        'time' : time,
                        'power' : power
                    }

                    powerReadings.push(powerReading);
                }
            });
        }

        setData(powerReadings);
    }

    return (
        <>
            <DropzoneArea
                onChange={uploadFile}
                acceptedFiles={['.gpx']}
            />
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries valueField="power" argumentField="time" />
            </Chart>
        </>
    )
}

export default PowerChart;