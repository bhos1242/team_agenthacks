"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { InputFieldProps } from "../InputField";

const InputCheckbox = <T extends FieldValues>({
  label,
  name,
  className,
  disabled,
  description,
}: Omit<InputFieldProps<T>, "form">) => {
  const form = useFormContext<T>();

  if (!form) {
    throw new Error("InputCheckbox must be used within a FormProvider");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full",
            "group transition-all duration-300 ease-in-out",
            className,
            "flex flex-col gap-4"
          )}
        >
          <div className="flex items-center gap-4 relative w-full">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className={cn(
                  "h-5 w-5 rounded-md",
                  "border-2 border-input",
                  "data-[state=checked]:border-primary",
                  "data-[state=checked]:bg-primary",
                  "transition-all duration-200",
                  "hover:border-primary/50",
                  "focus:ring-2 focus:ring-primary/20",
                  "group/check"
                )}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                  // Fix standard form label margin top issue
                  "mt-0!" 
                )}
              >
                {label}
              </FormLabel>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
        </FormItem>
      )}
    />
  );
};

export default React.memo(InputCheckbox) as <T extends FieldValues>(
  props: Omit<InputFieldProps<T>, "form">
) => React.ReactNode;
