import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  const userAccessToken = req.body.token;
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: userAccessToken });
  const calendar = google.calendar({ version: "v3", auth });
  const timeMin = new Date().toISOString();
  const calendarId = "primary";
  return NextResponse.json({ data: auth }, { status: 200 });
  // try {
  //   const response = await calendar.events.list({
  //     calendarId: calendarId,
  //     timeMin: timeMin,
  //     maxResults: 10,
  //   });
  //   const events = response.data.items;
  //   console.log(events);
  //   return NextResponse.json({ data: events }, { status: 200 });
  // } catch (error) {
  //   console.error();
  //   return NextResponse.json({ error: error }, { status: 500 });
  // }
}
