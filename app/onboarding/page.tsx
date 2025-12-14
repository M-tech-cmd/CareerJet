import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { prisma } from "../utils/prisma";
import { redirect } from "next/navigation";
import { auth } from "../utils/auth";

async function isOnboardingFinished(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });
  if (user && user.onboardingCompleted === true) {
    redirect("/");
  }
  return user;
}
export default async function Onboarding() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  await isOnboardingFinished(session?.user?.id! as string);
  return (
    <div className="min-h-screen w-screen py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  );
}
