"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export function InputWithIcon({
  startIcon,
  endIcon,
  className,
  wrapperClassName,
  type,
  ...props
}: InputWithIconProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className={cn("relative flex items-center", wrapperClassName)}>
      {startIcon && (
        <div className="text-muted-foreground absolute left-3 flex h-full items-center">
          {startIcon}
        </div>
      )}
      <Input
        type={isPasswordType ? (showPassword ? "text" : "password") : type}
        className={cn(
          startIcon && "pl-10",
          (endIcon || isPasswordType) && "pr-10",
          className,
        )}
        {...props}
      />
      {endIcon && !isPasswordType && (
        <div className="text-muted-foreground absolute right-3 flex h-full items-center">
          {endIcon}
        </div>
      )}
      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted-foreground absolute right-3 flex h-full items-center"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
