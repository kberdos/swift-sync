'use client'
import { useAuth } from "@/contexts/authContext";
import { Anek_Odia } from 'next/font/google';
import Stars from '@/components/Stars';

const anek_odia = Anek_Odia({
    subsets: ["latin"],
    weight: "500"
});

interface AuthShellProps {
    children: React.ReactNode;
}

const AuthShell = ({ children }: AuthShellProps) => {
    const { isLoggedIn, login } = useAuth();

    const LogInPage = () => {
        return (
            <div>
                <Stars>
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div>
                            <div className={anek_odia.className + " text-white text-7xl"}> SwiftSync </div>
                        </div>
                        <div>
                            <div className="text-white text-2xl"> Effortlessly synchronize calendars and schedule meetings</div>
                        </div>
                        <div className="m-12">
                            <button className="text-gray-800 text-3xl cursor-pointer bg-white w-[325px] rounded-md h-[50px] shadow-md hover:bg-[#949494] focus:bg-[#949494] active:bg-[#949494]"
                                onClick={async () => { login() }}>
                                Sign In With Google
                            </button>
                        </div>
                    </div>
                </Stars>

            </div>
        );
    }

    return (
        <div>
            {isLoggedIn ? children : LogInPage()}
        </div>
    );
}

export default AuthShell