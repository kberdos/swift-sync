'use client'
import * as React from "react";
import { Anek_Odia } from 'next/font/google';
import '../../nightsky.scss';
import Planet from "../../../public/images/planet.png";
import Image from "next/image";
import { addCalendarInfo, getTimes, addUserDocument } from "@/util/userFunctions";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { findTimes } from "@/util/findTimes";
import { getEvent } from "@/util/userFunctions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

// page to show that the website is syncing

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

export default function renderSyncPage({ params }: { params: { eventID: string } }) {
    const router = useRouter();
    const eventID = params.eventID;
    const [executed, setExecuted] = useState(false);
    const [event, setEvent] = useState<any>(null);

    const { session } = useAuth()

    const getCurrentEvent = async () => {
        await getEvent(eventID).then((event) => {
            if (event) {
                setEvent(event);
            } else {
                // TODO: 404 page
                alert("event not found :(")
            }
        });
    }

    useEffect(() => {
        console.log(event);
    }, [event])

    useEffect(() => {
        getCurrentEvent();
    }, [])

    useEffect(() => {
        if (session && !executed) {
            getEvents(session);
            setExecuted(true);
        }
    }, [session])

    async function getEvents(session: Session) {
        if (!session) {
            return;
        }
        const times = await getTimes(eventID);
        const startDate = times!.startDate
        const endDate = times!.endDate
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startDate}&timeMax=${endDate}&singleEvents=True`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session!.provider_token}`,
                "Content-Type": "application/json"
            },
        }).then((data) => {
            return data.json()
        }).then((data) => {
            const reducedItems = findTimes(data);
            addCalendarInfo(session!.user.email!, eventID, reducedItems).then(() => {
                router.push(`/confirmation`)
            });
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