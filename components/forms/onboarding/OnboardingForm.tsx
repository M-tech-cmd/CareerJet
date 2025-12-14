"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Logo from "@/public/logo.png";
import { UserTypeSelection } from "./UserTypeForm";
import CompanyForm from "./CompanyForm";
import { UserType } from "@prisma/client";
import { JobSeekerForm } from "./JobSeekerForm";

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeChange} />;
      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <span className="text-4xl font-bold">
          Career<span className="text-primary">Jet</span>
        </span>
      </div>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}
