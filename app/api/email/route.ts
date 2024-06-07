import { Head, Html, Text } from "@react-email/components";
import { Resend } from 'resend'
import { render } from '@react-email/render';
import { resend } from "~/util/resendClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const {members, goal} = await request.json()

    const {data, error} = await resend.emails.send({
        from: "My Phung <admin@builderfive.com>",
        to: members.map((member: any) => member.email),
        cc: "myphungquoc@gmail.com",
        subject: "BuilderFive Peer Group Connection",
        html: `<p>Hey,<br/> This is an automated message btw. <br/>This email is to connect everyone to work on this goal this week. Let\'s introduce ourselves :)<br/>You all wanted to work on ${goal}</p>`
    })

    return NextResponse.json({
        status: 'Ok'
    })
}
