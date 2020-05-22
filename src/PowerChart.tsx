import React, { useState } from 'react';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    ZoomAndPan
  } from '@devexpress/dx-react-chart-material-ui';
import {DropzoneArea} from 'material-ui-dropzone';
import {xml2js} from 'xml-js'

function PowerChart() {

    const [data, setData] = useState([] as any);

    const uploadFile = async (acceptedFiles: File[]) => {
        let powerReadings: { time: number; power: number; }[] = [];

        for (const acceptedFile of acceptedFiles) {
            await acceptedFile.text().then((output) => {
                const gpxContent = xml2js(output);
                let i = 0;
                for (const reading of gpxContent.elements[0].elements[1].elements[2].elements) {
                    const time = reading.elements[1].elements[0].text;
                    const power = reading.elements[2].elements[0].elements[0].text;

                    i++;
                    const powerReading = {
                        'time' : i,
                        'power' : parseInt(power)
                    }

                    console.log(powerReading);
                    
                    if (!isNaN(powerReading.power))
                        powerReadings.push(powerReading);
                }
            });
        }

        setData(powerReadings);
    }

    return (
        <>
            <div style={{height: 300, width: 300}}>
                <DropzoneArea
                    onChange={uploadFile}
                    acceptedFiles={['.gpx']}
                    dropzoneText={''}
                />
            </div>
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries valueField="power" argumentField="time" />
                <ZoomAndPan />
            </Chart>
        </>
    )
}

export default PowerChart;