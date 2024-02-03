import * as React from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../nightsky.scss';
import { google } from "googleapis";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// page for creating the meeting information

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

async function getUserCalendarEvents() {
    const userAccessToken = "YOUR_ACCESS_TOKEN_HERE"; // Replace with the actual access token
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: userAccessToken });
    const calendar = google.calendar({ version: "v3", auth });
    const timeMin = new Date().toISOString();
    const calendarId = "primary";
    try {
        const response = await calendar.events.list({
            calendarId: calendarId,
            timeMin: timeMin,
            maxResults: 10,
        });
        const events = response.data.items;
        console.log(events);
    } catch (error) {
        console.error();
    }
}

// getUserCalendarEvents();

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
                                {/* <text className={anek_odia.className + "text-white ml-4"}>Description:</text> */}
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
                                {/* <text className={anek_odia.className + "text-white ml-4"}>Dates:</text> */}
                                {/* need start date and end date */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>


                                </LocalizationProvider>



                                {/* <text className={anek_odia.className + "text-white ml-4"}>Meeting Length:</text> */}
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
                                    <Textfield id="outlined-basic" label="Meeting Length" variant="outlined" />
                                </Box>
                                {/* <text className={anek_odia.className + "text-white ml-4"}>Members:</text> */}
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