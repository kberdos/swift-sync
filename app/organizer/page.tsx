"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import { Anek_Odia } from 'next/font/google';
import '../nightsky.scss';
import { google } from "googleapis";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import Grid from '@mui/material/Grid';
import Image from "next/image";
import Astronaut from "../../public/images/astronaut.png";
import { updateName, userDocument, createDocument } from "@/util/userFunctions";
import authService from "@/services/auth";
import { Session } from "@supabase/supabase-js";


// page for creating the meeting information

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

function Label({
    componentName,
    valueType,
}: {
    componentName: string;
    valueType: string;
}) {
    const content = (
        <span>
            <strong>{componentName}</strong>
        </span>
    );
    return content;
}

// const myEventName = () => {
//     const [eventName, setEventName] = React.useState('');
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setEventName(event.target.value);
//     };
// };

// const MyDescription = () => {
//     const [description, setDescription] = React.useState('');
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setDescription(event.target.value);
//     };
// };
// const [description, setDescription] = React.useState('');



export default function renderOrganizerPage() {

    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [eventName, setEventName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [minutes, setMinutes] = React.useState<number | null>(null);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [startDate1, setStartDate1] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [endDate1, setEndDate1] = useState<Date | null>(null);
    const [emails, setEmails] = useState<string[]>([]);
    const [newEmail, setNewEmail] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(true);

    const addEmail = () => {
        if (newEmail) {
            setEmails((prevEmails) => [...prevEmails, newEmail]);
            setNewEmail('');
        }
    }

    const showButton = emails.length < 3;

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            setEndDate(date.toISOString());
        }
        console.log(date);
    }

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            setStartDate(date.toISOString());
        }

        console.log(date);
    }



    const handleSubmit = () => {
        if (eventName == null || description == null || minutes == null || startDate == null || endDate == null) {
            return alert("Please check if fields are null")
        } else {
            const members = emails.map((email) => {
                return { email: email }
            })
            createDocument(session!.user.id, eventName, description, minutes, startDate, endDate, members);
            setShowSubmitButton(false);
        }
    }


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
                        <div className={anek_odia.className + " text-white text-5xl"}> SwiftSync </div>
                    </div>
                    <div className="h-3/4 flex justify-center m-5">
                        <div className="grid grid-cols-2">
                            <div className="flex flex-col bg-white rounded-md mr-5 items-center">
                                <div className="mt-8">
                                    <div className={anek_odia.className + "text-gray-800 text-xl mx-4 center"}>Welcome to SwiftSync! Get started creating your event:</div>
                                </div>
                                <div className="w-1/2">
                                    <Box
                                        className="input box"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { mt: 2, width: 500, maxWidth: '100%' },
                                        }}
                                        noValidate
                                        autoComplete="off"

                                    >
                                        <Textfield id="outlined-basic" label="Name of Event" variant="outlined"
                                            onChange={(event) => {
                                                // event.target.value contains the new value of the Textfield
                                                setEventName(event.target.value);
                                            }} />
                                    </Box>

                                    <Box
                                        className="input box"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { mt: 2, width: 500, maxWidth: '100%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >

                                        <Textfield id="outlined-basic" label="Description" variant="outlined"
                                            onChange={(event) => {
                                                // event.target.value contains the new value of the Textfield
                                                setDescription(event.target.value);

                                            }} />
                                    </Box>

                                    <Box
                                        className="input box"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { mt: 2, width: 500, maxWidth: '100%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Textfield
                                            id="outlined-number"
                                            label="Meeting Length (in minutes)"
                                            type="number"
                                            onChange={(event) => {
                                                // const inputValue = event.target.value;
                                                // const numericValue = parseInt(inputValue, 10);
                                                // setMinutes(numericValue);
                                                //setMinutes(event.target.value)
                                                setMinutes(parseInt(event.target.value, 10));
                                                console.log("minutes:", minutes);
                                            }}
                                        />
                                    </Box>

                                    <div className="text-center text-md mt-2">Start Date</div>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            className="w-full"
                                            sx={{
                                                '& > :not(style)': { width: 500, maxWidth: '100%' },
                                            }}
                                            value={startDate1}
                                            onChange={handleStartDateChange}
                                        />

                                    </LocalizationProvider>

                                    <div className="text-center text-md mt-2">End Date</div>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            className="w-full"
                                            sx={{
                                                '& > :not(style)': { width: 500, maxWidth: '100%' },
                                            }}
                                            value={endDate1}
                                            onChange={handleEndDateChange}
                                        />
                                    </LocalizationProvider>


                                </div>
                            </div>

                            <div className="flex flex-col bg-white rounded-md ml-5 items-center">
                                <div className="mt-8">
                                    <div className={anek_odia.className + "text-gray-800 text-xl mx-4 center"}>Invite People to Your Event (Max 3):</div>
                                </div>
                                <div>
                                    <Box
                                        className="input box"
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { mt: 2, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Textfield id="outlined-basic" label="Members (email)" variant="outlined" value={newEmail} onChange={(event) => {
                                            setNewEmail(event.target.value);
                                        }} />
                                    </Box>
                                    {showButton && (<button className="text-gray-800 text-xl w-[70px] h-[40px] m-2 rounded-md bg-[#E1DFDF] hover:bg-[#949494]" onClick={addEmail}>Add</button>)}
                                </div>
                                {emails.map((email, index) => (<div key={index} className="flex items-center mt-5">
                                    <Image src={Astronaut} width={50} height={50} alt="Astronaut" className="m-2" />
                                    <div className="text-left text-xl m-3 h-15">{email}</div>
                                </div>))}


                            </div>
                        </div>
                    </div >
                    {showSubmitButton && (
                        <div className="flex items-center justify-center m-10">
                            <button className="text-gray-800 text-3xl cursor-pointer bg-[#E1DFDF] w-[150px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]" onClick={handleSubmit}
                            >Submit</button>
                        </div>
                    )}
                    {!showSubmitButton && (
                        <div className="flex items-center justify-center m-10">
                            <div className="text-white text-3xl" >Your unique event link: </div>
                        </div>
                    )}
                </div>
            </div>
        </div >)

}