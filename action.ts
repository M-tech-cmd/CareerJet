"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { companySchema, jobSeekerSchema } from "./app/utils/zodSchemas";
import { requireUser } from "./app/utils/requireUser";
import { prisma } from "./app/utils/prisma";

export async function createCompany(data: z.infer<typeof companySchema>) {
  try {
    //getting the user from the session
    const user = await requireUser();
    if (!user?.id) {
      throw new Error("User not found");
    }

    const validatedData = companySchema.parse(data);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        onboardingCompleted: true,
        userType: "COMPANY",
        Company: {
          create: {
            ...validatedData,
          },
        },
      },
    });

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }
  } catch (error) {
    console.error("Create company error:", error);
    throw error;
  }

  return redirect("/");
}


export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

  const validatedData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validatedData,
        },
      },
    },
  });

  return redirect("/");
}
