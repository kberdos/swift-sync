import * as React from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../nightsky.scss';
import { google } from "googleapis";

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

const renderOrganizerPage = () => {

    return(
                <div>
                    <div className="relative">
                        <div id="stars-container">
                            <div id="stars"></div>
                            <div id="stars2"></div>
                            <div id="stars3"></div>
                        </div>
                    </div>
                </div>
            )}
export default renderOrganizerPage

// export default function confirmation(){
//     return(
//         <div>
//             <div className="relative">
//                 <div id="stars-container">
//                     <div id="stars"></div>
//                     <div id="stars2"></div>
//                     <div id="stars3"></div>
//                 </div>
//             </div>
//         </div>
//     )}