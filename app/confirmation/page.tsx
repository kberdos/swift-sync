import * as React from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../nightsky.scss';
import { google } from "googleapis";
import Rocket from "../../public/images/rocket.png";
import Image from "next/image";

// page for creating the meeting information

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});


const renderOrganizerPage = () => {

    return (
        <div>

            <div className="relative">
                <div id="stars-container">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                <div className="absolute h-screen w-screen top-0 center-0 p-8 text-center">
                    <div>
                        <div className={anek_odia.className + " text-white text-5xl"}> SwiftSync </div>
                    </div>
                    <div className="h-full flex flex-col items-center justify-center">
                        <div>
                            <div className="text-white text-6xl"> Thank you! </div>
                        </div>
                        <div>
                            <Image src={Rocket} width={200} height={200} alt="Rocket" className="py-6" />
                        </div>
                        <div>
                            <div className="text-white text-3xl items-self max-w-prose">We will schedule a Google Calender meeting once everyone has logged in and the organizer has chosen a time.</div>
                        </div>
                    </div >
                </div>
            </div>
        </div >)
}
export default renderOrganizerPage