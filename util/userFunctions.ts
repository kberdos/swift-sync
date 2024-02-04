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
import { availableTimes } from "./findTimes";

interface CreateUserDBProps {
  email: string;
  uid: string;
  providerToken: string;
}

export const userDocument = async ({
  email,
  uid,
  providerToken,
}: CreateUserDBProps) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", uid), {
      email: email,
      uid: uid,
      providerToken: providerToken,
    });
  }
};

export const getProviderToken = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let token = "";
  querySnapshot.forEach((doc) => {
    token = doc.data().providerToken;
  });
  return token;
};

export const createDocument = async (
  organizerID: string,
  name: string,
  description: string,
  length: number,
  startDate: string,
  endDate: string,
  members: any[],
  done: boolean
) => {
  const ref = await addDoc(collection(db, "events"), {
    organizerID: organizerID,
    name: name,
    description: description,
    length: length,
    startDate: startDate,
    endDate: endDate,
    members: members,
    done: done,
  });
  console.log(
    organizerID,
    name,
    description,
    length,
    startDate,
    endDate,
    members
  );
  return ref.id;
};

export const getEvent = async (eventID: string) => {
  const docSnap = await getDoc(doc(db, "events", eventID));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getTimes = async (eventID: string) => {
  const docSnap = await getDoc(doc(db, "events", eventID));
  if (docSnap.exists()) {
    const data = docSnap.data();
    const startDate = data.startDate;
    const endDate = data.endDate;
    return {
      startDate: startDate,
      endDate: endDate,
    };
  } else {
    return null;
  }
};

export const addCalendarInfo = async (
  email: string,
  eventID: string,
  calendarInfo: any
) => {
  const members = (await getEvent(eventID))!.members;
  await updateDoc(doc(db, "events", eventID), {
    members: members.map((member: any) => {
      if (member.email === email) {
        return {
          ...member,
          calendarInfo: calendarInfo,
        };
      }
      return member;
    }),
  });
  const event = await getEvent(eventID);
  const updatedMembers = event!.members;
  const startDate = event!.startDate;
  const endDate = event!.endDate;
  const length = event!.length;
  // if all members have calendar info, set done to true
  if (updatedMembers.every((member: any) => member.calendarInfo)) {
    await updateDoc(doc(db, "events", eventID), {
      done: true,
    });
    // get all of the members' calendar info and combine them into one array
    const allCalendarInfo = [] as any[];
    console.log("updated members", updatedMembers);
    for (let i = 0; i < updatedMembers.length; i++) {
      console.log(
        "updatedMembers[i].calendarInfo",
        updatedMembers[i].calendarInfo
      );
      for (let j = 0; j < updatedMembers[i].calendarInfo.length; j++) {
        allCalendarInfo.push(updatedMembers[i].calendarInfo[j]);
      }
      // allCalendarInfo.concat(updatedMembers[i].calendarInfo);
    }
    console.log("allCalendarInfo", allCalendarInfo);
    const available: any = availableTimes(
      allCalendarInfo,
      startDate,
      endDate,
      length
    );
    console.log("available!!!", available);
    await updateDoc(doc(db, "events", eventID), {
      available: available,
    });
  }
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
