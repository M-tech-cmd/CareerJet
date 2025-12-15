"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { requireUser } from "./utils/requireUser";
import { prisma } from "./utils/prisma";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      // Allow good bots (search engines, monitoring, etc.)
      allow: [
        "GOOGLE_CRAWLER",           // Google Search
        "GOOGLE_ADSBOT",            // Google Ads
        "GOOGLE_ADSBOT_MOBILE",     // Google Ads Mobile
        "BING_CRAWLER",             // Bing Search
        "DISCORD_CRAWLER",          // Discord link previews
        "FACEBOOK_CRAWLER",         // Facebook link previews
        "TWITTER_CRAWLER",          // Twitter/X link previews
        "SLACK_CRAWLER",            // Slack link previews
        "LINKEDIN_CRAWLER",         // LinkedIn link previews
        "WHATSAPP_CRAWLER",         // WhatsApp link previews
      ],
      // These are automatically blocked (bad bots):
      // - Automated scrapers
      // - Content thieves
      // - Vulnerability scanners
      // - Malicious bots
      // - AI scrapers (GPTBot, ClaudeBot, etc.)
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  try {
    // Getting the user from the session
    const user = await requireUser();

    // Creating a request object from arcjet
    const req = await request();
    const decision = await aj.protect(req);
    
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error("Bot detected");
      }
      throw new Error("Forbidden");
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
  try {
    const user = await requireUser();

    // Creating a request object from arcjet
    const req = await request();
    const decision = await aj.protect(req);
    
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error("Bot detected");
      }
      throw new Error("Forbidden");
    }

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
  } catch (error) {
    console.error("Create job seeker error:", error);
    throw error;
  }

  return redirect("/");
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  try {
    const user = await requireUser();

    // Creating a request object from arcjet
    const req = await request();
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error("Bot detected");
      }
      throw new Error("Forbidden");
    }

    // Validate the inputted data
    const validatedData = jobSchema.parse(data);

    const company = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!company?.id) {
      throw new Error("Company not found");
    }

    const jobPost = await prisma.jobPost.create({
      data: {
        companyId: company.id,
        jobDescription: validatedData.jobDescription,
        jobTitle: validatedData.jobTitle,
        employmentType: validatedData.employmentType,
        location: validatedData.location,
        salaryFrom: validatedData.salaryFrom,
        salaryTo: validatedData.salaryTo,
        listingDuration: validatedData.listingDuration,
        benefits: validatedData.benefits,
      },
    });

    if (!jobPost) {
      throw new Error("Failed to create job post");
    }

    return { success: true, jobId: jobPost.id };
  } catch (error) {
    console.error("Create job error:", error);
    throw error;
  }
}