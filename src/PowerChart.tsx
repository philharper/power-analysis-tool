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
import {DropzoneDialog} from 'material-ui-dropzone';
import { Button } from '@material-ui/core';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import { scaleTime } from 'd3-scale';
import DataEntry from './DataEntry';
import GpxUtils from './GpxUtils';
import PowerAverages from './PowerAverages';

function PowerChart() {

    const [data, setData] = useState([] as DataEntry[]);
    const [files, setFiles] = useState([] as File[]);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [displayGraph, setDisplayGraph] = useState(false);

    const uploadFile = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setUploadOpen(false);
    }

    const generateGraph = async () => {
        let generatedData: React.SetStateAction<DataEntry[]> = [];
        for (let i = 0; i < files.length; i++) {
            const acceptedFile = files[i];
            console.log(acceptedFile);
            const splitFileName = acceptedFile.name.split('.');
            if (splitFileName[splitFileName.length - 1] === 'gpx') {
                generatedData = generatedData.concat(await GpxUtils.parseGpxFile(acceptedFile, i + 1, i * 100));
            }
        }

        setData(generatedData);
        setDisplayGraph(true);
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
                            <LineSeries valueField="power" argumentField="time" />
                            <LineSeries valueField="power2" argumentField="time" />
                            <ZoomAndPan />
                            <Legend position='bottom'/>
                        </Chart>
                        <PowerAverages data={data} />
                    </>
            }
            
            <DropzoneDialog
                open={uploadOpen}
                onSave={uploadFile}
                acceptedFiles={['.gpx']}
                dropzoneText={''}
                onClose={() => setUploadOpen(false)}
                maxFileSize={5000000}
            />
        </>
    )
}

export default PowerChart;