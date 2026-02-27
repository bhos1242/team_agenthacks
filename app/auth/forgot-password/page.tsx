"use client";

import { useState } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import InputField from "@/components/AppInputFields/InputField";
import toast from "react-hot-toast";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const result = await forgotPasswordMutation.mutateAsync(data);
      toast.success(result.message);
      setEmailSent(true);
    } catch (error) {
      let errorMessage = "Failed to send reset email";
      if (isAxiosError(error)) {
        errorMessage = error.response?.data?.error || errorMessage;

        // If rate limited, don't allow retry
        if (error.response?.status === 429) {
          setEmailSent(true);
        }
      }
      toast.error(errorMessage);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4 dark:bg-gray-950">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-center">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-center">
              We&apos;ve sent a password reset link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
              <p className="text-sm text-green-800 dark:text-green-200">
                If an account exists with the email you provided, you&apos;ll receive
                a password reset link shortly. Please check your inbox and spam
                folder.
              </p>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              The link will expire in 1 hour for security reasons.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/auth/login" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
            <Button
              variant="link"
              onClick={() => setEmailSent(false)}
              className="text-sm"
            >
              Try a different email
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we&apos;ll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <InputField
                  name="email"
                  label="Email"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <Button
                className="w-full"
                type="submit"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending
                  ? "Sending..."
                  : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
