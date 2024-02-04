import * as React from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../nightsky.scss';
import { google } from "googleapis";
import Planet from "../../public/images/planet.png";
import Image from "next/image";

// page for creating the meeting information

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

export default function renderSyncPage() {

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
                        <text className={anek_odia.className + " text-white text-5xl"}> SwiftSync </text>
                    </div>
                    <div className="h-full flex flex-col item-center justify-center">
                        <div>
                            <text className="text-white text-6xl"> Syncing your calendar... </text>
                        </div>
                        {/* <img src="../../public/images/planet.png" className="object-contain" /> */}
                        <Image src={Planet} width={20} height={20} alt="peepe" />
                    </div >
                </div>
            </div>
        </div >)

}