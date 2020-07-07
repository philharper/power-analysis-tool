import React, { useState } from 'react';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    ZoomAndPan,
    Legend,
    Title
  } from '@devexpress/dx-react-chart-material-ui';
import { Plugin } from '@devexpress/dx-react-core';
import {DropzoneDialog} from 'material-ui-dropzone';
import { Button } from '@material-ui/core';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import { scaleTime } from 'd3-scale';
import DataEntry from '../types/DataEntry';
import GpxUtils from '../utils/GpxUtils';
import PowerAverages from './PowerAverages';

function PowerChart() {

    const [data, setData] = useState([] as DataEntry[]);
    const [files, setFiles] = useState([] as File[]);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [displayGraph, setDisplayGraph] = useState(false);

    const [displayPower, setDisplayPower] = useState(true);
    const [displayCadence, setDisplayCadence] = useState(true);
    const [displayHeartRate, setDisplayHeartRate] = useState(false);

    const uploadFile = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setUploadOpen(false);
    }

    const generateGraph = async () => {
        let generatedData: React.SetStateAction<DataEntry[]> = [];
        for (let i = 0; i < files.length; i++) {
            const acceptedFile = files[i];
            const splitFileName = acceptedFile.name.split('.');
            const fileType = splitFileName[splitFileName.length - 1];
            if (fileType === 'gpx') {
                const data = await GpxUtils.parseGpxFile(acceptedFile, i + 1);
                generatedData = generatedData.concat(data);
            }
            
        }

        setData(generatedData);
        setDisplayGraph(true);
    }

    const toggleLine = (display: boolean, setter: (toggle: boolean) => void) => {
        if (display) {
            setter(false);
        } else {
            setter(true);
        }
    }

    return (
        <>
            <Button onClick={() => setUploadOpen(true)}>Upload File</Button>
            <Button onClick={generateGraph}>Generate Graph</Button>
            {
                displayGraph &&
                    <>
                        <Chart
                            data={data}   
                        >
                            <Title text="Power Graph"/>
                            <ArgumentScale factory={scaleTime}/>
                            <ArgumentAxis />
                            <ValueAxis />
                            <Plugin>
                                {
                                    files.map((file: File) => {
                                        let lines = [];
                                        if (displayPower)
                                            lines.push(<LineSeries key={file.name + 'power'} valueField={'power'} argumentField="time" name={'Power'}/>);
                                        if (displayCadence)
                                            lines.push(<LineSeries key={file.name + 'cadence'} valueField={'cadence'} argumentField="time" name={'Cadence'}/>);
                                        if (displayHeartRate)
                                            lines.push(<LineSeries key={file.name + 'heartrate'} valueField={'heartRate'} argumentField="time" name={'Heart Rate'}/>);

                                        return lines;  
                                    })
                                }
                            </Plugin>
                            <ZoomAndPan />
                            <Legend position='bottom'/>
                        </Chart>
                        <Button onClick={() => toggleLine(displayPower, setDisplayPower)}>Power</Button>
                        <Button onClick={() => toggleLine(displayCadence, setDisplayCadence)}>Cadence</Button>
                        <Button onClick={() => toggleLine(displayHeartRate, setDisplayHeartRate)}>Heart Rate</Button>
                        <PowerAverages data={data} />
                    </>
            }
            
            <DropzoneDialog
                open={uploadOpen}
                onSave={uploadFile}
                acceptedFiles={['.gpx', '.fit']}
                dropzoneText={''}
                onClose={() => setUploadOpen(false)}
                maxFileSize={10000000}
            />
        </>
    )
}

export default PowerChart;