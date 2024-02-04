'use client'
import { useState, useEffect } from "react";
import * as React from "react";
import { Anek_Odia } from 'next/font/google';
import '../../nightsky.scss';
import authService from "@/services/auth";
import { getEvent, userDocument } from "@/util/userFunctions";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

export default function EventPage({ params }: { params: { eventID: string } }) {
    const router = useRouter();
    const [eventID, setEventID] = useState(params.eventID);
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    const [event, setEvent] = useState<any>(null);
    const [organizerID, setOrganizerID] = useState<any>(null);

    const getCurrentEvent = async () => {
        await getEvent(eventID).then((event) => {
            if (event) {
                setEvent(event);
            }
        })
    }

    useEffect(() => {
        getCurrentEvent();
    }, [])


    useEffect(() => {
        if (event) {
            setOrganizerID(event.organizerID)
        }
    }, [event])

    async function handleSignIn() {
        await authService.signIn();
    }

    async function handleSignOut() {
        await authService.signOut();
        setSession(null);
    }

    const getCurrentSession = async () => {
        authService.getCurrentSession().then((session): any => {
            setSession(session);
            if (session) {
                console.log("got the session. good job bud!")
                userDocument({ uid: session.user.id, email: session.user.email ?? "", providerToken: session.provider_token! }).then(() => {
                    setSessionLoading(false);
                })
            }
        });
    }

    useEffect(() => {
        getCurrentSession();
    }, []);

    useEffect(() => {
        if (session != null && organizerID) {
            console.log("user id", session.user.id);
            if (session.user.id === organizerID) {
                router.push(`/selection/${eventID}`);
            } else {
                router.push(`/syncing/${eventID}`);
            }
        }
    }, [session, organizerID]);

    return (
        <div>
            <div className="relative">
                <div id="stars-container">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                <div className="absolute h-screen w-screen top-0 center-0">
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div>
                            <div className={anek_odia.className + " text-white text-7xl"}> SwiftSync </div>
                            <div className={anek_odia.className + " text-white text-7xl"}> {eventID} </div>
                        </div>
                        <div>
                            <div className="text-white text-2xl"> Effortlessly synchronize calendars and schedule meetings! </div>
                        </div>
                        <div className="m-12">
                            {!sessionLoading && (
                                <button className="text-gray-800 text-3xl cursor-pointer bg-white w-[325px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]" onClick={session ? handleSignOut : handleSignIn}>
                                    {sessionLoading ? "Sign In With Google" : session ? "Sign Out" : "Sign In With Google"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
