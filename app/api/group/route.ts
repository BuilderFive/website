import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from '~/util/AuthProvider';
import { supabase } from '~/util/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res: NextResponse) {
    const { userUuid, topic, radius, latitude, longitude } = await req.json();

    const { data, error } = await supabase.rpc('join_or_create_group', {
        p_user_uuid: userUuid,
        p_topic: topic,
        p_radius: radius,
        p_latitude: latitude,
        p_longitude: longitude,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ group_uuid: data });
};
