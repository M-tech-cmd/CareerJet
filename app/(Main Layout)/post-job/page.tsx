import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import JCBLogo from "@/public/jcb.png";
import FirefoxLogo from "@/public/firefox.png";

import BlackcoinLogo from "@/public/blackcoin.png";
import ScriptAppLogo from "@/public/script-app.png";
import SlackLogo from "@/public/slack.png";
import UpsLogo from "@/public/ups.png";
import Image from "next/image";
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/app/utils/auth";
import { CreateJobForm } from "@/components/forms/CreateJobForm";

const companies = [
  { id: 0, name: "JCB ", logo: JCBLogo },
  { id: 1, name: "Firefo", logo: FirefoxLogo },
  { id: 2, name: "Blackcoin", logo: BlackcoinLogo },
  { id: 3, name: "ScriptApp", logo: ScriptAppLogo },
  { id: 4, name: "Slack", logo: SlackLogo },
  { id: 5, name: "Ups", logo: UpsLogo },
];

const testimonials = [
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "Manuel Kim",
    company: "JCB",
  },
  {
    quote:
      "Hiring remote talent has never been easier. Highly recommended!",
    author: "Mark dailo",
    company: "Firefox",
  },
  {
    quote:
      "Our developer pipeline tripled after posting here — highly efficient and targeted.",
    author: "Aisha Patel",
    company: "Blackcoin",
  },
  {
    quote:
      "Fast, reliable responses from qualified candidates — a must-use.",
    author: "Daniel Kamau",
    company: "ScriptApp",
  },
  {
    quote:
      "Excellent platform for collaborative teams; we found great designers quickly.",
    author: "Priya Singh",
    company: "Slack",
  },
  {
    quote:
      "Consistently high-quality candidates and seamless hiring.",
    author: "Michael Liam",
    company: "UPS",
  },
];

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      website: true,
      xAccount: true,
    },
  });
  if (!data) {
    redirect("/");
  }
  return data;
}
export default async function PostJob() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const data = await getCompany(session?.user?.id!);
  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyXAccount={data.xAccount}
        companyWebsite={data.website}
      />

      <div className="col-span-1">
        <Card className="lg:sticky lg:top-4">
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logos */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    height={80}
                    width={80}
                    className="opacity-75 transition-opacity hover:opacity-100 rounded-lg"
                  />{" "}
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm italic text-muted-foreground">
                    {testimonial.quote}
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
