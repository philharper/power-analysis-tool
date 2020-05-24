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
import PowerAnalysisUtils from './PowerAnalysisUtils';

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
        for (const acceptedFile of files) {
            const splitFileName = acceptedFile.name.split('.');
            if (splitFileName[splitFileName.length - 1] === 'gpx') {
                setData(await GpxUtils.parseGpxFile(acceptedFile));
            }
        }
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
                            <LineSeries valueField="power" argumentField="time" name={files[0]?.name.split('.')[0] || 'N/A'} />
                            <ZoomAndPan />
                            <Legend position='bottom'/>
                        </Chart>
                        <p>Average Power: {PowerAnalysisUtils.calculateAveragePower(data)}</p>
                        <p>5 Second Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 5)}</p>
                        <p>10 Second Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 10)}</p>
                        <p>30 Second Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 30)}</p>
                        <p>1 Minute Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 60)}</p>
                        <p>5 Minute Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 60 * 5)}</p>
                        <p>10 Minute Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 60 * 10)}</p>
                        <p>20 Minute Power: {PowerAnalysisUtils.calculateMaxAveragePowerByTime(data, 60 * 20)}</p>
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