import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "~/util/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    
    const { email } = req.body;
    const { data, error } = await supabase
        .from("rsvp")
        .insert([{ email }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });
}