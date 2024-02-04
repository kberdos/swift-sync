import { set } from "firebase/database";
import { db } from "./firebaseConfig";
import { google } from "googleapis";
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
  setDoc,
} from "firebase/firestore";

interface UpdateUserTokenProps {
  uid: string;
  token: string;
}

export const updateUserToken = async ({ token, uid }: UpdateUserTokenProps) => {
  console.log(
    "updating user token",
    JSON.stringify({ token: token, uid: uid }, null, 2)
  );
  await updateDoc(doc(db, "users", uid), {
    token: token,
  });
};

interface CreateUserDBProps {
  email: string;
  uid: string;
}

export const userDocument = async ({ email, uid }: CreateUserDBProps) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", uid), {
      email: email,
      uid: uid,
    });
  }
};

export const createDocument = async (
  organizerID: string,
  name: string,
  description: string,
  length: number,
  startDate: string,
  endDate: string,
  members: []
) => {
  const ref = await addDoc(collection(db, "docs"), {
    organizerID: organizerID,
    name: name,
    description: description,
    length: length,
    startDate: startDate,
    endDate: endDate,
    members: members,
  });
  return ref.id;
};

export const updateName = async (docID: string, newName: string) => {
  await updateDoc(doc(db, "docs", docID), {
    name: newName,
  });
};

export const getName = async (docID: string) => {
  const docSnap = await getDoc(doc(db, "docs", docID));
  if (docSnap.exists()) {
    return docSnap.data().name;
  } else {
    return "No such document!";
  }
};
