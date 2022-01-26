import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { internId } = req.query;
  if (!internId || parseInt(internId as string) === NaN) {
    // if there is no interest or the interest is not a valid tag return an error
    res.status(400).json({ error: "Invalid or missing internId" });
    return;
  } else {
    const jobApplications = await prisma.jobApplication.findMany({
      where: { internId: parseInt(internId as string) },
      include: {
        job: true,
      },
    });

    const updatedJobApplications = await Promise.all(
      jobApplications.map(async (jobApplication) => {
        const company = await prisma.company.findFirst({
          where: { id: jobApplication.job.companyId },
        });
        return {
          ...jobApplication,
          job: {
            ...jobApplication.job,
            company: company,
          },
        };
      })
    );

    res.status(200).json({ applications: updatedJobApplications || [] });
    return;
  }
};

export default handler;
