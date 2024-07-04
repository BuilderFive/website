import type { NextApiRequest, NextApiResponse } from 'next';
import WelcomeEmail from '../../../../components/emails/welcome';
import { resend } from './../../../../util/resendClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const { email } = await req.json();
 
    const data = await resend.emails.send({
        from: 'BuilderFive <admin@builderfive.com>',
        to: [email],
        subject: 'Welcome to BuilderFive!',
        react: WelcomeEmail(),
    });

    if (data.error != null) {
        console.log(data)
        return NextResponse.json({
            status: 'Error',
            data: data.error
        }, {
            status: 500
        })
    }

    return NextResponse.json({
        status: 'Ok',
        data: data
    }, {
        status: 200
    })
};