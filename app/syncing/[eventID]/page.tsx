'use client'
import * as React from "react";
import { Anek_Odia } from 'next/font/google';
import '../../nightsky.scss';
import Planet from "../../../public/images/planet.png";
import Image from "next/image";
import authService from "@/services/auth";
import { userDocument } from "@/util/userFunctions";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { findTimes } from "@/util/findTimes";

// page to show that the website is syncing

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

export default function renderSyncPage({ params }: { params: { eventID: string } }) {
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [executed, setExecuted] = useState(false);

    useEffect(() => {
        if (session && !executed) {
            getEvents(session);
            // createCalendarEvent(session);
            setExecuted(true);
        }
    }, [session])

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

    const [start, setStart] = useState<Date>(new Date("2024-02-04T00:00:00"));
    const [end, setEnd] = useState<Date>(new Date("2024-02-05T00:00:00"));

    async function createCalendarEvent(session: Session) {
        if (!session) {
            return;
        }
        console.log("creating event")
        const event = {
            'summary': "this is an event",
            'description': "this is the description",
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session!.provider_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event),
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data);
        })
    }

    async function getEvents(session: Session) {
        if (!session) {
            return;
        }
        console.log("creating event")
        const localTime = new Date();
        const utcTime = localTime.toISOString();
        const localTimePlus301 = new Date();
        localTimePlus301.setMinutes(localTimePlus301.getMinutes() + 6000);
        const utcTimePlus301 = localTimePlus301.toISOString();
        const timeMin = utcTime;
        const timeMax = utcTimePlus301;
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&maxResults=50&singleEvents=True`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session!.provider_token}`,
                "Content-Type": "application/json"
            },
        }).then((data) => {
            return data.json()
        }).then((data) => {
            // console.log(data);
            findTimes(data);
        })
    }

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
                            <div className="text-white text-6xl"> Syncing your calendar... </div>
                        </div>
                        <div className="m-10">
                            <Image src={Planet} width={200} height={200} alt="Planet" />
                        </div>
                    </div >
                </div>
            </div>
        </div >)

}