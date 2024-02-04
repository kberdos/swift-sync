'use client'
import * as React from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../../nightsky.scss';
import { google } from "googleapis";
import Planet from "../../../public/images/planet.png";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { getEvent } from "@/util/userFunctions";

// page to show that the website is syncing

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

export default function renderSyncPage({ params }: { params: { eventID: string } }) {
    const [clicked, setClicked] = useState(false);
    const eventID = params.eventID;

    const [event, setEvent] = useState<any>(null);
    const [isDone, setIsDone] = useState(false);

    const loadEvent = async () => {
        getEvent(eventID).then((event) => {
            setEvent(event);
        })
    }

    useEffect(() => {
        loadEvent();
    }, [])

    useEffect(() => {
        if (event) {
            setIsDone(event.done)
            console.log(event.done)
        }
    }, [event])

    return (
        <div>
            <div className="relative">
                <div id="stars-container">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                {
                    !isDone ?
                        <div className="absolute h-screen w-screen top-0 center-0 p-8 text-center items-center">
                            <div>
                                <div className={anek_odia.className + " text-white text-5xl"}> SwiftSync </div>
                            </div>
                            <div className="m-10">
                                <div className="text-white text-2xl"> Check back when complete! </div>
                            </div>
                        </div>
                        :
                        <div className="absolute h-screen w-screen top-0 center-0 p-8 text-center items-center">
                            <div>
                                <div className={anek_odia.className + " text-white text-5xl"}> SwiftSync </div>
                            </div>
                            <div className="m-10">
                                <div className="text-white text-2xl"> We have found the following meeting times based on Google Calendar. Please select the time that you would like: </div>
                            </div>
                            <div className="h-1/2 flex gap-10">
                                <div className="w-1/2 grid grid-cols-2 gap-5">
                                    <div>
                                        <button className="text-gray-800 text-xl cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]">9:00-10:00am 02/05/2024</button>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-xl">4/4 available:</div>
                                    </div>
                                    <div>
                                        <button className="text-gray-800 text-xl cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]">10:00-11:00am 02/05/2024</button>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-xl">4/4 available:</div>
                                    </div>
                                    <div>
                                        <button className="text-gray-800 text-xl cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]">1:00-2:00pm 02/07/2024</button>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-xl">4/4 available:</div>
                                    </div>
                                </div>
                                <div className="w-1/2 grid grid-cols-2 gap-5">
                                    <div>
                                        <button className="text-gray-800 text-xl cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]">3:00-4:00pm 02/06/2024</button>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-xl">4/4 available:</div>
                                    </div>
                                    <div>
                                        <button className="text-gray-800 text-xl cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]">11:00-12:00pm 02/05/2024</button>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-xl">4/4 available:</div>
                                    </div>
                                    <div>
                                        <button className="text-gray-800 text-xl cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]">2:00-3:00pm 02/08/2024</button>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-xl">4/4 available:</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center m-5">
                                <button className="text-gray-800 text-3xl cursor-pointer bg-[#E1DFDF] w-[150px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]">Submit</button>
                            </div>
                        </div>
                }

            </div>
        </div >)

}