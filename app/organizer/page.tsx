"use client"
import * as React from "react";
import { useState, useEffect } from "react";
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
import Grid from '@mui/material/Grid';
import Image from "next/image";
import Astronaut from "../../public/images/astronaut.png";
import { updateName, userDocument, createDocument } from "@/util/userFunctions";
import authService from "@/services/auth";
import { Session } from "@supabase/supabase-js";


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

// const myEventName = () => {
//     const [eventName, setEventName] = React.useState('');
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setEventName(event.target.value);
//     };
// };

// const MyDescription = () => {
//     const [description, setDescription] = React.useState('');
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setDescription(event.target.value);
//     };
// };

const [eventName, setEventName] = React.useState('');

const startDate = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
}

const handleDateChange = (date: Date | null) => {
    setStartDate(date);
};


export default function renderOrganizerPage() {

    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    const getCurrentSession = async () => {
        authService.getCurrentSession().then((session): any => {
            setSession(session);
            if (session) {
                console.log("got the session. good job bud!")
                userDocument({ uid: session.user.id, email: session.user.email! }).then(() => {
                    setSessionLoading(false);
                })
            }
        });
    }

    useEffect(() => {
        getCurrentSession();
    }, []);

    return (
        <div>
            <div className="relative">
                <div id="stars-container">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                <div className="absolute h-screen w-screen top-0 center-0 p-8 text-center items-center">
                    <div>
                        <div className={anek_odia.className + " text-white text-5xl"}> SwiftSync </div>
                    </div>
                    <div className="h-3/4 flex justify-center m-5">
                        <div className="grid grid-cols-2">
                            <div className="flex flex-col bg-white rounded-md mr-5 items-center">
                                <div className="mt-8">
                                    <div className={anek_odia.className + "text-gray-800 text-xl mx-4 center"}>Welcome to SwiftSync! Get started creating your event.</div>
                                </div>
                                <div className="w-1/2">
                                    <Box
                                        className="input box"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { mt: 2, width: 500, maxWidth: '100%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Textfield id="outlined-basic" label="Name of Event" variant="outlined"
                                            value={eventName} value={eventName}
                                            onChange={(event) => {
                                                // event.target.value contains the new value of the Textfield
                                                setEventName(event.target.value);
                                                console.log(event.target.value);
                                            }} />
                                    </Box>

                                    <Box
                                        className="input box"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { mt: 2, width: 500, maxWidth: '100%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Textfield id="outlined-basic" label="Description" variant="outlined"
                                            onChange={(event) => {
                                                // event.target.value contains the new value of the Textfield
                                                console.log(event.target.value);
                                            }} />
                                    </Box>

                                    <Box
                                        className="input box"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { mt: 2, width: 500, maxWidth: '100%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Textfield
                                            id="outlined-number"
                                            label="Meeting Length (in minutes)"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Box>

                                    <div className="text-center text-md">Start Date</div>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            className="w-full"
                                            sx={{
                                                '& > :not(style)': { width: 500, maxWidth: '100%' },
                                            }}
                                            value={startDate}
                                            onChange={handleDateChange}
                                        />

                                    </LocalizationProvider>

                                    <div className="text-center text-md">End Date</div>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            className="w-full"
                                            sx={{
                                                '& > :not(style)': { width: 500, maxWidth: '100%' },
                                            }} />
                                    </LocalizationProvider>


                                </div>
                            </div>

                            <div className="flex flex-col bg-white rounded-md ml-5 items-center">
                                <div className="mt-8">
                                    <div className={anek_odia.className + "text-gray-800 text-xl mx-4 center"}>Invite People to Your Event:</div>
                                </div>
                                <Box
                                    className="input box"
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { mt: 2, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Textfield id="outlined-basic" label="Members" variant="outlined" />
                                </Box>

                                <div className="flex items-center mt-5">
                                    <Image src={Astronaut} width={50} height={50} alt="Astronaut" className="m-2" />
                                    <div className="text-left text-xl m-3 h-15">Megan Ball<br />megan_ball@brown.edu</div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="flex items-center justify-center m-10">
                        <button className="text-gray-800 text-3xl cursor-pointer bg-[#E1DFDF] w-[150px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]"
                            onClick={() => createDocument()} >Submit</button>

                    </div>
                </div>
            </div>
        </div >)

}