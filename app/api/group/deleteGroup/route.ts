import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '~/util/supabaseClient';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { randomInfo } = await req.json();

        const group_uuid = randomInfo.name;

        if (group_uuid == null) return NextResponse.json({ error: 'A group identifier is required' }, { status: 400 });

        const { data, error } = await supabase.from('groups').delete().eq('group_uuid', group_uuid).select().single();

        if (error) {
            //return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};