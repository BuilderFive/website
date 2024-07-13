import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '~/util/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const test = {
        "event": "room_finished",
        "room": {
          "sid": "RM_hycBMAjmt6Ub",
          "name": "Demo Room",
          "emptyTimeout": 300,
          "creationTime": "1692627281",
          "turnPassword": "2Pvdj+/WV1xV4EkB8klJ9xkXDWY=",
          "enabledCodecs": [
            {
              "mime": "audio/opus"
            },
            {
              "mime": "video/H264"
            },
            {
              "mime": "video/VP8"
            },
            {
              "mime": "video/AV1"
            },
            {
              "mime": "video/H264"
            },
            {
              "mime": "audio/red"
            },
            {
              "mime": "video/VP9"
            }
          ]
        },
        "id": "EV_3DXLrqmZCLEF",
      }
    
    try {
        const { randomInfo } = await req.body()
        
        const group_uuid = randomInfo.name;

        if (group_uuid == null) return NextResponse.json({ error: 'A group identifier is required' }, { status: 500 });

        const { data, error } = await supabase.from('groups').delete().eq('group_uuid', group_uuid);

        if (error) {
            return NextResponse.json({ error: error.message, randomInfo }, { status: 500 });
        }
        return NextResponse.json({ data, randomInfo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};