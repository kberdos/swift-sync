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
import { getEvent, getProviderToken } from "@/util/userFunctions";


const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

export default function renderSyncPage({ params }: { params: { eventID: string } }) {
    const [clicked, setClicked] = useState(false);
    const eventID = params.eventID;

    const [event, setEvent] = useState<any>(null);
    const [isDone, setIsDone] = useState(false);
    const [available, setAvailable] = useState<any[]>([])
    const [eventLoading, setEventLoading] = useState(true)

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
            if (event.available) {
                setAvailable(event.available.filter((time: any) => {
                    const start = new Date(time.start);
                    const end = new Date(time.end);
                    const diffInHours: number = Math.abs(end.getTime() - start.getTime()) / 36e5;
                    return diffInHours <= 1;
                }));
            }
            setEventLoading(false)
        }
    }, [event])

    const formatISO = (date: string) => {
        const formattedDate = new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        return formattedDate;
    }

    const [selectedTime, setSelectedTime] = useState<any>(null);

    async function createCalendarEvent(provider_token: string, event: any, start: string, end: string) {
        console.log("creating event")
        const body = {
            'summary': event.name,
            'description': event.description,
            'start': {
                'dateTime': start,
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end,
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${provider_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data);
        })
    }
    const handleSubmit = async () => {
        if (!selectedTime) {
            console.log("no time selected")
            return;
        }
        if (event.members) {
            event.members.forEach((member: any) => {
                const email = member.email
                console.log("email", email)
                getProviderToken(email).then((token) => {
                    console.log("token", token)
                    createCalendarEvent(token, event, selectedTime.start, selectedTime.end)
                })
            })
        }
    }

    if (!eventLoading) {
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
                                    <div className="w-1/2">
                                        {/* <div className="w-1/2 grid grid-cols-2 gap-5"> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(available[0]) }}>{formatISO(available[0].start) ?? ""} {" - "} {formatISO(available[0].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(available[2]) }}>{formatISO(available[2].start) ?? ""} {" - "} {formatISO(available[2].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(available[4]) }}>{formatISO(available[4].start) ?? ""} {" - "} {formatISO(available[4].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                    </div>
                                    <div className="w-1/2">
                                        {/* <div className="w-1/2 grid grid-cols-2 gap-5"> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(available[1]) }}>{formatISO(available[1].start) ?? ""} {" - "} {formatISO(available[1].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(available[3]) }}>{formatISO(available[3].start) ?? ""} {" - "} {formatISO(available[3].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(available[5]) }}>{formatISO(available[5].start) ?? ""} {" - "} {formatISO(available[5].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center m-5">
                                    <button className="text-gray-800 text-3xl cursor-pointer bg-[#E1DFDF] w-[150px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]"
                                        onClick={handleSubmit}
                                    >Submit</button>
                                </div>
                            </div>
                    }
                </div >
            </div >
        )
    }
}