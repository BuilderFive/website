import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/util/supabaseClient';
import { Room, WebhookReceiver } from 'livekit-server-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const apiKey: string = process.env.LIVEKIT_API_KEY || '';
const apiSecret: string = process.env.LIVEKIT_API_SECRET || '';

const receiver = new WebhookReceiver(
    apiKey, apiSecret
)

interface WebhookEvent {
    event: 'room_finished'
    room: Room
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        // Validate and decode the webhook event
        const rawBody = await req.text();
        const event = await receiver.receive(rawBody, req.headers.get('Authorization') || "");

        if (event == null || event.room == null || event.event !== 'room_finished') {
            return NextResponse.json({ error: 'Invalid webhook event' }, { status: 400 });
        }

        const group_uuid = event.room.name;

        if (group_uuid == null) {
            return NextResponse.json({ error: 'A group identifier is required' }, { status: 400 });
        }

        // Delete the group from Supabase
        const { data, error } = await supabase.from('groups').delete().eq('group_uuid', group_uuid);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
