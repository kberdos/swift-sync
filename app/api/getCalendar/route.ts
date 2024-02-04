import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: true,
  },
};

type ReqType = {
  token: string;
};

export async function POST(request: NextRequest) {
  const { token }: ReqType = await request.json();

  if (!token) {
    return new NextResponse(JSON.stringify({ token: "Invalid Input" }), {
      status: 400,
    });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token });
  const calendar = google.calendar({ version: "v3", auth });
  const timeMin = new Date().toISOString();
  const calendarId = "primary";
  return new NextResponse(JSON.stringify({ calendar: calendar }), {
    status: 200,
  });
  try {
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: timeMin,
      maxResults: 10,
    });
    const events = response.data.items;
    console.log(events);
    return new NextResponse(JSON.stringify({ token: token }), {
      status: 200,
    });
  } catch (error) {
    console.error();
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export async function POST(req: NextApiRequest) {
//   if (req.method === "POST") {
//     const { idToken } = req.body;
//     // const body = JSON.parse(req.body);
//     // const userAccessToken = "";
//   }
// }
