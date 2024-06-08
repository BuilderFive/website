import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '~/util/supabaseClient';

export async function POST(req: NextRequest, res: NextResponse) {
    const { groupUuid, userUuid } = await req.json();

    const { data, error } = await supabase.rpc('leave_group', {
        p_group_uuid: groupUuid,
        p_user_uuid: userUuid,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ group_uuid: data });
};