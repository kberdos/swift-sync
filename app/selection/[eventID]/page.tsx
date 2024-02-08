'use client'
import * as React from "react";
import { Anek_Odia } from 'next/font/google';
import '../../nightsky.scss';
import { useEffect, useState } from 'react';
import { getEvent, getProviderToken } from "@/util/userFunctions";
import { useAuth } from "@/contexts/authContext";


const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

export default function renderSyncPage({ params }: { params: { eventID: string } }) {
    const [clicked, setClicked] = useState(false);
    const eventID = params.eventID;

    const [event, setEvent] = useState<any>(null);
    const [isDone, setIsDone] = useState(false);
    const [eventLoading, setEventLoading] = useState(true)
    const { session, login } = useAuth();

    const loadEvent = async () => {
        getEvent(eventID).then((event) => {
            setEvent(event);
        })
    }

    useEffect(() => {
        loadEvent();
    }, [])

    useEffect(() => {
        console.log("event", event)
        if (event) {
            console.log("event", event)
            setIsDone(event.done)
            setEventLoading(false)
        }
    }, [event])

    const formatISO = (date: string) => {
        const formattedDate = new Date(date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        return formattedDate;
    }

    const [selectedTime, setSelectedTime] = useState<any>(null);

    // TODO: This is a really bad way of handling this, need to figure out how to use refresh tokens
    async function handleCreateError() {
        // re-login 
        await login()
        // create calendar event again 
        createCalendarEvent(event, event.members, selectedTime.start, selectedTime.end);
    }

    async function createCalendarEvent(event: any, members: any[], start: string, end: string) {
        members.map((member: any) => {
            return {
                'email': member.email
            }
        })
        const body = {
            'summary': event.name,
            'description': event.description,
            'attendees': members,
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
                "Authorization": `Bearer ${session!.provider_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            handleCreateError();
        })
    }
    const handleSubmit = async () => {
        if (!selectedTime) {
            console.log("no time selected")
            return;
        }
        if (event.members) {
            createCalendarEvent(event, event.members, selectedTime.start, selectedTime.end);
            alert("Events have been created!")
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
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(event.available[0]) }}>{formatISO(event.available[0].start) ?? ""} {" - "} {formatISO(event.available[0].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(event.available[2]) }}>{formatISO(event.available[2].start) ?? ""} {" - "} {formatISO(event.available[2].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(event.available[4]) }}>{formatISO(event.available[4].start) ?? ""} {" - "} {formatISO(event.available[4].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                    </div>
                                    <div className="w-1/2">
                                        {/* <div className="w-1/2 grid grid-cols-2 gap-5"> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(event.available[1]) }}>{formatISO(event.available[1].start) ?? ""} {" - "} {formatISO(event.available[1].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(event.available[3]) }}>{formatISO(event.available[3].start) ?? ""} {" - "} {formatISO(event.available[3].end) ?? ""}</button>
                                        </div>
                                        {/* <div className="text-left">
                                            <div className="text-white text-xl">4/4 available:</div>
                                        </div> */}
                                        <div>
                                            <button className="mt-5 text-gray-800 text-lg cursor-pointer bg-white w-full rounded-md h-[50px] shadow-md hover:bg-[#CDE9FE] focus:bg-[#69BDFB] active:bg-[#3279AF]" onClick={() => { setSelectedTime(event.available[5]) }}>{formatISO(event.available[5].start) ?? ""} {" - "} {formatISO(event.available[5].end) ?? ""}</button>
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