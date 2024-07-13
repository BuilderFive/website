import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '~/util/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request, res: Response) {
    
    try {
        const everything = await req.json();
        
        const event = everything.event;

        if (event !== 'room_finished') return NextResponse.json({ error: 'Invalid event type' }, { status: 500 });
        
        const group_uuid = everything.room.name;

        if (group_uuid == null) return NextResponse.json({ error: 'A group identifier is required' }, { status: 500 });

        const { data, error } = await supabase.from('groups').delete().eq('group_uuid', group_uuid);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};