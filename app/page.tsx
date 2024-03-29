'use client'
import './nightsky.scss';
import { Anek_Odia } from 'next/font/google';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import Stars from '@/components/Stars';

const anek_odia = Anek_Odia({
  subsets: ["latin"],
  weight: "500"
});

export default function Home() {
  const router = useRouter();
  const { session, logout } = useAuth();

  const handleSendEmail = async () => {
    console.log("in the handler")
    const res = await fetch('/brevo/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    if (!res.ok) {
      console.log("error");
      return;
    }
    console.log("success");
  }

  return (
    <div>
      <Stars>
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div>
            <div className={anek_odia.className + " text-white text-7xl"}> SwiftSync </div>
          </div>
          <div>
            <div className="text-white text-2xl"> {session && "Welcome, " + session.user.email} </div>
          </div>
          <div className="m-12 flex flex-col gap-10">
            <button className="text-gray-800 text-3xl cursor-pointer bg-white w-[325px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]" onClick={logout}>
              Sign out
            </button>
            {/* <button className="text-gray-800 text-3xl cursor-pointer bg-white w-[325px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]" onClick={handleCreateEvent}>
              Create event
            </button> */}
            <button className="text-gray-800 text-3xl cursor-pointer bg-white w-[325px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]" onClick={() => { router.push("/organizer") }}>
              Create Event
            </button>

          </div>
        </div>
      </Stars>

    </div>
  )
}