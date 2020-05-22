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
import { Button } from '@material-ui/core';

function PowerChart() {

    const [data, setData] = useState([] as any);
    const [files, setFiles] = useState([] as File[]);

    const uploadFile = async (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }

    const generateGraph = async () => {
        let powerReadings: { 
            time: number; 
            power: number;
        }[] = [];

        for (const acceptedFile of files) {
            await acceptedFile.text().then((output) => {
                const gpxContent = xml2js(output);
                let i = 0;
                for (const reading of gpxContent.elements[0].elements[1].elements[2].elements) {
                    const time = reading.elements[1].elements[0].text;
                    const power = reading.elements[2].elements[0].elements[0].text;
                    
                    if (!isNaN(power)) {
                        i++;
                        const powerReading = {
                            time : i,
                            power : parseInt(power)
                        }

                        powerReadings.push(powerReading);
                    }
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
            <Button onClick={generateGraph}>Compare</Button>
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