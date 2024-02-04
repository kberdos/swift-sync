import * as React from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../nightsky.scss';
import { google } from "googleapis";
import Planet from "../../public/images/planet.png";
import Image from "next/image";

// page to show that the website is syncing

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
                <div className="absolute h-screen w-screen top-0 center-0 p-8 text-center items-center">
                    <div>
                        <text className={anek_odia.className + " text-white text-5xl"}> SwiftSync </text>
                    </div>
                    <div className="m-5">
                        <text className="text-white text-xl"> We have found the following meeting times based on your Google Calendars. Please select the time that you would like! </text>
                    </div>
                    <div className="h-1/2 flex">
                        <div className="w-1/2">
                            <div className="m-5">
                                <button className="text-gray-800 text-2xl cursor-pointer bg-white w-[300px] rounded-md h-[50px]">Time here</button>
                                <text className="text-white text-lg m-5"> 4/4 available </text>
                            </div>
                            <div className="m-5">
                                <button className="text-gray-800 text-2xl cursor-pointer bg-white w-[300px] rounded-md h-[50px]">Time here</button>
                                <text className="text-white text-lg m-5"> 4/4 available </text>
                            </div>
                            <div className="m-5">
                                <button className="text-gray-800 text-2xl cursor-pointer bg-white w-[300px] rounded-md h-[50px]">Time here</button>
                                <text className="text-white text-lg m-5"> 4/4 available </text>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="m-5">
                                <button className="text-gray-800 text-2xl cursor-pointer bg-white w-[300px] rounded-md h-[50px]">Time here</button>
                                <text className="text-white text-lg m-5"> 4/4 available </text>
                            </div>
                            <div className="m-5">
                                <button className="text-gray-800 text-2xl cursor-pointer bg-white w-[300px] rounded-md h-[50px]">Time here</button>
                                <text className="text-white text-lg m-5"> 4/4 available </text>
                            </div>
                            <div className="m-5">
                                <button className="text-gray-800 text-2xl cursor-pointer bg-white w-[300px] rounded-md h-[50px]">Time here</button>
                                <text className="text-white text-lg m-5"> 4/4 available </text>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="text-gray-800 text-xl cursor-pointer bg-[#E1DFDF] w-[200px] rounded-md h-[50px]">Submit</button>
                    </div>
                </div>
            </div>
        </div >)

}