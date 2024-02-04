'use client'
import './nightsky.scss';
import { useEffect, useState } from "react";
import authService from "@/services/auth";
import { User, getAuth, getRedirectResult } from "firebase/auth";
import { Fira_Sans } from "next/font/google";
import { userDocument } from '@/util/userFunctions';
import { Anek_Odia } from 'next/font/google';
import { useRouter } from 'next/navigation'
import { google } from 'googleapis';
import { supabase } from '@/util/supabaseClient';
import Script from 'next/script'
import DateTimePicker from 'react-datetime-picker';
import { Session } from '@supabase/supabase-js';
import { create } from 'domain';


const anek_odia = Anek_Odia({
  subsets: ["latin"],
  weight: "500"
});

export default function Home() {
  const router = useRouter();
  const [start, setStart] = useState<Date>(new Date("2024-02-04T00:00:00"));
  const [end, setEnd] = useState<Date>(new Date("2024-02-05T00:00:00"));
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const getCurrentSession = async () => {
    authService.getCurrentSession().then((session): any => {
      setSession(session);
      if (session) {
        console.log("got the session. good job bud!")
        userDocument({ uid: session.user.id, email: session.user.email ?? "" }).then(() => {
          setSessionLoading(false);
        })
      }
    });
  }


  useEffect(() => {
    getCurrentSession();
  }, []);


  useEffect(() => {
    if (session != null) {
      // router.push("/organizer");
    }
  }, [session]);

  async function handleSignIn() {
    await authService.signIn();
  }

  async function handleSignOut() {
    await authService.signOut();
    setSession(null);
  }

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
            </div>
            <div>
              <div className="text-white text-2xl"> Effortlessly synchronize calendars and schedule meetings</div>
            </div>
            <div className="m-12">
              {/* {!sessionLoading && ( */}
              <button className="text-gray-800 text-3xl cursor-pointer bg-white w-[325px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]" onClick={session ? handleSignOut : handleSignIn}>
                {session ? "Sign Out" : "Sign In With Google"}
              </button>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}