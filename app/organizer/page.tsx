"use client"
import * as React from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../nightsky.scss';
import { google } from "googleapis";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';


// page for creating the meeting information

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

function Label({
    componentName,
    valueType,
}: {
    componentName: string;
    valueType: string;
}) {
    const content = (
        <span>
            <strong>{componentName}</strong>
        </span>
    );
    return content;
}


export default function renderOrganizerPage() {

    return (
        <div>
            <div className="relative">

                <div id="stars-container">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                <div className="absolute h-screen w-screen top-0 center-0 p-8">
                    <div className="h-full flex justify-center">
                        <div>
                            <text className={anek_odia.className + " text-white text-5xl text-center"}> SwiftSync </text>
                            <div className="flex flex-col bg-white center justify-center rounded-md">
                                <text className={anek_odia.className + "text-white m-4 justify-center center"}>Welcome to SwiftSync!</text>
                                <Box
                                    className="input box"
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    textAlign='center'
                                >
                                    <Textfield id="outlined-basic" label="Name of Event" variant="outlined" />
                                </Box>
                                <Box
                                    className="input box"
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    textAlign='center'
                                >
                                    <Textfield id="outlined-basic" label="Description" variant="outlined" />
                                </Box>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem
                                        label={<Label componentName="Start Date" valueType="date" />}>
                                        <DatePicker sx={{
                                            marginLeft: '10px',
                                        }} />
                                    </DemoItem>

                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label={<Label componentName="End Date" valueType="date" />}>
                                        <DatePicker />
                                    </DemoItem>

                                </LocalizationProvider>

                                <Box
                                    className="input box"
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    textAlign='center'
                                >
                                    <Textfield id="outlined-basic" label="Meeting Length (in minutes)" variant="outlined" inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }} />
                                </Box>

                                <Box
                                    className="input box"
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    textAlign='center'
                                >
                                    <Textfield id="outlined-basic" label="Members" variant="outlined" />
                                </Box>
                            </div>
                        </div >
                    </div >
                </div>
            </div>
        </div >)

}