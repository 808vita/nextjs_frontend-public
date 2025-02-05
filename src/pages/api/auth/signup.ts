// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/Users";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "POST methods only" });
  }
  const { email, password, name } = req.body;

  try {
    await connectDB();

    let newUser = await User.signup(email, password, name);

    return res.status(201).json({ user: newUser });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
