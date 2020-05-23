import React, { useState } from 'react';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    ZoomAndPan,
    Legend
  } from '@devexpress/dx-react-chart-material-ui';
import {DropzoneDialog} from 'material-ui-dropzone';
import {xml2js} from 'xml-js'
import { Button } from '@material-ui/core';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import { scaleTime } from 'd3-scale';

class DataEntry {
    time?: Date;
    power?: number;
}

function PowerChart() {

    const [data, setData] = useState([] as any);
    const [files, setFiles] = useState([] as File[]);
    const [uploadOpen, setUploadOpen] = useState(false);

    const uploadFile = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setUploadOpen(false);
    }

    const openUploadDialog = () => {
        setUploadOpen(true);
    }

    const closeUploadDialog = () => {
        setUploadOpen(false);
    }

    const generateGraph = async () => {
        let powerReadings: DataEntry[] = [];

        for (const acceptedFile of files) {
            await acceptedFile.text().then((output) => {
                const gpxContent = xml2js(output);
                for (const reading of gpxContent.elements[0].elements[1].elements[2].elements) {
                    const time = new Date(reading.elements[1].elements[0].text);
                    const power = reading.elements[2].elements[0].elements[0].text;
                    
                    if (!isNaN(power)) {
                        const powerReading = new DataEntry() 
                        powerReading.time = time;
                        powerReading.power = parseInt(power);
                        powerReadings.push(powerReading);
                        console.log(powerReading);
                    }
                }
            });
        }
        
        setData(powerReadings);
    }

    return (
        <>
            <Button onClick={openUploadDialog}>Upload File</Button>
            <Button onClick={generateGraph}>Generate Graph</Button>
            <Chart
                data={data}
                
            >
                <ArgumentScale factory={scaleTime}/>
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries valueField="power" argumentField="time" />
                <ZoomAndPan />
                <Legend />
            </Chart>
            <DropzoneDialog
                open={uploadOpen}
                onSave={uploadFile}
                acceptedFiles={['.gpx']}
                dropzoneText={''}
                onClose={closeUploadDialog}
            />
        </>
    )
}

export default PowerChart;