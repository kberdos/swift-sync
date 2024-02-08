import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend("re_BsntKTZ3_8hZUJXsYBfn385X4CaGZK8p5");

export async function POST(request: NextRequest) {
  resend.emails.send({
    from: "kazuya_erdosbrown.edu",
    to: "kazuyaberdos@gmail.com",
    subject: "a really big Hello World",
    html: "<p>HELLO BIG BOY THIS IS ME!</p>",
  });
  return NextResponse.json({ message: "Email sent" }, { status: 200 });
}
