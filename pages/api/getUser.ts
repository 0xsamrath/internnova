import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  } else {
    const email: string = req.body.email;

    const user = await prisma.user.findFirst({ where: { email } });
    console.log(user);

    res.status(200).send({ ...user });
  }
};

export default handler;
