'use client'
import './nightsky.scss';
import { useEffect, useState } from "react";
import authService from "@/services/auth";
import { User, getAuth, getRedirectResult } from "firebase/auth";
import { Fira_Sans } from "next/font/google";
import { updateUserToken, userDocument } from '@/util/userFunctions';
import { Anek_Odia } from 'next/font/google';
import { useRouter } from 'next/navigation'
import { google } from 'googleapis';


const anek_odia = Anek_Odia({
  subsets: ["latin"],
  weight: "500"
});

export default function Home() {


  const router = useRouter();

  const test = async () => {
    const res = await fetch('/api/getCalendar/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: "testToken"
        })
      })
    const data = await res.json()
    console.log(data)
  }

  const getCurrentUser = async () => {
    authService.getCurrentUser().then((user): any => {
      setUser(user);
      if (user) {
        userDocument({ uid: user.uid, email: user.email ?? "" }).then(() => {
          setUserLoading(false);
        })
      }
    });
  }

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [idToken, setIdToken] = useState<string>("");

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (user != null) {
      user.getIdToken().then((idToken) => {
        console.log(idToken);
        setIdToken(idToken);
      });
      //   router.push("/organizer");
    }
  }, [user]);

  useEffect(() => {
    if (idToken) {
      test()
    }
  }, [idToken])

  async function handleSignIn() {
    await authService.signIn();
  }

  async function handleSignOut() {
    await authService.signOut();
    setUser(null);
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
              <text className={anek_odia.className + " text-white text-7xl"}> SwiftSync </text>
            </div>
            <div>
              <text className="text-white text-2xl"> Effortlessly synchronize calendars and schedule meetings! </text>
            </div>
            <div className="m-12">
              <button className="text-gray-800 text-3xl cursor-pointer bg-white w-[350px] rounded-full h-[50px]" onClick={user ? handleSignOut : handleSignIn}>
                {userLoading ? "Sign In With Google" : user ? "Sign Out" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}