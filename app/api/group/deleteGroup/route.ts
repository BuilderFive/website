import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '~/util/supabaseClient';

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const { group_uuid } = await req.json();

        // Delete the row that matches group_uuid in table groups
        const { data, error } = await supabase.from('groups').delete().eq('group_uuid', group_uuid);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};