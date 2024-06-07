import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from '~/util/AuthProvider';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {supabase } = useSession();
    const { userUuid, topic, radius, latitude, longitude } = req.body;

    const { data, error } = await supabase.rpc('join_or_create_group', {
        p_user_uuid: userUuid,
        p_topic: topic,
        p_radius: radius,
        p_latitude: latitude,
        p_longitude: longitude,
    });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ group_uuid: data });
};
