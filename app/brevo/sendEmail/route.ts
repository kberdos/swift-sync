import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend("re_K59KzQdR_NyexDsKCuDCTCss5dnSeizzq");

export async function POST(request: NextRequest) {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kazuyaberdos@gmail.com",
    subject: "a really big Hello World",
    html: "<p>HELLO BIG BOY THIS IS ME!</p>",
  });
  return NextResponse.json({ message: "Email sent" }, { status: 200 });
}
