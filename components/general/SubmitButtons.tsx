"use client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
interface GeneralSubmitButtonsProps {
  text: string;
  width?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  icon?: React.ReactNode;
}

export function GeneralSubmitButtons({
  text,
  width,
  variant,
  icon,
}: GeneralSubmitButtonsProps) {
  const { pending } = useFormStatus();

  return (
    <Button className={cn(width)} variant={variant} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}
