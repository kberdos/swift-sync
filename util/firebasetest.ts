import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";

export const createDocument = async (userID: string) => {
  const ref = await addDoc(collection(db, "docs"), {
    name: "hello",
    userID: userID,
  });
  return ref.id;
};
