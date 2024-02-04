import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  User,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import { app } from "@/util/firebaseConfig";
import { supabase } from "@/util/supabaseClient";
import { Session } from "@supabase/supabase-js";

class AuthService {
  private auth = getAuth(app);
  private user: User | null = null;
  private provider = new GoogleAuthProvider();
  private email: string = "";
  private uid: string = "";

  // supabase stuff
  private session: Session | null = null;
  private authStateChangedPromise: Promise<Session | null>;
  private authStateChangedResolve?: (session: Session | null) => void;

  constructor() {
    this.authStateChangedPromise = new Promise((resolve) => {
      this.authStateChangedResolve = resolve;
    });

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Authentication event", event);
      console.log("Current session", session);
      if (session) {
        this.session = session;
      }

      if (this.authStateChangedResolve) {
        this.authStateChangedResolve(session);
        this.authStateChangedResolve = undefined;
      }
      // createCalendarEvent(session!);
      // if (session) {
      //   setSession(session);
      // }
    });
  }

  async getCurrentSession() {
    await this.authStateChangedPromise;
    return this.session;
  }

  async signIn() {
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
  }

  async signOut() {
    console.log("signing out");
    await supabase.auth.signOut();
  }
}

const authService = new AuthService();
export default authService;
