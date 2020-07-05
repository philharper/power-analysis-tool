import React, { useState } from 'react';
import {DropzoneDialog} from 'material-ui-dropzone';
import { Button } from '@material-ui/core';
import DataEntry from '../types/DataEntry';
import GpxUtils from '../utils/GpxUtils';
import PowerAverages from './PowerAverages';
import { LineChart, Line, Brush, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function PowerChart() {

    const [data, setData] = useState([] as DataEntry[]);
    const [files, setFiles] = useState([] as File[]);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [displayGraph, setDisplayGraph] = useState(false);

    let fileLoop = 0;

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

    return (
        <>
            <Button onClick={() => setUploadOpen(true)}>Upload File</Button>
            <Button onClick={generateGraph}>Generate Graph</Button>
            {
                displayGraph &&
                    <>
                        <LineChart width={1000} height={400} data={data}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="power1" stroke="#8884d8" />
                            <Brush />
                        </LineChart>
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