import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  User,
  getRedirectResult,
} from "firebase/auth";
import { app } from "@/util/firebaseConfig";

class AuthService {
  private auth = getAuth(app);
  private user: User | null = null;
  private provider = new GoogleAuthProvider();
  private email: string = "";
  private uid: string = "";
  private authStateChangedPromise: Promise<User | null>;
  private authStateChangedResolve?: (user: User | null) => void;

  constructor() {
    this.authStateChangedPromise = new Promise((resolve) => {
      this.authStateChangedResolve = resolve;
    });

    onAuthStateChanged(this.auth, (user) => {
      console.log("auth state change");
      if (user) {
        this.user = user;
        this.email = user.email || "";
        this.uid = user.uid;
      } else {
        console.log("no user");
      }

      if (this.authStateChangedResolve) {
        this.authStateChangedResolve(user);
        this.authStateChangedResolve = undefined;
      }
    });
  }

  async getCurrentUser() {
    await this.authStateChangedPromise;
    return this.user;
  }

  async signIn() {
    await signInWithRedirect(this.auth, this.provider);
    getRedirectResult(this.auth).then((result) => {
      console.log(result);
    });
  }

  async signOut() {
    console.log("signing out");
    await this.auth.signOut();
  }
}

const authService = new AuthService();
export default authService;
