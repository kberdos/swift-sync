'use client'
import { useContext, createContext, useState, useEffect } from 'react';
import React from 'react';
import { supabase } from '@/util/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';

interface AuthContextType {
    session: Session | null;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathName = usePathname();

    // VERY important: listen for auth state changes
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log("auth event:", event);
            setSession(session);
            setIsLoggedIn(session !== null);
        });
    }, [])

    // set the user to logged in if they are redirected to the callback page
    useEffect(() => {
        if (pathName === "/auth/callback" && !isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, [pathName])

    const login = async () => {
        console.log("signing in");
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `/auth/callback`,
                scopes: "https://www.googleapis.com/auth/calendar",
            },
        });
        if (error) {
            console.log(error);
        }
    };

    const logout = () => {
        supabase.auth.signOut();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ session, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};