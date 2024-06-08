import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '~/util/supabaseClient';

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const { group_uuid, user_uuid } = await req.json();

        const { data, error } = await supabase.rpc('leave_group', {
            group_id: group_uuid,
            user_id: user_uuid,
        });

        console.log(data, error);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};